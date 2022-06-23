import BigNumber from 'bignumber.js'

import { BG_ZERO, GWEI, PERCENT_MULTIPLIER } from '@/constants'

import { toGwei } from './crypto'

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

const getMedian = <T>(arr: T[]) => {
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

const toWei = (value: number): number => {
  return new BigNumber(value).multipliedBy(GWEI).decimalPlaces(0).toNumber()
}

export { toWei, findMax, getMedian, round, roundGwei, bumpOnPercent }
