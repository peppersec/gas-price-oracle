import { GasPrice, LegacyOracle, OnChainOracle, OffChainOracle, LegacyOptions, OnChainOracles, OffChainOracles, LegacyOptionsPayload, GetGasPriceFromRespInput } from './types';
export declare class LegacyGasPriceOracle implements LegacyOracle {
    static getMedianGasPrice(gasPrices: GasPrice[]): GasPrice;
    static getMultipliedPrices(gasPrice: number): GasPrice;
    static normalize(_gas: GasPrice): GasPrice;
    static getCategorize(gasPrice: number): GasPrice;
    static getGasPriceFromResponse(payload: GetGasPriceFromRespInput): number;
    lastGasPrice: GasPrice;
    onChainOracles: OnChainOracles;
    offChainOracles: OffChainOracles;
    configuration: Required<LegacyOptions>;
    private readonly fetcher;
    constructor({ fetcher, ...options }: LegacyOptionsPayload);
    addOffChainOracle(oracle: OffChainOracle): void;
    addOnChainOracle(oracle: OnChainOracle): void;
    removeOnChainOracle(name: string): void;
    removeOffChainOracle(name: string): void;
    fetchGasPricesOnChain(): Promise<number>;
    fetchGasPriceFromRpc(): Promise<number>;
    fetchGasPricesOffChain(shouldGetMedian?: boolean): Promise<GasPrice>;
    fetchMedianGasPriceOffChain(): Promise<GasPrice>;
    gasPrices(fallbackGasPrices?: GasPrice, shouldGetMedian?: boolean): Promise<GasPrice>;
    askOracle(oracle: OffChainOracle): Promise<GasPrice>;
}
