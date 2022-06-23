import BigNumber from 'bignumber.js';
declare type FindMaxRes = {
    highest: BigNumber;
    index: number;
};
declare const findMax: (values: BigNumber[]) => FindMaxRes;
declare const getMedian: <T>(arr: T[]) => number;
declare const round: (value: number | string | BigNumber) => BigNumber;
declare const roundGwei: (value: number | string | BigNumber) => BigNumber;
declare const bumpOnPercent: (value: number, bumpPercent: number) => number;
declare const toWei: (value: number) => number;
export { toWei, findMax, getMedian, round, roundGwei, bumpOnPercent };
