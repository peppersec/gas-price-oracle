import { OffChainOracle, OffChainOracles, OnChainOracles } from '../types';

const ztake: OffChainOracle = {
  name: 'ztake',
  url: 'https://blockchains.ztake.org/api/h6WnmwNqw9CAJHzej5W4gD6LZ9n7v8EK/gasprice/arb/',
  instantPropertyName: 'percentile_90',
  fastPropertyName: 'percentile_80',
  standardPropertyName: 'percentile_60',
  lowPropertyName: 'percentile_30',
  denominator: 1,
  additionalDataProperty: null,
};

export const offChainOracles: OffChainOracles = {
  ztake,
};

export const onChainOracles: OnChainOracles = {};

export default {
  offChainOracles,
  onChainOracles,
};
