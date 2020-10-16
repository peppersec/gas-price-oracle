import axios from 'axios';
import config from './config';
import { GasPrice, OffChainOracle, OnChainOracle, ConstructorArgs, GasPriceKey } from './types';
import BigNumber from 'bignumber.js';

export class GasPriceOracle {
  lastGasPrice: GasPrice;
  defaultRpc = 'https://api.mycryptoapi.com/eth';
  offChainOracles = { ...config.offChainOracles };
  onChainOracles = { ...config.onChainOracles };

  constructor(options: ConstructorArgs) {
    if (options && options.defaultRpc) {
      this.defaultRpc = options.defaultRpc;
    }
  }

  async fetchGasPricesOffChain(): Promise<GasPrice> {
    for (let oracle of Object.values(this.offChainOracles)) {
      const {
        name,
        url,
        instantPropertyName,
        fastPropertyName,
        standardPropertyName,
        lowPropertyName,
        denominator,
      } = oracle;
      try {
        const response = await axios.get(url, { timeout: 10000 });
        if (response.status === 200) {
          const gas = response.data;
          if (Number(gas[fastPropertyName]) === 0) {
            throw new Error(`${name} oracle provides corrupted values`);
          }
          const gasPrices: GasPrice = {
            instant: parseFloat(gas[instantPropertyName]) / denominator,
            fast: parseFloat(gas[fastPropertyName]) / denominator,
            standard: parseFloat(gas[standardPropertyName]) / denominator,
            low: parseFloat(gas[lowPropertyName]) / denominator,
          };
          return gasPrices;
        } else {
          throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
    throw new Error('All oracles are down. Probably a network error.');
  }

  async fetchMedianGasPriceOffChain(): Promise<GasPrice> {
    const allGasPrices: GasPrice[] = [];
    for (let oracle of Object.values(this.offChainOracles)) {
      const {
        name,
        url,
        instantPropertyName,
        fastPropertyName,
        standardPropertyName,
        lowPropertyName,
        denominator,
      } = oracle;
      try {
        const response = await axios.get(url, { timeout: 10000 });
        // todo parallel requests
        if (response.status === 200) {
          const gas = response.data;
          if (Number(gas[fastPropertyName]) === 0) {
            throw new Error(`${name} oracle provides corrupted values`);
          }
          const gasPrices: GasPrice = {
            instant: parseFloat(gas[instantPropertyName]) / denominator,
            fast: parseFloat(gas[fastPropertyName]) / denominator,
            standard: parseFloat(gas[standardPropertyName]) / denominator,
            low: parseFloat(gas[lowPropertyName]) / denominator,
          };
          allGasPrices.push(gasPrices);
        } else {
          throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
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
    return medianGasPrice;
  }

  async fetchGasPricesOnChain(): Promise<number> {
    for (let oracle of Object.values(this.onChainOracles)) {
      const { name, callData, contract, denominator } = oracle;
      let { rpc } = oracle;
      rpc = rpc ? rpc : this.defaultRpc;
      const body = {
        jsonrpc: '2.0',
        id: 1337,
        method: 'eth_call',
        params: [{ data: callData, to: contract }, 'latest'],
      };
      try {
        const response = await axios.post(rpc, body, { timeout: 10000 });
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

  addOffChainOracle(oracle: OffChainOracle) {
    this.offChainOracles[oracle.name] = oracle;
  }

  addOnChainOracle(oracle: OnChainOracle) {
    this.onChainOracles[oracle.name] = oracle;
  }

  removeOnChainOracle(name: string) {
    delete this.onChainOracles[name];
  }

  removeOffChainOracle(name: string) {
    delete this.offChainOracles[name];
  }
}
