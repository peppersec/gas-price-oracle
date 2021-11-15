import { NetworkConfig } from '../types';

import mainnetOracles from './mainnet';
import bscOracles from './bsc';
import xdaiOracles from './xdai';
import polygonOracles from './polygon';
import arbitrumOracles from './arbitrum';
import avalancheOracles from './avalanche';

export enum ChainId {
  MAINNET = 1,
  BSC = 56,
  XDAI = 100,
  POLYGON = 137,
  ARBITRUM = 42161,
  AVALANCHE = 43114,
}

export const NETWORKS: NetworkConfig = {
  [ChainId.MAINNET]: mainnetOracles,
  [ChainId.BSC]: bscOracles,
  [ChainId.XDAI]: xdaiOracles,
  [ChainId.POLYGON]: polygonOracles,
  [ChainId.ARBITRUM]: arbitrumOracles,
  [ChainId.AVALANCHE]: avalancheOracles,
};
