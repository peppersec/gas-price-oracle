import BigNumber from 'bignumber.js';
declare const toGwei: (amount: number | string | BigNumber) => BigNumber;
declare const fromWeiToGwei: (amount: number | string | BigNumber) => BigNumber;
declare const fromNumberToHex: (amount: number | string | BigNumber) => string;
export { toGwei, fromWeiToGwei, fromNumberToHex };
