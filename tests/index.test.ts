/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import chai from 'chai';
import mockery from 'mockery';
import BigNumber from 'bignumber.js';

import { ChainId, NETWORKS } from '../src/config';
import { GasPriceOracle } from '../src/index';

import { GasPrice, OffChainOracle } from '../src/types';

chai.use(require('chai-as-promised'));
chai.should();

let oracle = new GasPriceOracle();
let { onChainOracles, offChainOracles } = oracle;

before('before', function () {
  const axiosMock = {
    get: () => {
      throw new Error('axios GET method is mocked for tests');
    },
    post: () => {
      throw new Error('axios POST method is mocked for tests');
    },
  };
  mockery.registerMock('axios', axiosMock);
});

beforeEach('beforeEach', function () {
  oracle = new GasPriceOracle();
  ({ onChainOracles, offChainOracles } = oracle);
});

describe('constructor', function () {
  it('should set default values', async function () {
    oracle.configuration.defaultRpc.should.be.equal('https://api.mycryptoapi.com/eth');
    oracle.configuration.timeout.should.be.equal(10000);
  });

  it('should set passed values', async function () {
    const newOracle = new GasPriceOracle({ timeout: 1337 });
    newOracle.configuration.defaultRpc.should.be.equal('https://api.mycryptoapi.com/eth');
    newOracle.configuration.timeout.should.be.equal(1337);
  });
});

describe('fetchGasPricesOffChain', function () {
  it('should work', async function () {
    const gas: GasPrice = await oracle.fetchGasPricesOffChain();

    gas.instant.should.be.a('number');
    gas.fast.should.be.a('number');
    gas.standard.should.be.a('number');
    gas.low.should.be.a('number');

    gas.instant.should.be.at.least(gas.fast); // greater than or equal to the given number.
    gas.fast.should.be.at.least(gas.standard);
    gas.standard.should.be.at.least(gas.low);
    gas.low.should.not.be.equal(0);
  });

  it('should throw if all offchain oracles are down', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    await oracle
      .fetchGasPricesOffChain()
      .should.be.rejectedWith('All oracles are down. Probably a network error.');
    mockery.disable();
  });
});

describe('fetchGasPricesOnChain', function () {
  it('should work', async function () {
    const gas: number = await oracle.fetchGasPricesOnChain();
    gas.should.be.a('number');
    gas.should.be.above(1);
    gas.should.not.be.equal(0);
  });

  it('should work with custom rpc', async function () {
    const rpc = 'https://ethereum-rpc.trustwalletapp.com';
    const oracle = new GasPriceOracle({ defaultRpc: rpc });
    oracle.configuration.defaultRpc.should.be.equal(rpc);
    const gas: number = await oracle.fetchGasPricesOnChain();

    gas.should.be.a('number');

    gas.should.be.above(1);
    gas.should.not.be.equal(0);
  });

  it('should remove oracle', async function () {
    await oracle.fetchGasPricesOnChain();
    oracle.removeOnChainOracle('chainlink');
    await oracle
      .fetchGasPricesOnChain()
      .should.be.rejectedWith('All oracles are down. Probably a network error.');
  });

  it('should add oracle', async function () {
    const { chainlink } = onChainOracles;
    await oracle.fetchGasPricesOnChain();
    oracle.removeOnChainOracle('chainlink');
    await oracle
      .fetchGasPricesOnChain()
      .should.be.rejectedWith('All oracles are down. Probably a network error.');
    oracle.addOnChainOracle(chainlink);
    const gas: number = await oracle.fetchGasPricesOnChain();

    gas.should.be.a('number');
    gas.should.not.be.equal(0);
  });

  it('should throw if all onchain oracles are down', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    await oracle
      .fetchGasPricesOnChain()
      .should.be.rejectedWith('All oracles are down. Probably a network error.');
    mockery.disable();
  });
});

