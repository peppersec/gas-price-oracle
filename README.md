# Gas Price Oracle library for Ethereum dApps [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/peppersec/gas-price-oracle/Node.js%20CI)](https://github.com/peppersec/gas-price-oracle/actions) [![npm](https://img.shields.io/npm/v/gas-price-oracle)](https://www.npmjs.com/package/gas-price-oracle)

A library that has a collection of onchain and offchain gas price oracle URLs

## Supported networks

### Ethereum Mainnet

Current offchain list:

- https://ethgasstation.info/json/ethgasAPI.json
- https://gas-oracle.zoltu.io/
- https://www.etherchain.org/api/gasPriceOracle
- https://gasprice.poa.network/
- https://www.gasnow.org/api/v3/gas/price

Current onchain list:

- [chainlink](https://etherscan.io/address/0x169e633a2d1e6c10dd91238ba11c4a708dfef37c#readContract)

### Binance Smart Chain

Current offchain list:

- https://bscgas.info/

### Polygon (Matic) Network

Current offchain list:

- https://gasstation-mainnet.matic.network/

## Installation

`npm i gas-price-oracle`

## Import

```js
const { GasPriceOracle } = require('gas-price-oracle');
```

## Usage

### Basic

```js
const options = {
  chainId: 1,
  defaultRpc: 'https://api.mycryptoapi.com/eth',
  timeout: 10000,
  defaultFallbackGasPrices: {
    instant: 28,
    fast: 22,
    standard: 17,
    low: 11,
  },
};
const oracle = new GasPriceOracle(options);
// optional fallbackGasPrices
const fallbackGasPrices = {
  instant: 70,
  fast: 31,
  standard: 20,
  low: 7,
};
oracle.gasPrices(fallbackGasPrices).then(gasPrices => {
  console.log(gasPrices); // { instant: 50, fast: 21, standard: 10, low: 3 }
});
```

The `gasPrices` method also accepts `median` argument (`true`) by default. For more details see [below](#offchain-oracles-only-get-median-price).
Under the hood it's a combination of `fetchMedianGasPriceOffChain`(`fetchGasPricesOffChain`) and `fetchGasPricesOnChain` methods.

### Offchain oracles only

```js
const oracle = new GasPriceOracle();

oracle.fetchGasPricesOffChain().then(gasPrices => {
  console.log(gasPrices); // { instant: 50, fast: 21, standard: 10, low: 3 }
});
```

### Offchain oracles only (get median price)

```js
const oracle = new GasPriceOracle();

oracle.fetchMedianGasPriceOffChain().then(gasPrices => {
  console.log(gasPrices); // { instant: 50, fast: 21, standard: 10, low: 3 }
});
```

it returns the median gas price of all the oracles configured.

### Custom RPC URL for onchain oracles

```js
const defaultRpc = 'https://mainnet.infura.io/v3/<API_KEY>';
const oracle = new GasPriceOracle({ defaultRpc });

oracle.fetchGasPricesOnChain().then(gasPrices => {
  console.log(gasPrices); // 21
});
```
