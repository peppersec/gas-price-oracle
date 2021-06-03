export type OffChainOracle = {
  name: string;
  url: string;
  instantPropertyName: string;
  fastPropertyName: string;
  standardPropertyName: string;
  lowPropertyName: string;
  denominator: number;
  additionalDataProperty: string | null;
};

export type OffChainOracles = { [key: string]: OffChainOracle };

export type OnChainOracle = {
  name: string;
  rpc?: string;
  contract: string;
  callData: string;
  denominator: string;
};

export type OnChainOracles = { [key: string]: OnChainOracle };

export type AllOracles = {
  offChainOracles: OffChainOracles;
  onChainOracles: OnChainOracles;
};

export type GasPrice = {
  [key in GasPriceKey]: number;
};

export type GasPriceKey = 'instant' | 'fast' | 'standard' | 'low';

export type Options = {
  chainId?: number;
  defaultRpc?: string;
  timeout?: number;
  defaultFallbackGasPrices?: GasPrice;
};

export type Config = Required<Options>;

export type NetworkConfig = {
  [key in number]: AllOracles;
};
