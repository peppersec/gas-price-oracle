import { GasOracleOptions, GetGasPriceInput, OracleProvider } from '@/services/gas-price-oracle/types'

import { ChainId, NETWORKS } from '@/config'
import { DEFAULT_TIMEOUT } from '@/constants'
import { GasFeeEstimates } from '@/services/gas-estimation/types'

import {
  RpcFetcher,
  GasPrice,
  LegacyOracle,
  EstimateOracle,
  EstimatedGasPrice,
  LegacyGasPriceOracle,
  Eip1559GasPriceOracle,
} from '@/services'

export class GasPriceOracle implements OracleProvider {
  public eip1559: EstimateOracle
  public legacy: LegacyOracle
  public fetcher: RpcFetcher
  private chainId: ChainId
  public constructor(options?: GasOracleOptions) {
    const timeout = options?.timeout ?? DEFAULT_TIMEOUT
    this.chainId = options?.chainId || ChainId.MAINNET
    const defaultRpc = options?.defaultRpc || NETWORKS[this.chainId].rpcUrl

    this.fetcher = new RpcFetcher(defaultRpc, timeout)

    const { gasPrices, estimated } = options?.fallbackGasPrices || {}

    const payload = { ...options, fetcher: this.fetcher }
    this.legacy = new LegacyGasPriceOracle({
      ...payload,
      fallbackGasPrices: gasPrices,
    })

    this.eip1559 = new Eip1559GasPriceOracle({
      ...payload,
      fallbackGasPrices: estimated,
    })
  }

  public async gasPrices(payload: GetGasPriceInput = {}): Promise<GasPrice | EstimatedGasPrice | GasFeeEstimates> {
    const { fallbackGasPrices, shouldGetMedian, isLegacy = false } = payload
    if (isLegacy) {
      return await this.legacy.gasPrices(fallbackGasPrices?.gasPrices, shouldGetMedian)
    }
    try {
      const result = await this.eip1559.estimateFeesPerSpeed()
      if (!result) {
        throw new Error('get legacy gasPrice')
      }
      return result
    } catch {
      return await this.legacy.gasPrices(fallbackGasPrices?.gasPrices, shouldGetMedian)
    }
  }
}