describe('fetchGasPriceFromRpc', function () {
  it('should work', async function () {
    const gas: number = await oracle.fetchGasPriceFromRpc();
    gas.should.be.a('number');
    gas.should.be.above(1);
    gas.should.not.be.equal(0);
  });

  it('should work with custom rpc', async function () {
    const rpc = 'https://ethereum-rpc.trustwalletapp.com';
    const oracle = new GasPriceOracle({ defaultRpc: rpc });
    oracle.configuration.defaultRpc.should.be.equal(rpc);
    const gas: number = await oracle.fetchGasPriceFromRpc();

    gas.should.be.a('number');

    gas.should.be.above(1);
    gas.should.not.be.equal(0);
  });

  it('should throw if default rpc is down', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();
    await oracle
      .fetchGasPriceFromRpc()
      .should.be.rejectedWith('Default RPC is down. Probably a network error.');
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

    gas.instant.should.be.at.least(gas.fast);
    gas.fast.should.be.at.least(gas.standard);
    gas.standard.should.be.at.least(gas.low);
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

describe('median', function () {
  it('should work', async function () {
    const gas1 = { instant: 100, fast: 100, standard: 100, low: 100 };
    const gas2 = { instant: 90, fast: 90, standard: 90, low: 90 };
    const gas3 = { instant: 70, fast: 70, standard: 70, low: 70 };
    const gas4 = { instant: 110.1, fast: 110.1, standard: 110.1, low: 110.1 };
    let gas: GasPrice = await oracle.median([gas1, gas2, gas3]);
    gas.instant.should.be.a('number');
    gas.fast.should.be.a('number');
    gas.standard.should.be.a('number');
    gas.low.should.be.a('number');

    gas.instant.should.be.eq(90);
    gas.fast.should.be.eq(90);
    gas.standard.should.be.eq(90);
    gas.low.should.be.eq(90);

    gas = await oracle.median([gas1, gas2, gas3, gas4]);
    gas.instant.should.be.a('number');
    gas.fast.should.be.a('number');
    gas.standard.should.be.a('number');
    gas.low.should.be.a('number');

    gas.instant.should.be.eq(95);
    gas.fast.should.be.eq(95);
    gas.standard.should.be.eq(95);
    gas.low.should.be.eq(95);
  });
});

describe('fetchMedianGasPriceOffChain', function () {
  it('should work', async function () {
    const gas: GasPrice = await oracle.fetchMedianGasPriceOffChain();
    gas.instant.should.be.a('number');
    gas.fast.should.be.a('number');
    gas.standard.should.be.a('number');
    gas.low.should.be.a('number');

    gas.instant.should.be.at.least(gas.fast); // greater than or equal to the given number.
    gas.fast.should.be.at.least(gas.standard);
    gas.standard.should.be.at.least(gas.low);
    gas.low.should.not.be.equal(0);
  });
});

describe('normalize result values', function () {
  const wrongDecimalsGas = {
    instant: 1.1,
    fast: 2.12345678901,
    standard: 3.12345678901,
    low: 3.1234567890123456789,
  };

  const checkDecimals = (gas: GasPrice) => {
    const gasPrices: number[] = Object.values(gas);

    for (const gas of gasPrices) {
      new BigNumber(gas).dp().should.be.at.most(9);
    }
  };

  it('default fallback should be normalized', function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });

    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle({
      defaultFallbackGasPrices: wrongDecimalsGas,
    });
    const { configuration } = oracle;

    checkDecimals(configuration.defaultFallbackGasPrices);

    mockery.disable();
  });

  it('fallback should be normalized', async function () {
    mockery.enable({ useCleanCache: true, warnOnUnregistered: false });

    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle();

    const gas = await oracle.gasPrices(wrongDecimalsGas);

    checkDecimals(gas);
    mockery.disable();
  });

  it('rpc fallback should be normalized', async function () {
    const { GasPriceOracle } = require('../src/index');
    oracle = new GasPriceOracle({ chainId: 42161, defaultRpc: 'https://arb1.arbitrum.io/rpc' });

    const gas = await oracle.gasPrices();

    checkDecimals(gas);
  });
});

describe('askOracle', function () {
  const chains = Object.keys(NETWORKS).map(id => Number(id));

  chains.forEach(chainId => {
    describe(`all ${ChainId[chainId]} oracles should answer`, function () {
      oracle = new GasPriceOracle({ chainId });
      ({ offChainOracles } = oracle);

      for (const o of Object.values(offChainOracles) as Array<OffChainOracle>) {
        it(`check ${o.name}`, async function () {
          try {
            const gas: GasPrice = await oracle.askOracle(o);

            gas.instant.should.be.a('number');
            gas.fast.should.be.a('number');
            gas.standard.should.be.a('number');
            gas.low.should.be.a('number');

            gas.instant.should.be.at.least(gas.fast); // greater than or equal to the given number.
            gas.fast.should.be.at.least(gas.standard);
            gas.standard.should.be.at.least(gas.low);
            gas.low.should.not.be.equal(0);
          } catch (e) {
            console.error(`Failed to get data from ${o.name} oracle`);
            throw new Error(e);
          }
        });
      }
    });
  });
});

after('after', function () {
  after(function () {
    mockery.disable();
    mockery.deregisterMock('node-fetch');
  });
});
