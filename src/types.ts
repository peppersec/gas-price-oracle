export type OffChainOracle = {
  name: string;
  url: string;
  instantPropertyName: string;
  fastPropertyName: string;
  standardPropertyName: string;
  lowPropertyName: string;
  denominator: number;
};

export type OnChainOracle = {
  name: string;
  rpc?: string;
  contract: string;
  callData: string;
  denominator: string;
};

export type GasPrice = {
  instant: number;
  fast: number;
  standard: number;
  low: number;
};
