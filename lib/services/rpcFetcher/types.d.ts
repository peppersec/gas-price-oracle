export declare type Params = (string | number | number[] | Record<string, string | number | boolean> | boolean)[];
export declare type MakeRpcCallInput = {
    rpc?: string;
    method: string;
    timeout?: number;
    params: Params;
};
