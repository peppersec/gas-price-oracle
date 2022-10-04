import { RpcFetcher, GasPrice, LegacyOracle, EstimatedGasPrice, EstimateOracle, GasPriceKey } from '@/services'

export type GetTxGasParamsInput = GetGasPriceInput & {
  bumpPercent?: number
  legacySpeed?: GasPriceKey
}

export type GasPricesEip1559 = {
  maxFeePerGas: string
  maxPriorityFeePerGas: string
}

export type GetTxGasParamsRes =
  | {
      gasPrice: string
    }
  | GasPricesEip1559

export type GetGasPriceInput = {
  isLegacy?: boolean
  shouldGetMedian?: boolean
  fallbackGasPrices?: FallbackGasPrices
}

export type FallbackGasPrices = {
  gasPrices?: GasPrice
  estimated?: EstimatedGasPrice
}

export type GasPricesWithEstimateInput = {
  shouldGetMedian?: boolean
  fallbackGasPrices?: FallbackGasPrices
}

export type GasOracleOptions = {
  chainId?: number
  timeout?: number
  defaultRpc?: string
  blocksCount?: number
  percentile?: number
  blockTime?: number
  shouldCache?: boolean
  fallbackGasPrices?: FallbackGasPrices
}

export type GasPriceWithEstimate = {
  gasPrices: GasPrice
  estimate: EstimatedGasPrice
}

export type GasPricesEip1559Res = {
  baseFee: string
  low: GasPricesEip1559
  medium: GasPricesEip1559
  high: GasPricesEip1559
}

export interface OracleProvider {
  eip1559: EstimateOracle
  legacy: LegacyOracle
  fetcher: RpcFetcher
  gasPrices: (payload: GetGasPriceInput) => Promise<GasPrice | EstimatedGasPrice>
  gasPricesWithEstimate: (payload: GasPricesWithEstimateInput) => Promise<GasPriceWithEstimate>
  getTxGasParams: (payload: GetTxGasParamsInput) => Promise<GetTxGasParamsRes>
}
