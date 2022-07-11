export type Params = (string | number | number[] | Record<string, string | number | boolean> | boolean)[]
export type MakeRpcCallInput = {
  rpc?: string
  method: string
  timeout?: number
  params: Params
}
