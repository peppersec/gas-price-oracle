// How many blocks to consider for priority fee estimation
import BigNumber from 'bignumber.js'
import { EstimatedGasPrice } from '@/services/gas-estimation/types'

const FEE_HISTORY_BLOCKS = 10
// Which percentile of effective priority fees to include
const FEE_HISTORY_PERCENTILE = 5

const DEFAULT_BASE_FEE = 20
const DEFAULT_PRIORITY_FEE = 3
const PRIORITY_FEE_INCREASE_BOUNDARY = 200 // %

const FALLBACK_ESTIMATE: EstimatedGasPrice = {
  baseFee: DEFAULT_BASE_FEE,
  maxPriorityFeePerGas: DEFAULT_PRIORITY_FEE,
  maxFeePerGas: new BigNumber(DEFAULT_PRIORITY_FEE).plus(DEFAULT_BASE_FEE).toNumber(),
}

export {
  DEFAULT_BASE_FEE,
  FALLBACK_ESTIMATE,
  FEE_HISTORY_BLOCKS,
  DEFAULT_PRIORITY_FEE,
  FEE_HISTORY_PERCENTILE,
  PRIORITY_FEE_INCREASE_BOUNDARY,
}
