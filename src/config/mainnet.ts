import { OffChainOracle, OnChainOracle, OffChainOracles, OnChainOracles } from '../types';

const ethgasstation: OffChainOracle = {
  name: 'ethgasstation',
  url: 'https://ethgasstation.info/json/ethgasAPI.json',
  instantPropertyName: 'fastest',
  fastPropertyName: 'fast',
  standardPropertyName: 'average',
  lowPropertyName: 'safeLow',
  denominator: 10,
  additionalDataProperty: null,
};

const etherchain: OffChainOracle = {
  name: 'etherchain',
  url: 'https://etherchain.org/api/gasnow',
  instantPropertyName: 'rapid',
  fastPropertyName: 'fast',
  standardPropertyName: 'standard',
  lowPropertyName: 'slow',
  denominator: 1,
  additionalDataProperty: 'data',
};

const blockscout: OffChainOracle = {
  name: 'blockscout',
  url: 'https://blockscout.com/eth/mainnet/api/v1/gas-price-oracle',
  instantPropertyName: 'fast',
  fastPropertyName: 'average',
  standardPropertyName: 'slow',
  lowPropertyName: 'slow',
  denominator: 1,
  additionalDataProperty: null,
};

const anyblock: OffChainOracle = {
  name: 'anyblock',
  url: 'https://api.anyblock.tools/ethereum/latest-minimum-gasprice',
  instantPropertyName: 'instant',
  fastPropertyName: 'fast',
  standardPropertyName: 'standard',
  lowPropertyName: 'slow',
  denominator: 1,
  additionalDataProperty: null,
};

const chainlink: OnChainOracle = {
  name: 'chainlink',
  callData: '0x50d25bcd',
  contract: '0x169E633A2D1E6c10dD91238Ba11c4A708dfEF37C',
  denominator: '1000000000',
};

export const offChainOracles: OffChainOracles = {
  ethgasstation,
  anyblock,
  blockscout,
  etherchain,
};

export const onChainOracles: OnChainOracles = {
  chainlink,
};

export default {
  offChainOracles,
  onChainOracles,
};
