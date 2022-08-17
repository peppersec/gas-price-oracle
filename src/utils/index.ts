export * from './math'
export * from './crypto'

const sleep = (time: number): Promise<boolean> => {
  return new Promise((res) => setTimeout(() => res(true), time))
}

export { sleep }
