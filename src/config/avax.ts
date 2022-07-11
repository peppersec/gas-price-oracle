import { OffChainOracle, OffChainOracles, OnChainOracles } from '@/services'

const avalancheGasStation: OffChainOracle = {
  name: 'avalancheGasStation',
  url: 'https://gavax.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle',
  instantPropertyName: 'FastGasPrice',
  fastPropertyName: 'FastGasPrice',
  standardPropertyName: 'ProposeGasPrice',
  lowPropertyName: 'SafeGasPrice',
  denominator: 1,
  additionalDataProperty: 'result',
}

export const offChainOracles: OffChainOracles = {
  avalancheGasStation,
}

export const onChainOracles: OnChainOracles = {}

export default {
  offChainOracles,
  onChainOracles,
}
