import { OffChainOracle, OffChainOracles, OnChainOracles } from '../types';

const blockscout: OffChainOracle = {
  name: 'blockscout',
  url: 'https://blockscout.com/xdai/mainnet/api/v1/gas-price-oracle',
  instantPropertyName: 'fast',
  fastPropertyName: 'average',
  standardPropertyName: 'slow',
  lowPropertyName: 'slow',
  denominator: 1,
  additionalDataProperty: null,
};

export const offChainOracles: OffChainOracles = {
  blockscout,
};

export const onChainOracles: OnChainOracles = {};

export default {
  offChainOracles,
  onChainOracles,
};
