
import { OffChainOracle, OnChainOracle } from './types';

const ethgasstation: OffChainOracle = {
  name: 'ethgasstation',
  url: 'https://ethgasstation.info/json/ethgasAPI.json',
  instantPropertyName: 'fastest',
  fastPropertyName: 'fast',
  standardPropertyName: 'average',
  lowPropertyName: 'safeLow',
  denominator: 10
};

const zoltu: OffChainOracle = {
  name: 'zoltu',
  url: 'https://gas-oracle.zoltu.io/',
  instantPropertyName: 'percentile_99',
  fastPropertyName: 'percentile_90',
  standardPropertyName: 'percentile_60',
  lowPropertyName: 'percentile_30',
  denominator: 1
};

const chainLink: OnChainOracle = {
  name: 'chainLink',
  callData: '0x50d25bcd',
  contract: '0xA417221ef64b1549575C977764E651c9FAB50141',
  denominator: '1000000000'
};

export default {
  offChainOracles: [
    ethgasstation, zoltu
  ],
  onChainOracles: [
    chainLink
  ]
};
