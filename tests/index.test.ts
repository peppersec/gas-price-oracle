import { GasPriceOracle } from '../src/index';
import { GasPrice } from '../src/types';

describe('Get gas price', function () {
  it('should work', async function () {
    const oracle = new GasPriceOracle();
    const gas: GasPrice = await oracle.fetchGasPrices();
    console.log(gas);
  });
});
