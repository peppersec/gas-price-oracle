import { GasPrice } from '../src/types';
import mockery from 'mockery';
import chai from 'chai';
import { onChainOracles } from '../src/config';

const { GasPriceOracle } = require('../src/index');
chai.use(require('chai-as-promised'));
chai.should();
let oracle = new GasPriceOracle();

before('before', function () {
  let axiosMock = {
    get: () => {
      throw new Error('axios GET methdod is mocked for tests');
    },
    post: () => {
      throw new Error('axios POST methdod is mocked for tests');
    }
  };
  mockery.registerMock('axios', axiosMock);
});

beforeEach('beforeEach', function () {
  oracle = new GasPriceOracle();
});

describe('fetchGasPricesOffChain', function () {
  it('should work', async function () {
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

  it('should throw if all offchain oracles are down', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOffChain().should.be.rejectedWith('All oracles are down. Probaly network error.');
    mockery.disable();
  });
});

describe('fetchGasPricesOnChain', function () {
  it('should work', async function () {
    const gas: number = await oracle.fetchGasPricesOnChain();

    gas.should.be.a('number');
    gas.should.not.be.equal(0);
  });

  it('should work with custom rpc', async function () {
    const rpc = 'https://ethereum-rpc.trustwalletapp.com';
    const oracle = new GasPriceOracle({ defaultRpc: rpc });
    oracle.defaultRpc.should.be.equal(rpc);
    const gas: number = await oracle.fetchGasPricesOnChain();

    gas.should.be.a('number');

    gas.should.be.above(1);
    gas.should.not.be.equal(0);
  });

  it('should remove oracle', async function () {
    await oracle.fetchGasPricesOnChain();
    oracle.removeOnChainOracle('chainlink');
    await oracle.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probaly network error.');
  });

  it('should add oracle', async function () {
    const { chainlink } = onChainOracles;
    await oracle.fetchGasPricesOnChain();
    oracle.removeOnChainOracle('chainlink');
    await oracle.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probaly network error.');
    oracle.addOnChainOracle(chainlink);
    const gas: number = await oracle.fetchGasPricesOnChain();

    gas.should.be.a('number');
    gas.should.not.be.equal(0);
  });

  it('should throw if all onchain oracles are down', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probaly network error.');
    mockery.disable();
  });

});

describe('gasPrice', function () {
  it('should work', async function () {
    const gas: GasPrice = await oracle.gasPrices();

    gas.instant.should.be.a('number');
    gas.fast.should.be.a('number');
    gas.standard.should.be.a('number');
    gas.low.should.be.a('number');

    gas.instant.should.be.above(gas.fast);
    gas.fast.should.be.above(gas.standard);
    gas.standard.should.be.above(gas.low);
    gas.low.should.not.be.equal(0);
  });
  it('should fallback', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    const gas: GasPrice = await oracle.gasPrices();

    gas.instant.should.be.equal(28.6);
    gas.fast.should.be.equal(22);
    gas.standard.should.be.equal(18.7);
    gas.low.should.be.equal(11);
    mockery.disable();
  });

  it('should fallback to set values', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    const gas: GasPrice = await oracle.gasPrices({ instant: 50, fast: 21, standard: 10, low: 3 });

    gas.instant.should.be.equal(50);
    gas.fast.should.be.equal(21);
    gas.standard.should.be.equal(10);
    gas.low.should.be.equal(3);
    mockery.disable();
  });
});

after('after', function () {
  after(function () {
    mockery.disable();
    mockery.deregisterMock('node-fetch');
  });
});
