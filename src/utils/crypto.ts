import BigNumber from 'bignumber.js'
import { GWEI, GWEI_PRECISION } from '@/constants'

const toGwei = (amount: number | string | BigNumber): BigNumber => {
  return new BigNumber(amount).multipliedBy(GWEI).decimalPlaces(GWEI_PRECISION)
}

const fromWeiToGwei = (amount: number | string | BigNumber): BigNumber => {
  return new BigNumber(amount).dividedBy(GWEI).decimalPlaces(GWEI_PRECISION)
}

const fromNumberToHex = (amount: number | string | BigNumber): string => {
  return `0x${new BigNumber(amount).toString(16)}`
}

export { toGwei, fromWeiToGwei, fromNumberToHex }
