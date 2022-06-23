import { GasOracleOptions, GasPricesWithEstimateInput, GasPriceWithEstimate, GetGasPriceInput, GetTxGasParamsInput, GetTxGasParamsRes, OracleProvider } from './types';
import { RpcFetcher, GasPrice, LegacyOracle, EstimateOracle, EstimatedGasPrice } from '@/services';
export declare class GasPriceOracle implements OracleProvider {
    eip1559: EstimateOracle;
    legacy: LegacyOracle;
    fetcher: RpcFetcher;
    private chainId;
    constructor(options?: GasOracleOptions);
    gasPrices(payload: GetGasPriceInput): Promise<GasPrice | EstimatedGasPrice>;
    getTxGasParams(payload: GetTxGasParamsInput): Promise<GetTxGasParamsRes>;
    gasPricesWithEstimate(payload: GasPricesWithEstimateInput): Promise<GasPriceWithEstimate>;
}
