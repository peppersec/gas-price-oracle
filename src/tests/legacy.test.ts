/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chai from 'chai'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mockery from 'mockery'
import BigNumber from 'bignumber.js'
import { before, describe } from 'mocha'

import { ChainId, NETWORKS } from '@/config'
import { DEFAULT_TIMEOUT } from '@/constants'
import { GasPriceOracle } from '@/services/gas-price-oracle'
import { GasPrice, LegacyGasPriceOracle, OffChainOracle } from '@/services/legacy-gas-price'

chai.use(require('chai-as-promised'))
chai.should()

let oracle = new GasPriceOracle()
let { onChainOracles, offChainOracles } = oracle.legacy

before('before', async () => {
  const gasPrice = await oracle.legacy.gasPrices()
  console.log('legacy gasPrice - ', { gasPrice })
})

before('before', function () {
  const axiosMock = {
    get: () => {
      throw new Error('axios GET method is mocked for tests')
    },
    post: () => {
      throw new Error('axios POST method is mocked for tests')
    },
  }
  mockery.registerMock('axios', axiosMock)
})

beforeEach('beforeEach', function () {
  oracle = new GasPriceOracle()
  ;({ onChainOracles, offChainOracles } = oracle.legacy)
})

const INJECTED_RPC_URL = 'https://ethereum-rpc.trustwalletapp.com'

