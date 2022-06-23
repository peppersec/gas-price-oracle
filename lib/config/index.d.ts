import { NetworksConfig } from '@/types';
export declare enum ChainId {
    MAINNET = 1,
    BSC = 56,
    XDAI = 100,
    POLYGON = 137,
    OPTIMISM = 10,
    ARBITRUM = 42161,
    AVAX = 43114
}
export declare const NETWORKS: Record<number, NetworksConfig>;
