export type Oracle = {
  name: string
  url: string
  instantPropertyName: string,
  fastPropertyName: string,
  standardPropertyName: string,
  lowPropertyName: string,
  denominator: number
};

export type GasPrice = {
  instant: number;
  fast: number;
  standard: number;
  low: number;
};
