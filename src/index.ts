import fetch from 'node-fetch';
import config from './config';
import { GasPrice, OffChainOracle, OnChainOracle } from './types';
import BigNumber from 'bignumber.js';

export class GasPriceOracle {
  lastGasPrice: GasPrice = {
    instant: 40,
    fast: 21,
    standard: 10,
    low: 1
  };
  defaultRpc = 'https://api.mycryptoapi.com/eth';
  offChainOracles = { ...config.offChainOracles };
  onChainOracles = { ...config.onChainOracles };

  constructor(defaultRpc?: string) {
    if (defaultRpc) {
      this.defaultRpc = defaultRpc;
    }
  }

  async fetchGasPricesOffChain(throwIfFailsToFetch = true): Promise<GasPrice> {
    for (let oracle of Object.values(this.offChainOracles)) {
      const { name, url, instantPropertyName, fastPropertyName, standardPropertyName, lowPropertyName, denominator } = oracle;
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const gas = await response.json();
          if (Number(gas[fastPropertyName]) === 0) {
            throw new Error(`${name} oracle provides corrupted values`);
          }
          const gasPrices: GasPrice = {
            instant: parseFloat(gas[instantPropertyName]) / denominator,
            fast: parseFloat(gas[fastPropertyName]) / denominator,
            standard: parseFloat(gas[standardPropertyName]) / denominator,
            low: parseFloat(gas[lowPropertyName]) / denominator
          };
          this.lastGasPrice = gasPrices;
          return this.lastGasPrice;
        } else {
          throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
    if (throwIfFailsToFetch) {
      throw new Error('All oracles are down. Probaly network error.');
    }
    return this.lastGasPrice;
  }

  async fetchGasPricesOnChain(throwIfFailsToFetch = true): Promise<GasPrice> {
    for (let oracle of Object.values(this.onChainOracles)) {
      const { name, callData, contract, denominator } = oracle;
      let { rpc } = oracle;
      rpc = rpc ? rpc : this.defaultRpc;
      const body = { jsonrpc: '2.0',
        id: 1337,
        method: 'eth_call',
        params: [{ 'data': callData, 'to': contract }, 'latest']
      };
      try {
        const response = await fetch(rpc, {
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body),
          method: 'POST'
        });
        if (response.status === 200) {
          const { result } = await response.json();
          let fastGasPrice = new BigNumber(result);
          if (fastGasPrice.isZero()) {
            throw new Error(`${name} oracle provides corrupted values`);
          }
          fastGasPrice = fastGasPrice.div(denominator);
          const gasPrices: GasPrice = {
            instant: fastGasPrice.multipliedBy(1.3).toNumber(),
            fast: fastGasPrice.toNumber(),
            standard: fastGasPrice.multipliedBy(0.85).toNumber(),
            low: fastGasPrice.multipliedBy(0.5).toNumber()
          };
          this.lastGasPrice = gasPrices;
          return this.lastGasPrice;
        } else {
          throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
    if (throwIfFailsToFetch) {
      throw new Error('All oracles are down. Probaly network error.');
    }
    return this.lastGasPrice;
  }

  async gasPrices(): Promise<GasPrice> {
    let gas = this.lastGasPrice;
    try {
      gas = await this.fetchGasPricesOffChain();
      return gas;
    } catch (e) {
      console.log('Failed to fetch gas prices from offchain oracles. Trying onchain ones...');
    }

    try {
      gas = await this.fetchGasPricesOnChain();
      return gas;
    } catch (e) {
      console.log('Failed to fetch gas prices from onchain oracles. Last known gas will be returned');
    }

    return gas;
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
