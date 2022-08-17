import NodeCache, { Options } from 'node-cache'

export class NodeJSCache<T> {
  private nodeCache: NodeCache
  constructor(params: Options) {
    this.nodeCache = new NodeCache(params)
  }

  async get(key: string): Promise<T | undefined> {
    return await this.nodeCache.get<T>(key)
  }

  async set(key: string, value: T): Promise<boolean> {
    return await this.nodeCache.set(key, value)
  }

  async has(key: string): Promise<boolean> {
    return await this.nodeCache.has(key)
  }
}
