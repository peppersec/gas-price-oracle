# Gas Price Oracle library for Ethereum dApps

## Instalation
`npm i gas-price-oracle`

## Usage
```js
const { GasPriceOracle } = require('gas-price-oracle');
const oracle = new GasPriceOracle();

oracle.fetchGasPrices().then((gas) => {
    console.log(gas)
});
```
