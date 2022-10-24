import BigNumber from 'bignumber.js'

import { BG_ZERO, PERCENT_MULTIPLIER } from '@/constants'

import { toGwei, fromGweiToWei } from './crypto'
import { GasFeeEstimates, EstimatedGasFeeTimeBounds, unknownString } from '@/services/gas-estimation/types'

type FindMaxRes = {
  highest: BigNumber
  index: number
}

const findMax = (values: BigNumber[]): FindMaxRes => {
  return values.reduce(
    (acc, curr, index) => {
      const isGreaterThanAcc = curr.isGreaterThan(acc.highest)
      if (isGreaterThanAcc) {
        acc.highest = curr
        acc.index = index
      }
      return acc
    },
    {
      highest: BG_ZERO,
      index: 0,
    },
  )
}

const getMedian = <T>(arr: T[]): number => {
  return Math.floor(arr.length / 2)
}

const round = (value: number | string | BigNumber): BigNumber => {
  return new BigNumber(value).decimalPlaces(0, 2)
}

const roundGwei = (value: number | string | BigNumber): BigNumber => {
  return toGwei(value).decimalPlaces(0, 2)
}

const bumpOnPercent = (value: number, bumpPercent: number): number => {
  return value + (value * bumpPercent) / PERCENT_MULTIPLIER
}

export function calculateTimeEstimate(
  maxPriorityFeePerGas: string,
  maxFeePerGas: string,
  gasFeeEstimates: GasFeeEstimates,
): EstimatedGasFeeTimeBounds {
  const { low, medium, high, estimatedBaseFee } = gasFeeEstimates
  const maxPriorityFeePerGasBn = new BigNumber(maxPriorityFeePerGas ?? 0)
  const maxPriorityFeePerGasNum = maxPriorityFeePerGasBn.isNaN() ? 0 : new BigNumber(maxPriorityFeePerGas).toNumber()
  const maxPriorityFeePerGasInWEI = fromGweiToWei(maxPriorityFeePerGasNum)
  const maxFeePerGasInWEI = fromGweiToWei(maxFeePerGas)
  const estimatedBaseFeeInWEI = fromGweiToWei(estimatedBaseFee)

  const effectiveMaxPriorityFee = BigNumber.minimum(maxPriorityFeePerGasInWEI, maxFeePerGasInWEI.minus(estimatedBaseFeeInWEI))

  const lowMaxPriorityFeeInWEI = fromGweiToWei(low.suggestedMaxPriorityFeePerGas)
  const mediumMaxPriorityFeeInWEI = fromGweiToWei(medium.suggestedMaxPriorityFeePerGas)
  const highMaxPriorityFeeInWEI = fromGweiToWei(high.suggestedMaxPriorityFeePerGas)

  let lowerTimeBound
  let upperTimeBound

  if (effectiveMaxPriorityFee.lt(lowMaxPriorityFeeInWEI)) {
    lowerTimeBound = null
    upperTimeBound = 'unknown' as unknownString
  } else if (effectiveMaxPriorityFee.gte(lowMaxPriorityFeeInWEI) && effectiveMaxPriorityFee.lt(mediumMaxPriorityFeeInWEI)) {
    lowerTimeBound = low.minWaitTimeEstimate
    upperTimeBound = low.maxWaitTimeEstimate
  } else if (effectiveMaxPriorityFee.gte(mediumMaxPriorityFeeInWEI) && effectiveMaxPriorityFee.lt(highMaxPriorityFeeInWEI)) {
    lowerTimeBound = medium.minWaitTimeEstimate
    upperTimeBound = medium.maxWaitTimeEstimate
  } else if (effectiveMaxPriorityFee.eq(highMaxPriorityFeeInWEI)) {
    lowerTimeBound = high.minWaitTimeEstimate
    upperTimeBound = high.maxWaitTimeEstimate
  } else {
    lowerTimeBound = 0
    upperTimeBound = high.maxWaitTimeEstimate
  }

  return {
    lowerTimeBound,
    upperTimeBound,
  }
}

export { findMax, getMedian, round, roundGwei, bumpOnPercent }
