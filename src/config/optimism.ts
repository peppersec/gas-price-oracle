import { OffChainOracles, OnChainOracle, OnChainOracles } from '@/services'

export const offChainOracles: OffChainOracles = {}

const optimism: OnChainOracle = {
  name: 'optimism',
  callData: '0xfe173b97',
  denominator: '1000000000',
  contract: '0x420000000000000000000000000000000000000F',
}
export const onChainOracles: OnChainOracles = {
  optimism,
}

export default {
  offChainOracles,
  onChainOracles,
}
