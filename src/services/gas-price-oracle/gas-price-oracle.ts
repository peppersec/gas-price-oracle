import {
  GasOracleOptions,
  GasPricesWithEstimateInput,
  GasPriceWithEstimate,
  GetGasPriceInput,
  GetTxGasParamsInput,
  GetTxGasParamsRes,
  OracleProvider,
} from './types'

import { ChainId, NETWORKS } from '@/config'
import { DEFAULT_TIMEOUT } from '@/constants'
import { bumpOnPercent, fromNumberToHex, toWei } from '@/utils'

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

  public async gasPrices(payload: GetGasPriceInput = {}): Promise<GasPrice | EstimatedGasPrice> {
    const { fallbackGasPrices, shouldGetMedian, isLegacy = false } = payload
    if (isLegacy) {
      return await this.legacy.gasPrices(fallbackGasPrices?.gasPrices, shouldGetMedian)
    }
    try {
      return await this.eip1559.estimateFees(fallbackGasPrices?.estimated)
    } catch {
      return await this.legacy.gasPrices(fallbackGasPrices?.gasPrices, shouldGetMedian)
    }
  }

  public async getTxGasParams(payload: GetTxGasParamsInput = {}): Promise<GetTxGasParamsRes> {
    const { fallbackGasPrices, shouldGetMedian, isLegacy = false, bumpPercent = 0, legacySpeed = 'fast' } = payload

    if (isLegacy) {
      const legacyGasPrice = await this.legacy.gasPrices(fallbackGasPrices?.gasPrices, shouldGetMedian)

      return { gasPrice: fromNumberToHex(toWei(bumpOnPercent(legacyGasPrice[legacySpeed], bumpPercent))) }
    }

    try {
      const eipParams = await this.eip1559.estimateFees(fallbackGasPrices?.estimated)
      return {
        maxFeePerGas: fromNumberToHex(toWei(bumpOnPercent(eipParams.maxFeePerGas, bumpPercent))),
        maxPriorityFeePerGas: fromNumberToHex(toWei(bumpOnPercent(eipParams.maxPriorityFeePerGas, bumpPercent))),
      }
    } catch {
      const legacyGasPrice = await this.legacy.gasPrices(fallbackGasPrices?.gasPrices, shouldGetMedian)

      return { gasPrice: fromNumberToHex(toWei(bumpOnPercent(legacyGasPrice[legacySpeed], bumpPercent))) }
    }
  }

  public async gasPricesWithEstimate(payload: GasPricesWithEstimateInput = {}): Promise<GasPriceWithEstimate> {
    const { fallbackGasPrices, shouldGetMedian } = payload

    const estimate = await this.eip1559.estimateFees(fallbackGasPrices?.estimated)
    const gasPrices = await this.legacy.gasPrices(fallbackGasPrices?.gasPrices, shouldGetMedian)

    return {
      estimate,
      gasPrices,
    }
  }
}