describe('legacy gasOracle', function () {
  describe('legacy constructor', function () {
    it('should set default values', function () {
      oracle.legacy.configuration.defaultRpc.should.be.equal(NETWORKS[ChainId.MAINNET].rpcUrl)
      oracle.legacy.configuration.timeout.should.be.equal(DEFAULT_TIMEOUT)
    })

    it('should set passed values', function () {
      const newOracle = new GasPriceOracle({ timeout: 1337 })

      newOracle.legacy.configuration.defaultRpc.should.be.equal(NETWORKS[ChainId.MAINNET].rpcUrl)
      newOracle.legacy.configuration.timeout.should.be.equal(1337)
    })
  })

  describe('fetchGasPricesOffChain', function () {
    it('should work', async function () {
      const gas: GasPrice = await oracle.legacy.fetchGasPricesOffChain(true)

      gas.instant.should.be.a('number')
      gas.fast.should.be.a('number')
      gas.standard.should.be.a('number')
      gas.low.should.be.a('number')

      gas.instant.should.be.at.least(gas.fast)
      gas.fast.should.be.at.least(gas.standard)
      gas.standard.should.be.at.least(gas.low)
      gas.low.should.not.be.equal(0)
    })

    it('should throw if all offchain oracles are down', async function () {
      mockery.enable({ useCleanCache: true, warnOnUnregistered: false })
      const { GasPriceOracle } = require('../index')
      oracle = new GasPriceOracle()
      await oracle.legacy.fetchGasPricesOffChain(true).should.be.rejectedWith('All oracles are down. Probably a network error.')
      mockery.disable()
    })
  })

  describe('fetchGasPricesOnChain', function () {
    it('should work', async function () {
      const gas: number = await oracle.legacy.fetchGasPricesOnChain()
      gas.should.be.a('number')
      gas.should.be.above(1)
      gas.should.not.be.equal(0)
    })

    it('should work with custom rpc', async function () {
      const rpc = INJECTED_RPC_URL
      oracle = new GasPriceOracle({ defaultRpc: rpc })
      oracle.legacy.configuration.defaultRpc.should.be.equal(rpc)
      const gas: number = await oracle.legacy.fetchGasPricesOnChain()

      gas.should.be.a('number')

      gas.should.be.above(1)
      gas.should.not.be.equal(0)
    })

    it('should remove oracle', async function () {
      await oracle.legacy.fetchGasPricesOnChain()
      oracle.legacy.removeOnChainOracle('chainlink')
      await oracle.legacy.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probably a network error.')
    })

    it('should add oracle', async function () {
      const toAdd = onChainOracles.chainlink
      await oracle.legacy.fetchGasPricesOnChain()
      oracle.legacy.removeOnChainOracle('chainlink')

      await oracle.legacy.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probably a network error.')

      oracle.legacy.addOnChainOracle(toAdd)
      const gas: number = await oracle.legacy.fetchGasPricesOnChain()

      gas.should.be.a('number')
      gas.should.not.be.equal(0)
    })

    it('should throw if all onchain oracles are down', async function () {
      mockery.enable({ useCleanCache: true, warnOnUnregistered: false })
      const { GasPriceOracle } = require('../index')

      oracle = new GasPriceOracle()
      await oracle.legacy.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probably a network error.')
      mockery.disable()
    })
  })

  describe('fetchGasPriceFromRpc', function () {
    it('should work', async function () {
      const gas: number = await oracle.legacy.fetchGasPriceFromRpc()
      gas.should.be.a('number')
      gas.should.be.above(1)
      gas.should.not.be.equal(0)
    })

    it('should work with custom rpc', async function () {
      const rpc = INJECTED_RPC_URL
      const oracle = new GasPriceOracle({ defaultRpc: rpc })
      oracle.legacy.configuration.defaultRpc.should.be.equal(rpc)
      const gas: number = await oracle.legacy.fetchGasPriceFromRpc()

      gas.should.be.a('number')

      gas.should.be.above(1)
      gas.should.not.be.equal(0)
    })

    it('should throw if default rpc is down', async function () {
      mockery.enable({ useCleanCache: true, warnOnUnregistered: false })
      const { GasPriceOracle } = require('../index')

      oracle = new GasPriceOracle()
      await oracle.legacy.fetchGasPriceFromRpc().should.be.rejectedWith('Default RPC is down. Probably a network error.')
      mockery.disable()
    })
  })

  describe('legacy gasPrice', function () {
    it('should work', async function () {
      const gas = (await oracle.gasPrices({ isLegacy: true })) as unknown as GasPrice

      gas.instant.should.be.a('number')
      gas.fast.should.be.a('number')
      gas.standard.should.be.a('number')
      gas.low.should.be.a('number')

      gas.instant.should.be.at.least(gas.fast)
      gas.fast.should.be.at.least(gas.standard)
      gas.standard.should.be.at.least(gas.low)
      gas.low.should.not.be.equal(0)
    })

    it('should fallback', async function () {
      mockery.enable({ useCleanCache: true, warnOnUnregistered: false })
      const { GasPriceOracle } = require('../index')

      oracle = new GasPriceOracle()

      const gas = (await oracle.gasPrices({ isLegacy: true })) as unknown as GasPrice

      const shouldBe = LegacyGasPriceOracle.getMultipliedPrices(NETWORKS[ChainId.MAINNET].defaultGasPrice)

      gas.instant.should.be.equal(shouldBe.instant)
      gas.fast.should.be.equal(shouldBe.fast)
      gas.standard.should.be.equal(shouldBe.standard)
      gas.low.should.be.equal(shouldBe.low)

      mockery.disable()
    })

    it('should fallback to set values', async function () {
      mockery.enable({ useCleanCache: true, warnOnUnregistered: false })
      const { GasPriceOracle } = require('../index')
      oracle = new GasPriceOracle()

      const fallbackGasPrices = {
        gasPrices: {
          instant: 50,
          fast: 21,
          standard: 10,
          low: 3,
        },
      }
      const gas = (await oracle.gasPrices({ isLegacy: true, fallbackGasPrices })) as unknown as GasPrice

      gas.instant.should.be.equal(fallbackGasPrices.gasPrices.instant)
      gas.fast.should.be.equal(fallbackGasPrices.gasPrices.fast)
      gas.standard.should.be.equal(fallbackGasPrices.gasPrices.standard)
      gas.low.should.be.equal(fallbackGasPrices.gasPrices.low)

      mockery.disable()
    })
  })

  describe('median', function () {
    it('should work', function () {
      const gas1 = { instant: 100, fast: 100, standard: 100, low: 100 }
      const gas2 = { instant: 90, fast: 90, standard: 90, low: 90 }
      const gas3 = { instant: 70, fast: 70, standard: 70, low: 70 }
      const gas4 = { instant: 110.1, fast: 110.1, standard: 110.1, low: 110.1 }

      let gas: GasPrice = LegacyGasPriceOracle.getMedianGasPrice([gas1, gas2, gas3])

      gas.instant.should.be.a('number')
      gas.fast.should.be.a('number')
      gas.standard.should.be.a('number')
      gas.low.should.be.a('number')

      gas.instant.should.be.eq(90)
      gas.fast.should.be.eq(90)
      gas.standard.should.be.eq(90)
      gas.low.should.be.eq(90)

      gas = LegacyGasPriceOracle.getMedianGasPrice([gas1, gas2, gas3, gas4])

      gas.instant.should.be.a('number')
      gas.fast.should.be.a('number')
      gas.standard.should.be.a('number')
      gas.low.should.be.a('number')

      gas.instant.should.be.eq(95)
      gas.fast.should.be.eq(95)
      gas.standard.should.be.eq(95)
      gas.low.should.be.eq(95)
    })
  })

  describe('fetchMedianGasPriceOffChain', function () {
    it('should work', async function () {
      const gas: GasPrice = await oracle.legacy.fetchMedianGasPriceOffChain()

      gas.instant.should.be.a('number')
      gas.fast.should.be.a('number')
      gas.standard.should.be.a('number')
      gas.low.should.be.a('number')

      gas.instant.should.be.at.least(gas.fast)
      gas.fast.should.be.at.least(gas.standard)
      gas.standard.should.be.at.least(gas.low)
      gas.low.should.not.be.equal(0)
    })
  })

  describe('normalize result values', function () {
    const wrongDecimalsGas = {
      gasPrices: {
        instant: 1.1,
        fast: 2.12345678901,
        standard: 3.12345678901,
        low: 3.12345679,
      },
    }

    const checkDecimals = (gas: GasPrice) => {
      const gasPrices: number[] = Object.values(gas)

      for (const gas of gasPrices) {
        new BigNumber(gas).dp().should.be.at.most(9)
      }
    }

    it('default fallback should be normalized', function () {
      mockery.enable({ useCleanCache: true, warnOnUnregistered: false })

      oracle = new GasPriceOracle({ fallbackGasPrices: wrongDecimalsGas })

      checkDecimals(oracle.legacy.configuration.fallbackGasPrices)

      mockery.disable()
    })

    it('fallback should be normalized', async function () {
      mockery.enable({ useCleanCache: true, warnOnUnregistered: false })
      const { GasPriceOracle } = require('../index')

      oracle = new GasPriceOracle()

      const gas = await oracle.legacy.gasPrices(wrongDecimalsGas.gasPrices)

      checkDecimals(gas)
      mockery.disable()
    })

    it('rpc fallback should be normalized', async function () {
      oracle = new GasPriceOracle({ chainId: 42161, defaultRpc: 'https://arb1.arbitrum.io/rpc' })

      const gas = await oracle.legacy.gasPrices()

      checkDecimals(gas)
    })
  })

  describe('askOracle', function () {
    const chains = Object.keys(NETWORKS).map((id) => Number(id))

    chains.forEach((chainId) => {
      describe(`all ${ChainId[chainId]} oracles should answer`, function () {
        oracle = new GasPriceOracle({ chainId })
        ;({ offChainOracles } = oracle.legacy)

        for (const o of Object.values(offChainOracles) as OffChainOracle[]) {
          it(`check ${o.name}`, async function () {
            try {
              const gas: GasPrice = await oracle.legacy.askOracle(o)

              gas.instant.should.be.a('number')
              gas.fast.should.be.a('number')
              gas.standard.should.be.a('number')
              gas.low.should.be.a('number')

              gas.instant.should.be.at.least(gas.fast)
              gas.fast.should.be.at.least(gas.standard)
              gas.standard.should.be.at.least(gas.low)
              gas.low.should.not.be.equal(0)
            } catch (e) {
              console.error(`Failed to get data from ${o.name} oracle`)
              throw new Error(e)
            }
          })
        }
      })
    })
  })
})

after('after', function () {
  after(function () {
    mockery.disable()
    mockery.deregisterMock('node-fetch')
  })
})
