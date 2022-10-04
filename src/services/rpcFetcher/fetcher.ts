import axios, { AxiosResponse } from 'axios'
import { MakeRpcCallInput } from '@/services/rpcFetcher/types'

export class RpcFetcher {
  private readonly rpc: string
  private readonly timeout: number

  constructor(rpc: string, timeout: number) {
    this.rpc = rpc
    this.timeout = timeout
  }

  public async makeRpcCall<R>({ rpc, timeout, method, params }: MakeRpcCallInput): Promise<AxiosResponse<R>> {
    const body = {
      method,
      id: 1337,
      jsonrpc: '2.0',
      params: params,
    }

    return await axios.post<R>(rpc || this.rpc, body, { timeout: timeout || this.timeout })
  }
}
