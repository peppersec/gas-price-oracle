
import { Oracle } from './types';

const ethgasstation: Oracle = {
  name: 'ethgasstation',
  url: 'https://ethgasstation.info/json/ethgasAPI.json',
  instantPropertyName: 'fastest',
  fastPropertyName: 'fast',
  standardPropertyName: 'average',
  lowPropertyName: 'safeLow',
  denominator: 10
};

const zoltu: Oracle = {
  name: 'zoltu',
  url: 'https://gas-oracle.zoltu.io/',
  instantPropertyName: 'percentile_99',
  fastPropertyName: 'percentile_90',
  standardPropertyName: 'percentile_60',
  lowPropertyName: 'percentile_30',
  denominator: 1
};

export default {
  oracles: [
    ethgasstation, zoltu
  ]
};
