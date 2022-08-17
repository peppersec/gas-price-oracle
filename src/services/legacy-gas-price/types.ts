import { RpcFetcher } from '@/services'

export type OffChainOracle = {
  url: string
  name: string
  denominator: number
  lowPropertyName: string
  fastPropertyName: string
  instantPropertyName: string
  standardPropertyName: string
  additionalDataProperty: string | null
}

export type OffChainOracles = Record<string, OffChainOracle>

export type OnChainOracle = {
  name: string
  rpc?: string
  contract: string
  callData: string
  denominator: string
}

export type OnChainOracles = Record<string, OnChainOracle>

export type AllOracles = {
  onChainOracles: OnChainOracles
  offChainOracles: OffChainOracles
}

export type NetworkConfig = Record<number, AllOracles>

export type GasPriceKey = 'instant' | 'fast' | 'standard' | 'low'
export type GasPrice = Record<GasPriceKey, number>

export type LegacyOptions = {
  chainId?: number
  timeout?: number
  blockTime?: number
  defaultRpc?: string
  shouldCache?: boolean
  fallbackGasPrices?: GasPrice
}

export type LegacyOptionsPayload = LegacyOptions & {
  fetcher: RpcFetcher
}

export type GetGasPriceFromRespInput = {
  fetcherName: string
  response: string | number
  denominator?: number | string
}

type Config = Required<LegacyOptions>

export abstract class LegacyOracle {
  static normalize: (_gas: GasPrice) => GasPrice
  static getCategorize: (gasPrice: number) => GasPrice
  static getMultipliedPrices: (gasPrice: number) => GasPrice
  static getMedianGasPrice: (gasPrices: GasPrice[]) => GasPrice
  static getGasPriceFromResponse: (payload: GetGasPriceFromRespInput) => Promise<number>

  public configuration: Config
  public lastGasPrice: GasPrice
  public onChainOracles: OnChainOracles
  public offChainOracles: OffChainOracles

  public abstract removeOnChainOracle(name: string): void
  public abstract removeOffChainOracle(name: string): void
  public abstract addOnChainOracle(oracle: OnChainOracle): void
  public abstract addOffChainOracle(oracle: OffChainOracle): void

  public fetchGasPriceFromRpc: () => Promise<number>
  public fetchGasPricesOnChain: () => Promise<number>
  public fetchMedianGasPriceOffChain: () => Promise<GasPrice>
  public askOracle: (oracle: OffChainOracle) => Promise<GasPrice>
  public fetchGasPricesOffChain: (shouldGetMedian?: boolean) => Promise<GasPrice>
  public gasPrices: (fallbackGasPrices?: GasPrice, shouldGetMedian?: boolean) => Promise<GasPrice>
}
