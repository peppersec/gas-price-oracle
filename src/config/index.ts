import { NetworkConfig } from '../types';
import {
  onChainOracles as mainnetOnchainOracles,
  offChainOracles as mainnetOffChainOracles,
} from './mainnet';
import {
  onChainOracles as binanceOnchainOracles,
  offChainOracles as binanceOffchainOracles,
} from './binance';

export enum ChainId {
  MAINNET = 1,
  BINANCE = 56,
}

export const networks: NetworkConfig = {
  [ChainId.MAINNET]: {
    onChainOracles: mainnetOnchainOracles,
    offChainOracles: mainnetOffChainOracles,
  },
  [ChainId.BINANCE]: {
    onChainOracles: binanceOnchainOracles,
    offChainOracles: binanceOffchainOracles,
  },
};
