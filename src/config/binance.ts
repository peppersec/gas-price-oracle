import { OffChainOracle, OffChainOracles, OnChainOracles } from '../types';

const bscgas: OffChainOracle = {
  name: 'bscgas',
  url: 'https://bscgas.info/gas',
  instantPropertyName: 'imediate',
  fastPropertyName: 'fast',
  standardPropertyName: 'standard',
  lowPropertyName: 'slow',
  denominator: 1,
  additionalDataProperty: null,
};

export const offChainOracles: OffChainOracles = {
  bscgas,
};

export const onChainOracles: OnChainOracles = {};

export default {
  offChainOracles,
  onChainOracles,
};
