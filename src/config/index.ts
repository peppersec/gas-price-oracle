import { NetworkConfig } from '../types';

import mainnetOracles from './mainnet';
import binanceOracles from './binance';
import xdaiOracles from './xdai';
import polygonOracles from './polygon';

export enum ChainId {
  MAINNET = 1,
  BINANCE = 56,
  XDAI = 100,
  POLYGON = 137,
}

export const networks: NetworkConfig = {
  [ChainId.MAINNET]: mainnetOracles,
  [ChainId.BINANCE]: binanceOracles,
  [ChainId.XDAI]: xdaiOracles,
  [ChainId.POLYGON]: polygonOracles,
};
