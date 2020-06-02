# Gas Price Oracle library for Ethereum dApps

## Instalation
`npm i gas-price-oracle`

## Import
```js
const { GasPriceOracle } = require('gas-price-oracle');
```
## Usage
### Basic
```js
const oracle = new GasPriceOracle();

oracle.gasPrices().then((gas) => {
    console.log(gas)
});
```

### Offchain oracles only
```js
const oracle = new GasPriceOracle();

oracle.fetchGasPricesOffChain().then((gas) => {
    console.log(gas)
});
```

### Custom RPC URL for onchain oracles
```js
const customRpc = 'https://mainnet.infura.io/v3/<API_KEY>'
const oracle = new GasPriceOracle(customRpc);

oracle.fetchGasPricesOnChain().then((gas) => {
    console.log(gas)
});
```

### Don't throw an error if oracles are down
```js
oracle.fetchGasPricesOnChain(false).then((gas) => {
    console.log(gas)
});

oracle.fetchGasPricesOffChain(false).then((gas) => {
    console.log(gas)
});
```
