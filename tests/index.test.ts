import { GasPrice } from '../src/types';
import mockery from 'mockery';
import chai from 'chai';
import { onChainOracles } from '../src/config';

const { GasPriceOracle } = require('../src/index');
chai.use(require('chai-as-promised'));
chai.should();
let oracle = new GasPriceOracle();

before('before', function () {
  let fetchMock = () => {
    throw new Error('Mocked for tests');
  };
  mockery.registerMock('node-fetch', fetchMock);
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

  it('should not throw if throwIfFailsToFetch is false', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOffChain(false);
    mockery.disable();
  });
});

describe('fetchGasPricesOnChain', function () {
  it('should work', async function () {
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

  it('should work with custom rpc', async function () {
    const rpc = 'https://ethereum-rpc.trustwalletapp.com';
    const oracle = new GasPriceOracle(rpc);
    oracle.defaultRpc.should.be.equal(rpc);
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

  it('should throw if all onchain oracles are down', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probaly network error.');
    mockery.disable();
  });

  it('should not throw if throwIfFailsToFetch is false', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    await oracle.fetchGasPricesOnChain(false);
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
});

after('after', function () {
  after(function () {
    mockery.disable();
    mockery.deregisterMock('node-fetch');
  });
});
