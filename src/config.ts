import { OffChainOracle, OnChainOracle } from './types';

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

const zoltu: OffChainOracle = {
  name: 'zoltu',
  url: 'https://gas-oracle.zoltu.io/',
  instantPropertyName: 'percentile_99',
  fastPropertyName: 'percentile_90',
  standardPropertyName: 'percentile_60',
  lowPropertyName: 'percentile_30',
  denominator: 1,
  additionalDataProperty: null,
};

const etherchain: OffChainOracle = {
  name: 'etherchain',
  url: 'https://www.etherchain.org/api/gasPriceOracle',
  instantPropertyName: 'fastest',
  fastPropertyName: 'fast',
  standardPropertyName: 'standard',
  lowPropertyName: 'safeLow',
  denominator: 1,
  additionalDataProperty: null,
};

const poa: OffChainOracle = {
  name: 'poa',
  url: 'https://gasprice.poa.network/',
  instantPropertyName: 'instant',
  fastPropertyName: 'fast',
  standardPropertyName: 'standard',
  lowPropertyName: 'slow',
  denominator: 1,
  additionalDataProperty: null,
};

const gasNow: OffChainOracle = {
  name: 'gasNow',
  url: 'https://www.gasnow.org/api/v3/gas/price?utm_source=gas-price-oracle',
  instantPropertyName: 'rapid',
  fastPropertyName: 'fast',
  standardPropertyName: 'standard',
  lowPropertyName: 'slow',
  denominator: 1e9,
  additionalDataProperty: 'data',
};

const chainlink: OnChainOracle = {
  name: 'chainlink',
  callData: '0x50d25bcd',
  contract: '0x169E633A2D1E6c10dD91238Ba11c4A708dfEF37C',
  denominator: '1000000000',
};

export const offChainOracles: { [key: string]: OffChainOracle } = {
  ethgasstation,
  gasNow,
  poa,
  etherchain,
  zoltu,
};

export const onChainOracles: { [key: string]: OnChainOracle } = {
  chainlink,
};

export default {
  offChainOracles,
  onChainOracles,
};
