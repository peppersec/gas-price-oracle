import { OffChainOracle, OffChainOracles, OnChainOracles } from '@/services'

const ztake: OffChainOracle = {
  name: 'ztake',
  url: 'https://blockchains.ztake.org/api/h6WnmwNqw9CAJHzej5W4gD6LZ9n7v8EK/gasprice/bsc/',
  instantPropertyName: 'percentile_60',
  fastPropertyName: 'percentile_50',
  standardPropertyName: 'percentile_40',
  lowPropertyName: 'percentile_30',
  denominator: 1,
  additionalDataProperty: null,
}

export const offChainOracles: OffChainOracles = {
  ztake,
}

export const onChainOracles: OnChainOracles = {}

export default {
  offChainOracles,
  onChainOracles,
}
