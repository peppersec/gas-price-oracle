import { RpcFetcher } from '@/services';
export declare type OffChainOracle = {
    url: string;
    name: string;
    denominator: number;
    lowPropertyName: string;
    fastPropertyName: string;
    instantPropertyName: string;
    standardPropertyName: string;
    additionalDataProperty: string | null;
};
export declare type OffChainOracles = Record<string, OffChainOracle>;
export declare type OnChainOracle = {
    name: string;
    rpc?: string;
    contract: string;
    callData: string;
    denominator: string;
};
export declare type OnChainOracles = Record<string, OnChainOracle>;
export declare type AllOracles = {
    onChainOracles: OnChainOracles;
    offChainOracles: OffChainOracles;
};
export declare type NetworkConfig = Record<number, AllOracles>;
export declare type GasPriceKey = 'instant' | 'fast' | 'standard' | 'low';
export declare type GasPrice = Record<GasPriceKey, number>;
export declare type LegacyOptions = {
    chainId?: number;
    timeout?: number;
    defaultRpc?: string;
    fallbackGasPrices?: GasPrice;
};
export declare type LegacyOptionsPayload = LegacyOptions & {
    fetcher: RpcFetcher;
};
export declare type GetGasPriceFromRespInput = {
    fetcherName: string;
    response: string | number;
    denominator?: number | string;
};
declare type Config = Required<LegacyOptions>;
export declare abstract class LegacyOracle {
    static normalize: (_gas: GasPrice) => GasPrice;
    static getCategorize: (gasPrice: number) => GasPrice;
    static getMultipliedPrices: (gasPrice: number) => GasPrice;
    static getMedianGasPrice: (gasPrices: GasPrice[]) => GasPrice;
    static getGasPriceFromResponse: (payload: GetGasPriceFromRespInput) => Promise<number>;
    configuration: Config;
    lastGasPrice: GasPrice;
    onChainOracles: OnChainOracles;
    offChainOracles: OffChainOracles;
    abstract removeOnChainOracle(name: string): void;
    abstract removeOffChainOracle(name: string): void;
    abstract addOnChainOracle(oracle: OnChainOracle): void;
    abstract addOffChainOracle(oracle: OffChainOracle): void;
    fetchGasPriceFromRpc: () => Promise<number>;
    fetchGasPricesOnChain: () => Promise<number>;
    fetchMedianGasPriceOffChain: () => Promise<GasPrice>;
    askOracle: (oracle: OffChainOracle) => Promise<GasPrice>;
    fetchGasPricesOffChain: (shouldGetMedian?: boolean) => Promise<GasPrice>;
    gasPrices: (fallbackGasPrices?: GasPrice, shouldGetMedian?: boolean) => Promise<GasPrice>;
}
export {};
