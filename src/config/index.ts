import { NetworkConfig } from '../types';
import mainnetOracles from './mainnet';
import binanceOracles from './binance';

export enum ChainId {
  MAINNET = 1,
  BINANCE = 56,
}

export const networks: NetworkConfig = {
  [ChainId.MAINNET]: mainnetOracles,
  [ChainId.BINANCE]: binanceOracles,
};
