import { AllOracles } from './services/legacy-gas-price';
export interface Block {
    baseFeePerGas: string;
    difficulty: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: string;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    totalDifficulty: string;
    transactions: unknown[];
    transactionsRoot: string;
    uncles: unknown[];
}
export interface FeeHistory {
    baseFeePerGas: string[];
    gasUsedRatio: number[];
    reward?: string[][];
    oldestBlock: string;
}
export declare type NetworksConfig = {
    oracles: AllOracles;
    rpcUrl: string;
    defaultGasPrice: number;
    maxGasPrice: number;
    blocksCount: number;
    percentile: number;
};
