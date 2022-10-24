import { GasFeeEstimates } from './types'
import { RpcFetcher } from '@/services'
import fetchBlockFeeHistory from './fetchBlockFeeHistory'
import fetchLatestBlock from './fetchLatestBlock'
import calculateGasFeeEstimatesForPriorityLevels from './calculateGasFeeEstimatesForPriorityLevels'
import { fromWeiToGwei } from '@/utils'

/**
 * @param fetcher - An fetcher instance.
 * @returns Base and priority fee estimates, categorized by priority level, as well as an estimate
 * for the next block's base fee.
 */
export default async function fetchGasEstimatesViaEthFeeHistory(fetcher: RpcFetcher): Promise<GasFeeEstimates> {
  const latestBlock = await fetchLatestBlock(fetcher)
  const blocks = await fetchBlockFeeHistory({
    fetcher,
    endBlock: latestBlock.number,
    numberOfBlocks: 5,
    percentiles: [10, 20, 30],
  })
  const estimatedBaseFee = fromWeiToGwei(latestBlock.baseFeePerGas).toString(10)

  const levelSpecificEstimates = calculateGasFeeEstimatesForPriorityLevels(blocks)

  return {
    ...levelSpecificEstimates,
    estimatedBaseFee,
  }
}
