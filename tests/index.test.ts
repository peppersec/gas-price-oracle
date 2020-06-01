import { GasPriceOracle } from '../src/index';
import { GasPrice } from '../src/types';
import mockery from 'mockery';
import chai from 'chai';

chai.use(require('chai-as-promised'));
chai.should();

describe('fetchGasPricesOffChain', function () {
  it('should work', async function () {
    const oracle = new GasPriceOracle();
    const gas: GasPrice = await oracle.fetchGasPricesOffChain();

    gas.instant.should.be.a('number');
    gas.fast.should.be.a('number');
    gas.standard.should.be.a('number');
    gas.low.should.be.a('number');

    gas.instant.should.be.above(gas.fast);
    gas.fast.should.be.above(gas.standard);
    gas.standard.should.be.above(gas.low);
    gas.low.should.not.be.equal(0);
  });
});

describe('throw checks', function () {
  before('before', function () {
    // Mocking the mod1 module
    let fetchMock = () => {
      throw new Error('Mocked for tests');
    };

    // replace the module with mock for any `require`
    mockery.registerMock('node-fetch', fetchMock);

    // set additional parameters
    mockery.enable({
      useCleanCache:      true,
      // warnOnReplace:      false,
      warnOnUnregistered: false
    });
  });

  it('should throw if all offchain oracles are down', async function () {
    const { GasPriceOracle } = require('../src/index');
    const oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOffChain().should.be.rejectedWith('All oracles are down. Probaly network error.');
  });

  it('should throw if all onchain oracles are down', async function () {
    const { GasPriceOracle } = require('../src/index');
    const oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probaly network error.');
  });

  it('should not throw if throwIfFailsToFetch is false', async function () {
    const { GasPriceOracle } = require('../src/index');
    const oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOnChain(false);
  });

  it('should not throw if throwIfFailsToFetch is false', async function () {
    const { GasPriceOracle } = require('../src/index');
    const oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOffChain(false);
  });

  after('after', function () {
    after(function () {
      mockery.disable();
      mockery.deregisterMock('node-fetch');
    });
  });
});

describe('fetchGasPricesOnChain', function () {
  it('should work', async function () {
    const oracle = new GasPriceOracle();
    const gas: GasPrice = await oracle.fetchGasPricesOnChain();

    gas.instant.should.be.a('number');
    gas.fast.should.be.a('number');
    gas.standard.should.be.a('number');
    gas.low.should.be.a('number');

    gas.instant.should.be.above(gas.fast);
    gas.fast.should.be.above(gas.standard);
    gas.standard.should.be.above(gas.low);
    gas.low.should.not.be.equal(0);
  });
});
