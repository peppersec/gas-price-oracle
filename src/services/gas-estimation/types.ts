import BigNumber from 'bignumber.js'

import { FeeHistory } from '@/types'
import { RpcFetcher } from '@/services'

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
  fallbackGasPrices: EstimatedGasPrice | undefined
}

export type GasEstimationOptionsPayload = Options & {
  fetcher: RpcFetcher
}

export type Config = Required<Options> & { fallbackGasPrices?: EstimatedGasPrice }
export abstract class EstimateOracle {
  public configuration: Config
  public abstract estimateFees(fallbackGasPrices?: EstimatedGasPrice): Promise<EstimatedGasPrice>
}
