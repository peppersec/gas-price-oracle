import axios from 'axios';
import { ChainId, networks } from './config';
import {
  Config,
  Options,
  GasPrice,
  GasPriceKey,
  OffChainOracle,
  OnChainOracle,
  OnChainOracles,
  OffChainOracles,
} from './types';
import BigNumber from 'bignumber.js';

export class GasPriceOracle {
  lastGasPrice: GasPrice;
  offChainOracles: OffChainOracles;
  onChainOracles: OnChainOracles;
  configuration: Config = {
    chainId: ChainId.MAINNET,
    defaultRpc: 'https://api.mycryptoapi.com/eth',
    timeout: 10000,
  };

  constructor(options?: Options) {
    if (options) {
      Object.assign(this.configuration, options);
    }

    const { offChainOracles, onChainOracles } = networks[this.configuration.chainId];
    this.offChainOracles = { ...offChainOracles };
    this.onChainOracles = { ...onChainOracles };
  }

  async askOracle(oracle: OffChainOracle): Promise<GasPrice> {
    const {
      name,
      url,
      instantPropertyName,
      fastPropertyName,
      standardPropertyName,
      lowPropertyName,
      denominator,
      additionalDataProperty,
    } = oracle;
    const response = await axios.get(url, { timeout: this.configuration.timeout });
    if (response.status === 200) {
      const gas = additionalDataProperty ? response.data[additionalDataProperty] : response.data;
      if (Number(gas[fastPropertyName]) === 0) {
        throw new Error(`${name} oracle provides corrupted values`);
      }
      const gasPrices: GasPrice = {
        instant: parseFloat(gas[instantPropertyName]) / denominator,
        fast: parseFloat(gas[fastPropertyName]) / denominator,
        standard: parseFloat(gas[standardPropertyName]) / denominator,
        low: parseFloat(gas[lowPropertyName]) / denominator,
      };
      return this.normalize(gasPrices);
    } else {
      throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
    }
  }
  async fetchGasPricesOffChain(): Promise<GasPrice> {
    for (const oracle of Object.values(this.offChainOracles)) {
      try {
        return await this.askOracle(oracle);
      } catch (e) {
        console.info(e.message);
        continue;
      }
    }
    throw new Error('All oracles are down. Probably a network error.');
  }

  async fetchMedianGasPriceOffChain(): Promise<GasPrice> {
    const promises: Promise<GasPrice>[] = [];
    for (const oracle of Object.values(this.offChainOracles) as Array<OffChainOracle>) {
      promises.push(this.askOracle(oracle));
    }

    const settledPromises = await Promise.allSettled(promises);
    const allGasPrices = settledPromises.reduce((acc: GasPrice[], result) => {
      if (result.status === 'fulfilled') {
        acc.push(result.value);
        return acc;
      }
      return acc;
    }, []);

    if (allGasPrices.length === 0) {
      throw new Error('All oracles are down. Probably a network error.');
    }
    return this.median(allGasPrices);
  }

  median(gasPrices: GasPrice[]): GasPrice {
    const medianGasPrice: GasPrice = { instant: 0, fast: 0, standard: 0, low: 0 };

    const results: { [key in GasPriceKey]: number[] } = {
      instant: [],
      fast: [],
      standard: [],
      low: [],
    };

    for (const gasPrice of gasPrices) {
      results.instant.push(gasPrice.instant);
      results.fast.push(gasPrice.fast);
      results.standard.push(gasPrice.standard);
      results.low.push(gasPrice.low);
    }

    for (const type of Object.keys(medianGasPrice) as Array<keyof GasPrice>) {
      const allPrices = results[type].sort((a, b) => a - b);
      if (allPrices.length === 1) {
        medianGasPrice[type] = allPrices[0];
        continue;
      } else if (allPrices.length === 0) {
        continue;
      }
      const isEven = allPrices.length % 2 === 0;
      const middle = Math.floor(allPrices.length / 2);
      medianGasPrice[type] = isEven ? (allPrices[middle - 1] + allPrices[middle]) / 2.0 : allPrices[middle];
    }
    return this.normalize(medianGasPrice);
  }
  /**
   * Normalizes GasPrice values to Gwei. No more than 9 decimals basically
   * @param GasPrice _gas
   */
  normalize(_gas: GasPrice): GasPrice {
    const format = {
      decimalSeparator: '.',
      groupSeparator: '',
    };
    const decimals = 9;

    const gas: GasPrice = { ..._gas };
    for (const type of Object.keys(gas) as Array<keyof GasPrice>) {
      gas[type] = Number(new BigNumber(gas[type]).toFormat(decimals, format));
    }

    return gas;
  }

  async fetchGasPricesOnChain(): Promise<number> {
    for (const oracle of Object.values(this.onChainOracles)) {
      const { name, callData, contract, denominator, rpc } = oracle;
      const rpcUrl = rpc || this.configuration.defaultRpc;
      const body = {
        jsonrpc: '2.0',
        id: 1337,
        method: 'eth_call',
        params: [{ data: callData, to: contract }, 'latest'],
      };
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const response = await axios.post(rpcUrl!, body, { timeout: this.configuration.timeout });
        if (response.status === 200) {
          const { result } = response.data;
          let fastGasPrice = new BigNumber(result);
          if (fastGasPrice.isZero()) {
            throw new Error(`${name} oracle provides corrupted values`);
          }
          fastGasPrice = fastGasPrice.div(denominator);
          return fastGasPrice.toNumber();
        } else {
          throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
    throw new Error('All oracles are down. Probably a network error.');
  }

  async gasPrices(fallbackGasPrices?: GasPrice, median = true): Promise<GasPrice> {
    const defaultFastGas = 22;
    const defaultFallbackGasPrices = {
      instant: defaultFastGas * 1.3,
      fast: defaultFastGas,
      standard: defaultFastGas * 0.85,
      low: defaultFastGas * 0.5,
    };
    this.lastGasPrice = this.lastGasPrice || fallbackGasPrices || defaultFallbackGasPrices;
    try {
      this.lastGasPrice = median
        ? await this.fetchMedianGasPriceOffChain()
        : await this.fetchGasPricesOffChain();
      return this.lastGasPrice;
    } catch (e) {
      console.log('Failed to fetch gas prices from offchain oracles. Trying onchain ones...');
    }

    try {
      const fastGas = await this.fetchGasPricesOnChain();
      this.lastGasPrice = {
        instant: fastGas * 1.3,
        fast: fastGas,
        standard: fastGas * 0.85,
        low: fastGas * 0.5,
      };
      return this.lastGasPrice;
    } catch (e) {
      console.log('Failed to fetch gas prices from onchain oracles. Last known gas will be returned');
    }
    return this.lastGasPrice;
  }

  addOffChainOracle(oracle: OffChainOracle): void {
    this.offChainOracles[oracle.name] = oracle;
  }

  addOnChainOracle(oracle: OnChainOracle): void {
    this.onChainOracles[oracle.name] = oracle;
  }

  removeOnChainOracle(name: string): void {
    delete this.onChainOracles[name];
  }

  removeOffChainOracle(name: string): void {
    delete this.offChainOracles[name];
  }
}
