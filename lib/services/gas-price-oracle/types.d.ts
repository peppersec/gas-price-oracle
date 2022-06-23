import { RpcFetcher, GasPrice, LegacyOracle, EstimatedGasPrice, EstimateOracle, GasPriceKey } from '@/services';
export declare type GetTxGasParamsInput = GetGasPriceInput & {
    bumpPercent?: number;
    legacySpeed?: GasPriceKey;
};
export declare type GetTxGasParamsRes = {
    gasPrice: number;
} | {
    maxFeePerGas: number;
    maxPriorityFeePerGas: number;
};
export declare type GetGasPriceInput = {
    isLegacy?: boolean;
    shouldGetMedian?: boolean;
    fallbackGasPrices?: FallbackGasPrices;
};
export declare type FallbackGasPrices = {
    gasPrices?: GasPrice;
    estimated?: EstimatedGasPrice;
};
export declare type GasPricesWithEstimateInput = {
    shouldGetMedian?: boolean;
    fallbackGasPrices?: FallbackGasPrices;
};
export declare type GasOracleOptions = {
    chainId?: number;
    timeout?: number;
    defaultRpc?: string;
    blocksCount?: number;
    percentile?: number;
    fallbackGasPrices?: FallbackGasPrices;
};
export declare type GasPriceWithEstimate = {
    gasPrices: GasPrice;
    estimate: EstimatedGasPrice;
};
export interface OracleProvider {
    eip1559: EstimateOracle;
    legacy: LegacyOracle;
    fetcher: RpcFetcher;
    gasPrices: (payload: GetGasPriceInput) => Promise<GasPrice | EstimatedGasPrice>;
    gasPricesWithEstimate: (payload: GasPricesWithEstimateInput) => Promise<GasPriceWithEstimate>;
    getTxGasParams: (payload: GetTxGasParamsInput) => Promise<GetTxGasParamsRes>;
}
