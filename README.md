# Gas Price Oracle library for Ethereum dApps [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/peppersec/gas-price-oracle/Node.js%20CI)](https://github.com/peppersec/gas-price-oracle/actions) [![npm](https://img.shields.io/npm/v/gas-price-oracle)](https://www.npmjs.com/package/gas-price-oracle)

This is a library with a collection of onchain and offchain gas price oracle URLs

## Supported networks

### Ethereum Mainnet

Current offchain list:

- https://ethgasstation.info/json/ethgasAPI.json
- https://etherchain.org/api/gasnow

Current onchain list:

- [chainlink](https://etherscan.io/address/0x169e633a2d1e6c10dd91238ba11c4a708dfef37c#readContract)

### Binance Smart Chain

Current offchain list:

- https://ztake.org/

### Gnosis Chain

Current offchain list:

- https://blockscout.com/xdai/mainnet/api/v1/gas-price-oracle

### Polygon (Matic) Network

Current offchain list:

- https://gasstation-mainnet.matic.network/

### Avalanche C Network

Current offchain list:

- https://gavax.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle

## Installation

`npm i gas-price-oracle`
or
`yarn add gas-price-oracle`

## Import

```js
const { GasPriceOracle } = require('gas-price-oracle')
or
import { GasPriceOracle } from 'gas-price-oracle'
```

## Usage

### Configuration

```typescript
type GasPrice = Record<'instant' | 'fast' | 'standard' | 'low', number>

type EstimatedGasPrice = {
  maxFeePerGas: number
  baseFee: number | undefined
  maxPriorityFeePerGas: number
}

type FallbackGasPrices = {
  gasPrices?: GasPrice
  estimated?: EstimatedGasPrice
}

type GasOracleOptions = {
  chainId?: number
  timeout?: number
  defaultRpc?: string
  blocksCount?: number
  percentile?: number
  fallbackGasPrices?: FallbackGasPrices
}

const options: GasOracleOptions = {
  chainId: 1,
  percentile: 5, // Which percentile of effective priority fees to include
  blocksCount: 10, // How many blocks to consider for priority fee estimation
  defaultRpc: 'https://api.mycryptoapi.com/eth',
  timeout: 10000, // specifies the number of milliseconds before the request times out.
  fallbackGasPrices: {
    gasPrices: {
      instant: 28,
      fast: 22,
      standard: 17,
      low: 11,
    },
    estimated: {
      maxFeePerGas: 20,
      maxPriorityFeePerGas: 3,
    },
  },
}
```

### EIP-1559 (estimated) gasPrice only

```typescript
const oracle = new GasPriceOracle({ chainId: 1 })

type EstimatedGasPrice = {
  maxFeePerGas: number
  baseFee: number | undefined
  maxPriorityFeePerGas: number
}

fallbackGasPrices: EstimatedGasPrice = {
  maxFeePerGas: 20,
  maxPriorityFeePerGas: 3,
}

oracle.eip1559.estimateFees(fallbackGasPrices).then((gasPrices: EstimatedGasPrice) => {
  console.log(gasPrices) // { baseFee: 14, maxFeePerGas: 17, maxPriorityFeePerGas: 3 }
})
```

### Legacy gasPrice only

```typescript
const oracle = new GasPriceOracle({ chainId: 1 })

type GasPrice = Record<'instant' | 'fast' | 'standard' | 'low', number>

fallbackGasPrices: GasPrice = {
  instant: 28,
  fast: 22,
  standard: 17,
  low: 11,
}

oracle.legacy.gasPrices(fallbackGasPrices).then((gasPrices: GasPrice) => {
  console.log(gasPrices) // { instant: 21.5, fast: 19, standard: 17, low: 15 }
})
```

The `oracle.legacy.gasPrices` method also accepts `shouldGetMedian` argument (`true`) by default. For more details see [below](#offchain-oracles-only-get-median-price).
Under the hood it's a combination of `fetchMedianGasPriceOffChain`(`fetchGasPricesOffChain`) and `fetchGasPricesOnChain` methods.

### Estimated gasPrices (EIP-1559) and Legacy gasPrice

```ts
const oracle = new GasPriceOracle(options)

type GasPriceWithEstimate = {
  gasPrices: GasPrice
  estimate: EstimatedGasPrice
}

type GasPricesWithEstimateInput = {
  shouldGetMedian?: boolean
  fallbackGasPrices?: FallbackGasPrices
}

// optional fallbackGasPrices
const fallbackGasPrices: FallbackGasPrices = {
  gasPrices: {
    instant: 28,
    fast: 22,
    standard: 17,
    low: 11,
  },
  estimated: {
    maxFeePerGas: 20,
    maxPriorityFeePerGas: 3,
  },
}

oracle.gasPricesWithEstimate({ fallbackGasPrices, shouldGetMedian: true }).then((gasPrices: GasPriceWithEstimate) => {
  console.log(gasPrices) // {
  // estimated: { baseFee: 14, maxFeePerGas: 17, maxPriorityFeePerGas: 3 },
  // gasPrices: { instant: 21.5, fast: 19, standard: 17, low: 15 }
  // }}
})
```

### Estimated gasPrices (EIP-1559) or Legacy gasPrice

```typescript
const oracle = new GasPriceOracle(options)

type GetGasPriceInput = {
  isLegacy?: boolean
  shouldGetMedian?: boolean
  fallbackGasPrices?: GasPrice
}

// optional fallbackGasPrices
const fallbackGasPrices: FallbackGasPrices = {
  gasPrices: {
    instant: 28,
    fast: 22,
    standard: 17,
    low: 11,
  },
  estimated: {
    maxFeePerGas: 20,
    maxPriorityFeePerGas: 3,
  },
}

oracle.gasPrices({ fallbackGasPrices, shouldGetMedian: true }).then((gasPrices: GasPrice | EstimatedGasPrice) => {
  console.log(gasPrices) // {
  // baseFee: 14, maxFeePerGas: 17, maxPriorityFeePerGas: 3 ||
  // instant: 21.5, fast: 19, standard: 17, low: 15
  // }}
})
```

The `gasPrices` method also accepts `isLegacy` argument (`false`) by default. If `isLegacy: true` - `legacy gasPrice` will be provided. If the `estimate Gas` crashes, `legacy gas Price` will be provided.

### Get transaction gasPrice params

```typescript
const oracle = new GasPriceOracle(options)

type GetTxGasParamsInput = {
  bumpPercent?: number
  legacySpeed?: GasPriceKey
  isLegacy?: boolean
  shouldGetMedian?: boolean
  fallbackGasPrices?: FallbackGasPrices
}

type GetTxGasParamsRes =
  | {
      gasPrice: number
    }
  | {
      maxFeePerGas: number
      maxPriorityFeePerGas: number
    }

const gasParams: GetTxGasParamsRes = await oracle.getTxGasParams({ legacySpeed: 'fast', bumpPercent: 30 })
console.log(gasParams) // { maxFeePerGas: 17, maxPriorityFeePerGas: 3 } || { gasPrice: 19 }

web3.eth.sendTransaction({
  from: '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
  to: '0xac03bb73b6a9e108530aff4df5077c2b3d481e5a',
  nonce: '0',
  gasLimit: '21000',
  value: '10000000000',
  ...gasParams,
})
```

`bumpPercent` argument (`0` by default) - response data will increase by `bumpPercent`%.
`legacySpeed` argument (`fast` by default) - select the speed of legacy gasPrice.

### Offchain oracles only

```typescript
const oracle = new GasPriceOracle({ chainId: 1 })

// shouldGetMedian: boolean | undefined
oracle.legacy.fetchGasPricesOffChain((shouldGetMedian = true)).then((gasPrices: GasPrice) => {
  console.log(gasPrices) // { instant: 50, fast: 21, standard: 10, low: 3 }
})
```

### Offchain oracles only (get median price)

```typescript
const oracle = new GasPriceOracle({ chainId: 1 })

oracle.legacy.fetchMedianGasPriceOffChain().then((gasPrices: GasPrice) => {
  console.log(gasPrices) // { instant: 50, fast: 21, standard: 10, low: 3 }
})
```

This command provides the median gas price of all configured oracles.

### Custom RPC URL for onchain oracles

```typescript
const defaultRpc = 'https://mainnet.infura.io/v3/<API_KEY>'
const oracle = new GasPriceOracle({ defaultRpc, chainId: 1 })

oracle.legacy.fetchGasPricesOnChain().then((gasPrices: number) => {
  console.log(gasPrices) // 21
})
```

To get gasPrices from a chain outside of the application's chain list (Binance, Gnosis, Polygon, Avalanche), you should enter the rpcUrl into initial GasPriceOracle options\_

```typescript
const defaultRpc = 'https://rpc.goerli.mudit.blog/' // goerli public rpcUrl
const oracle = new GasPriceOracle({ defaultRpc, chainId: 5 })

oracle.gasPrices()
```
