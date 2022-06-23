import { AxiosResponse } from 'axios';
import { MakeRpcCallInput } from './types';
export declare class RpcFetcher {
    private readonly rpc;
    private readonly timeout;
    constructor(rpc: string, timeout: number);
    makeRpcCall<R>({ rpc, timeout, method, params }: MakeRpcCallInput): Promise<AxiosResponse<R>>;
}
