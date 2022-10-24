import BigNumber from 'bignumber.js'

import { FeeHistory, Block } from '@/types'
import {
  Config,
  EstimateOracle,
  EstimatedGasPrice,
  CalculateFeesParams,
  GasEstimationOptionsPayload,
  GasFeeEstimates,
} from '@/services/gas-estimation/types'

import { ChainId, NETWORKS } from '@/config'
import { RpcFetcher, NodeJSCache } from '@/services'
import { findMax, fromNumberToHex, fromWeiToGwei, getMedian } from '@/utils'
import { BG_ZERO, DEFAULT_BLOCK_DURATION, PERCENT_MULTIPLIER } from '@/constants'

import {
  DEFAULT_PRIORITY_FEE,
  PRIORITY_FEE_INCREASE_BOUNDARY,
  FEE_HISTORY_BLOCKS,
  FEE_HISTORY_PERCENTILE,
} from '@/services/gas-estimation/constants'

import fetchGasEstimatesViaEthFeeHistory from '@/services/gas-estimation/fetchGasEstimatesViaEthFeeHistory'

// !!! MAKE SENSE ALL CALCULATIONS IN GWEI !!!
export class Eip1559GasPriceOracle implements EstimateOracle {
  public configuration: Config = {
    shouldCache: false,
    chainId: ChainId.MAINNET,
    fallbackGasPrices: undefined,
    blockTime: DEFAULT_BLOCK_DURATION,
    blocksCount: NETWORKS[ChainId.MAINNET].blocksCount,
    percentile: NETWORKS[ChainId.MAINNET].percentile,
  }
  private fetcher: RpcFetcher

  private cache: NodeJSCache<EstimatedGasPrice>
  private perSpeedCache: NodeJSCache<GasFeeEstimates>
  private FEES_KEY = (chainId: ChainId) => `estimate-fee-${chainId}`
  private FEES_PER_SPEED_KEY = (chainId: ChainId) => `estimate-fee-per-speed-${chainId}`

  constructor({ fetcher, ...options }: GasEstimationOptionsPayload) {
    this.fetcher = fetcher
    const chainId = options?.chainId || this.configuration.chainId
    this.configuration.blocksCount = NETWORKS[chainId]?.blocksCount || FEE_HISTORY_BLOCKS
    this.configuration.percentile = NETWORKS[chainId]?.percentile || FEE_HISTORY_PERCENTILE

    if (options) {
      this.configuration = { ...this.configuration, ...options }
    }

    this.cache = new NodeJSCache({ stdTTL: this.configuration.blockTime, useClones: false })
    this.perSpeedCache = new NodeJSCache({ stdTTL: this.configuration.blockTime, useClones: false })
  }

  public async estimateFees(fallbackGasPrices?: EstimatedGasPrice): Promise<EstimatedGasPrice> {
    try {
      const cacheKey = this.FEES_KEY(this.configuration.chainId)
      const cachedFees = await this.cache.get(cacheKey)

      if (cachedFees) {
        return cachedFees
      }

      const { data: latestBlock } = await this.fetcher.makeRpcCall<{ result: Block }>({
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
      })

      if (!latestBlock.result.baseFeePerGas) {
        throw new Error('An error occurred while fetching current base fee, falling back')
      }

      const baseFee = fromWeiToGwei(latestBlock.result.baseFeePerGas)

      const blockCount = fromNumberToHex(this.configuration.blocksCount)
      const rewardPercentiles: number[] = [this.configuration.percentile]

      const { data } = await this.fetcher.makeRpcCall<{ result: FeeHistory }>({
        method: 'eth_feeHistory',
        params: [blockCount, 'latest', rewardPercentiles],
      })

      const fees = await this.calculateFees({ baseFee, feeHistory: data.result })
      if (this.configuration.shouldCache) {
        await this.cache.set(cacheKey, fees)
      }

      return fees
    } catch (err) {
      if (fallbackGasPrices) {
        return fallbackGasPrices
      }
      if (this.configuration.fallbackGasPrices) {
        return this.configuration.fallbackGasPrices
      }
      throw err
    }
  }

  private calculatePriorityFeeEstimate(feeHistory?: FeeHistory) {
    if (!feeHistory) {
      return null
    }

    const rewards = feeHistory.reward
      ?.map((r) => fromWeiToGwei(r[0]))
      .filter((r) => r.isGreaterThan(0))
      .sort()

    if (!rewards) {
      return null
    }

    // Calculate percentage increases from between ordered list of fees
    const percentageIncreases = rewards.reduce<BigNumber[]>((acc, curr, i, arr) => {
      if (i !== arr.length - 1) {
        const next = arr[i + 1]
        const percentageIncrease = next.minus(curr).dividedBy(curr).multipliedBy(PERCENT_MULTIPLIER)
        acc.push(percentageIncrease)
      }

      return acc
    }, [])

    const { highest, index } = findMax(percentageIncreases)
    // If we have big increased in value, we could be considering "outliers" in our estimate
    // Skip the low elements and take a new median
    const values =
      highest.isGreaterThanOrEqualTo(PRIORITY_FEE_INCREASE_BOUNDARY) && index >= getMedian(rewards)
        ? rewards.slice(index)
        : rewards

    return values[getMedian(values)]
  }

  private async getPriorityFromChain(feeHistory?: FeeHistory) {
    try {
      const { data } = await this.fetcher.makeRpcCall<{ result: string }>({
        method: 'eth_maxPriorityFeePerGas',
        params: [],
      })

      return fromWeiToGwei(data.result)
    } catch (err) {
      return this.calculatePriorityFeeEstimate(feeHistory)
    }
  }

  private async calculateFees({ baseFee, feeHistory }: CalculateFeesParams): Promise<EstimatedGasPrice> {
    const estimatedPriorityFee = await this.getPriorityFromChain(feeHistory)

    const { highest: maxPriorityFeePerGas } = findMax([estimatedPriorityFee ?? BG_ZERO, new BigNumber(DEFAULT_PRIORITY_FEE)])

    const maxFeePerGas = baseFee.plus(maxPriorityFeePerGas)

    if (this.checkIsGreaterThanMax(maxFeePerGas) || this.checkIsGreaterThanMax(maxPriorityFeePerGas)) {
      throw new Error('Estimated gas fee was much higher than expected, erroring')
    }

    return {
      baseFee: baseFee.toNumber(),
      maxFeePerGas: maxFeePerGas.toNumber(),
      maxPriorityFeePerGas: maxPriorityFeePerGas.toNumber(),
    }
  }

  private checkIsGreaterThanMax(value: BigNumber): boolean {
    return value.isGreaterThanOrEqualTo(NETWORKS[this.configuration.chainId]?.maxGasPrice) || false
  }

  public async estimateFeesPerSpeed(): Promise<GasFeeEstimates | void> {
    const cacheKey = this.FEES_PER_SPEED_KEY(this.configuration.chainId)
    const cachedFees = await this.perSpeedCache.get(cacheKey)

    if (cachedFees) {
      return cachedFees
    }

    const estimates: GasFeeEstimates = await fetchGasEstimatesViaEthFeeHistory(this.fetcher)

    if (this.configuration.shouldCache && estimates) {
      await this.perSpeedCache.set(cacheKey, estimates)
    }

    // time estimated
    // const { suggestedMaxPriorityFeePerGas, suggestedMaxFeePerGas } = estimates.medium
    // const estimatedGasFeeTimeBounds = calculateTimeEstimate(suggestedMaxPriorityFeePerGas, suggestedMaxFeePerGas, estimates)

    return estimates
  }
}
