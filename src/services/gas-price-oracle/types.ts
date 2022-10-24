import { RpcFetcher, GasPrice, LegacyOracle, EstimatedGasPrice, EstimateOracle, GasPriceKey } from '@/services'
import { GasFeeEstimates } from '@/services/gas-estimation/types'

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

export interface OracleProvider {
  eip1559: EstimateOracle
  legacy: LegacyOracle
  fetcher: RpcFetcher
  gasPrices: (payload: GetGasPriceInput) => Promise<GasPrice | EstimatedGasPrice | GasFeeEstimates>
  // gasPricesWithEstimate: (
  //   payload: GasPricesWithEstimateInput,
  // ) => Promise<GasPriceWithEstimate | GasPriceBySpeedValuesWithEstimate>
  // getTxGasParams: (payload: GetTxGasParamsInput) => Promise<GetTxGasParamsRes>
}
