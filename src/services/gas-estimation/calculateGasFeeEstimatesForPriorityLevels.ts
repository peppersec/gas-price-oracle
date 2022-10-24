import BigNumber from 'bignumber.js'
import { fromWeiToGwei } from '../../utils'
import { Eip1559GasFee, GasFeeEstimates, FeeHistoryBlock } from './types'
import medianOf from './medianOf'

export type PriorityLevel = typeof PRIORITY_LEVELS[number]
export type Percentile = typeof PRIORITY_LEVEL_PERCENTILES[number]

const PRIORITY_LEVELS = ['low', 'medium', 'high'] as const
const PRIORITY_LEVEL_PERCENTILES = [10, 20, 30] as const
const SETTINGS_BY_PRIORITY_LEVEL = {
  low: {
    percentile: 10 as Percentile,
    baseFeePercentageMultiplier: new BigNumber(110),
    priorityFeePercentageMultiplier: new BigNumber(94),
    minSuggestedMaxPriorityFeePerGas: new BigNumber(1_000_000_000),
    estimatedWaitTimes: {
      minWaitTimeEstimate: 15_000,
      maxWaitTimeEstimate: 30_000,
    },
  },
  medium: {
    percentile: 20 as Percentile,
    baseFeePercentageMultiplier: new BigNumber(120),
    priorityFeePercentageMultiplier: new BigNumber(97),
    minSuggestedMaxPriorityFeePerGas: new BigNumber(1_500_000_000),
    estimatedWaitTimes: {
      minWaitTimeEstimate: 15_000,
      maxWaitTimeEstimate: 45_000,
    },
  },
  high: {
    percentile: 30 as Percentile,
    baseFeePercentageMultiplier: new BigNumber(125),
    priorityFeePercentageMultiplier: new BigNumber(98),
    minSuggestedMaxPriorityFeePerGas: new BigNumber(2_000_000_000),
    estimatedWaitTimes: {
      minWaitTimeEstimate: 15_000,
      maxWaitTimeEstimate: 60_000,
    },
  },
}

/**
 * Calculates a set of estimates assigned to a particular priority level based on the data returned
 * by `eth_feeHistory`.
 *
 * @param priorityLevel - The level of fees that dictates how soon a transaction may go through
 * ("low", "medium", or "high").
 * @param blocks - A set of blocks as obtained from {@link fetchBlockFeeHistory}.
 * @returns The estimates.
 */
function calculateEstimatesForPriorityLevel(priorityLevel: PriorityLevel, blocks: FeeHistoryBlock<Percentile>[]): Eip1559GasFee {
  const settings = SETTINGS_BY_PRIORITY_LEVEL[priorityLevel]

  const latestBaseFeePerGas = blocks[blocks.length - 1].baseFeePerGas

  const adjustedBaseFee = latestBaseFeePerGas.multipliedBy(settings.baseFeePercentageMultiplier).dividedBy(100)
  const priorityFees = blocks
    .map((block) => {
      return 'priorityFeesByPercentile' in block ? block.priorityFeesByPercentile[settings.percentile] : null
    })
    .filter(BigNumber.isBigNumber)
  const medianPriorityFee = medianOf(priorityFees)
  const adjustedPriorityFee = medianPriorityFee.multipliedBy(settings.priorityFeePercentageMultiplier).dividedBy(100)

  const suggestedMaxPriorityFeePerGas = BigNumber.maximum(adjustedPriorityFee, settings.minSuggestedMaxPriorityFeePerGas)
  const suggestedMaxFeePerGas = adjustedBaseFee.plus(suggestedMaxPriorityFeePerGas)

  return {
    ...settings.estimatedWaitTimes,
    suggestedMaxPriorityFeePerGas: fromWeiToGwei(suggestedMaxPriorityFeePerGas).toString(10),
    suggestedMaxFeePerGas: fromWeiToGwei(suggestedMaxFeePerGas).toString(10),
  }
}

/**
 * Calculates a set of estimates suitable for different priority levels based on the data returned
 * by `eth_feeHistory`.
 *
 * @param blocks - A set of blocks populated with data for priority fee percentiles 10, 20, and 30,
 * obtained via {@link BlockFeeHistoryDatasetFetcher}.
 * @returns The estimates.
 */
export default function calculateGasFeeEstimatesForPriorityLevels(
  blocks: FeeHistoryBlock<Percentile>[],
): Pick<GasFeeEstimates, PriorityLevel> {
  return PRIORITY_LEVELS.reduce((obj, priorityLevel) => {
    const gasEstimatesForPriorityLevel = calculateEstimatesForPriorityLevel(priorityLevel, blocks)
    return { ...obj, [priorityLevel]: gasEstimatesForPriorityLevel }
  }, {} as Pick<GasFeeEstimates, PriorityLevel>)
}
