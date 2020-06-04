# Gas Price Oracle library for Ethereum dApps [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/peppersec/gas-price-oracle/Node.js%20CI)](https://github.com/peppersec/gas-price-oracle/actions) [![npm](https://img.shields.io/npm/v/gas-price-oracle)](https://www.npmjs.com/package/gas-price-oracle) 
A library that has a collection of onchain and offchain gas price oracle URLs

Current offchain list:  
- https://ethgasstation.info/json/ethgasAPI.json  
- https://gas-oracle.zoltu.io/  
- https://www.etherchain.org/api/gasPriceOracle  
- https://gasprice.poa.network/  

Current onchain list:  
- [chainlink](https://etherscan.io/address/0xA417221ef64b1549575C977764E651c9FAB50141)  

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
    defaultRpc: 'https://api.mycryptoapi.com/eth'
}
const oracle = new GasPriceOracle(options);
// optional fallbackGasPrices
const fallbackGasPrices = {
    instant: 70, fast: 31, standard: 20, low: 7
}
oracle.gasPrices(fallbackGasPrices).then((gasPrices) => {
    console.log(gasPrices) // { instant: 50, fast: 21, standard: 10, low: 3 }
});
```

### Offchain oracles only
```js
const oracle = new GasPriceOracle();

oracle.fetchGasPricesOffChain().then((gasPrices) => {
    console.log(gasPrices) // { instant: 50, fast: 21, standard: 10, low: 3 }
});
```

### Custom RPC URL for onchain oracles
```js
const defaultRpc = 'https://mainnet.infura.io/v3/<API_KEY>'
const oracle = new GasPriceOracle({ defaultRpc });

oracle.fetchGasPricesOnChain().then((gasPrices) => {
    console.log(gasPrices) // 21
});
```
