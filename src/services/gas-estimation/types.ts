import BigNumber from 'bignumber.js'

import { FeeHistory } from '@/types'
import { RpcFetcher } from '@/services'

// export const PRIORITY_LEVEL_PERCENTILES = [10, 20, 30] as const

// export type Percentile = typeof PRIORITY_LEVEL_PERCENTILES[number]
export type unknownString = 'unknown'

export type EstimatedGasPrice = {
  maxFeePerGas: number
  baseFee: number | undefined
  maxPriorityFeePerGas: number
}

export type EstimateFeesParams = {
  blocksCount: number
  percentile: number
}

export type CalculateFeesParams = {
  baseFee: BigNumber
  feeHistory?: FeeHistory
}

export type Options = {
  chainId?: number
  blocksCount?: number
  percentile?: number
  blockTime?: number
  shouldCache?: boolean
  fallbackGasPrices: EstimatedGasPrice | undefined
}

export type GasEstimationOptionsPayload = Options & {
  fetcher: RpcFetcher
}

export type Config = Required<Options> & { fallbackGasPrices?: EstimatedGasPrice }
export abstract class EstimateOracle {
  public configuration: Config
  public abstract estimateFees(fallbackGasPrices?: EstimatedGasPrice): Promise<EstimatedGasPrice>
  public abstract estimateFeesPerSpeed(): Promise<GasFeeEstimates | void>
}

export type ExistingFeeHistoryBlock<Percentile extends number> = {
  number: BigNumber
  baseFeePerGas: BigNumber
  gasUsedRatio: number
  priorityFeesByPercentile: Record<Percentile, BigNumber>
}

export type NextFeeHistoryBlock = {
  number: BigNumber
  baseFeePerGas: BigNumber
}

export type FeeHistoryBlock<Percentile extends number> = ExistingFeeHistoryBlock<Percentile> | NextFeeHistoryBlock

export type GasFeeEstimates = {
  low: Eip1559GasFee
  medium: Eip1559GasFee
  high: Eip1559GasFee
  estimatedBaseFee: string
}

export type Eip1559GasFee = {
  minWaitTimeEstimate: number // a time duration in milliseconds
  maxWaitTimeEstimate: number // a time duration in milliseconds
  suggestedMaxPriorityFeePerGas: string // a GWEI decimal number
  suggestedMaxFeePerGas: string // a GWEI decimal number
}

export type EstimatedGasFeeTimeBounds = {
  lowerTimeBound: number | null
  upperTimeBound: number | unknownString
}
