import fetch from 'node-fetch';
import config from './config';
import { GasPrice, Oracle } from './types';

export class GasPriceOracle {
  lastGasPrice: GasPrice = {
    instant: 40,
    fast: 21,
    standard: 10,
    low: 1
  };

  async fetchGasPrices(): Promise<GasPrice> {
    for (let oracle of config.oracles) {
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
        } else {
          throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
        }
      } catch (e) {
        console.error(e.message);
      }
    }
    // TODO: additional arg `throwIfFailsToFetch` that throws if it fails to fetch from all oracles
    return this.lastGasPrice;
  }

  addOracle(oracle: Oracle) {
    config.oracles.push(oracle);
  }
}
