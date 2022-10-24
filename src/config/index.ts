import bscOracles from '@/config/bsc'
import xdaiOracles from '@/config/xdai'
import avalancheOracles from '@/config/avax'
import mainnetOracles from '@/config/mainnet'
import polygonOracles from '@/config/polygon'
import optimismOracles from '@/config/optimism'
import arbitrumOracles from '@/config/arbitrum'

import { NetworksConfig } from '@/types'

export enum ChainId {
  MAINNET = 1,
  BSC = 56,
  XDAI = 100,
  POLYGON = 137,
  OPTIMISM = 10,
  ARBITRUM = 42161,
  AVAX = 43114,
}

export const NETWORKS: Record<number, NetworksConfig> = {
  [ChainId.MAINNET]: {
    oracles: mainnetOracles,
    rpcUrl: 'https://api.mycryptoapi.com/eth',
    defaultGasPrice: 22,
    maxGasPrice: 1500,
    blocksCount: 30,
    percentile: 5,
  },
  [ChainId.BSC]: {
    oracles: bscOracles,
    rpcUrl: 'https://bsc-dataseed1.ninicoin.io',
    defaultGasPrice: 5,
    maxGasPrice: 200,
    blocksCount: 30,
    percentile: 5,
  },
  [ChainId.XDAI]: {
    oracles: xdaiOracles,
    rpcUrl: 'https://rpc.gnosischain.com',
    defaultGasPrice: 5,
    maxGasPrice: 200,
    blocksCount: 30,
    percentile: 5,
  },
  [ChainId.POLYGON]: {
    oracles: polygonOracles,
    rpcUrl: 'https://rpc-mainnet.maticvigil.com',
    defaultGasPrice: 75,
    maxGasPrice: 1000,
    blocksCount: 30,
    percentile: 5,
  },
  [ChainId.OPTIMISM]: {
    oracles: optimismOracles,
    rpcUrl: 'https://mainnet.optimism.io',
    defaultGasPrice: 0.001,
    maxGasPrice: 5,
    blocksCount: 30,
    percentile: 5,
  },
  [ChainId.ARBITRUM]: {
    oracles: arbitrumOracles,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    defaultGasPrice: 3,
    maxGasPrice: 15,
    blocksCount: 30,
    percentile: 5,
  },
  [ChainId.AVAX]: {
    oracles: avalancheOracles,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    defaultGasPrice: 50,
    maxGasPrice: 1000,
    blocksCount: 30,
    percentile: 5,
  },
}
