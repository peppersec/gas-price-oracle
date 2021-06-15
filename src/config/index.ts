import { NetworkConfig } from '../types';
import mainnetOracles from './mainnet';
import binanceOracles from './binance';
import polygonOracles from './polygon';

export enum ChainId {
  MAINNET = 1,
  BINANCE = 56,
  POLYGON = 137,
}

export const networks: NetworkConfig = {
  [ChainId.MAINNET]: mainnetOracles,
  [ChainId.BINANCE]: binanceOracles,
  [ChainId.POLYGON]: polygonOracles,
};
