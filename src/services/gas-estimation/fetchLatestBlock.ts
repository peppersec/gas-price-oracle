import BigNumber from 'bignumber.js'
import { RpcFetcher } from '../rpcFetcher'
import { NextFeeHistoryBlock } from './types'
import { Block } from '../../types'

/**
 * Returns information about the latest completed block.
 *
 * @param ethQuery - An EthQuery instance
 * @param includeFullTransactionData - Whether or not to include all data for transactions as
 * opposed to merely hashes. False by default.
 * @returns The block.
 */
export default async function fetchLatestBlock(
  fetcher: RpcFetcher,
  includeFullTransactionData = false,
): Promise<NextFeeHistoryBlock> {
  const blockNumberData = await fetcher.makeRpcCall<{ result: string }>({
    method: 'eth_blockNumber',
    params: [],
  })

  const { data: blockData } = await fetcher.makeRpcCall<{ result: Block }>({
    method: 'eth_getBlockByNumber',
    params: [blockNumberData.data.result ?? 'latest', includeFullTransactionData],
  })

  const block = blockData.result ?? {}

  return {
    ...block,
    number: new BigNumber(block.number),
    baseFeePerGas: new BigNumber(block.baseFeePerGas),
  }
}
