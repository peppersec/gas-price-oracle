/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chai from 'chai'
import BigNumber from 'bignumber.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mockery from 'mockery'
import { before, describe } from 'mocha'

import { GWEI_PRECISION } from '@/constants'
import { GasPriceOracle, GasPrice } from '@/services'

chai.use(require('chai-as-promised'))
chai.should()

let oracle = new GasPriceOracle()

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
})

const INJECTED_CHAIN_ID = 5
const INJECTED_RPC_URL = 'https://rpc.goerli.mudit.blog/'

describe('complex test', function () {
  describe('fetching data', function () {
    describe('should work with unexpected chainId', function () {
      // it('legacy', async function () {
      //   const newOracle = new GasPriceOracle({ chainId: ChainId.XDAI })
      //
      //   for (let i = 0; i < 100; i++) {
      //     const res = await newOracle.eip1559.estimateFees()
      //     await new Promise((r) =>
      //       setTimeout(() => {
      //         r(console.log(`res - ${i}`, res))
      //       }, 3000),
      //     )
      //   }
      // })

      it('legacy', async function () {
        const newOracle = new GasPriceOracle({ timeout: 1337, chainId: INJECTED_CHAIN_ID, defaultRpc: INJECTED_RPC_URL })

        const goerliGas = (await newOracle.gasPrices({ isLegacy: true })) as unknown as GasPrice
        if ('instant' in goerliGas) {
          goerliGas.instant.should.be.a('number')
          goerliGas.fast.should.be.a('number')
          goerliGas.standard.should.be.a('number')
          goerliGas.low.should.be.a('number')
        }

        newOracle.legacy.configuration.defaultRpc.should.be.equal(INJECTED_RPC_URL)
        newOracle.legacy.configuration.chainId.should.be.equal(INJECTED_CHAIN_ID)
      })
      it('eip-1559', async function () {
        const newOracle = new GasPriceOracle({ timeout: 1337, chainId: INJECTED_CHAIN_ID, defaultRpc: INJECTED_RPC_URL })

        const goerliEstimated = await newOracle.eip1559.estimateFees()
        if (goerliEstimated.baseFee) {
          goerliEstimated.baseFee.should.be.a('number')

          goerliEstimated.maxFeePerGas.should.be.at.least(goerliEstimated.baseFee)
          const estimatedMaxFee = new BigNumber(goerliEstimated.baseFee)
            .plus(goerliEstimated.maxPriorityFeePerGas)
            .decimalPlaces(GWEI_PRECISION)
            .toNumber()
          goerliEstimated.maxFeePerGas.should.be.at.equal(estimatedMaxFee)
        }

        goerliEstimated.maxFeePerGas.should.be.a('number')
        goerliEstimated.maxPriorityFeePerGas.should.be.a('number')

        newOracle.legacy.configuration.defaultRpc.should.be.equal(INJECTED_RPC_URL)
        newOracle.legacy.configuration.chainId.should.be.equal(INJECTED_CHAIN_ID)
      })
      it('without selected strategy', async function () {
        const newOracle = new GasPriceOracle({ timeout: 1337, chainId: INJECTED_CHAIN_ID, defaultRpc: INJECTED_RPC_URL })

        const gasPrice = await newOracle.gasPrices({})

        if ('baseFee' in gasPrice && gasPrice.baseFee) {
          gasPrice.baseFee.should.be.a('number')

          gasPrice.maxFeePerGas.should.be.at.least(gasPrice.baseFee)
          const estimatedMaxFee = new BigNumber(gasPrice.baseFee)
            .plus(gasPrice.maxPriorityFeePerGas)
            .decimalPlaces(GWEI_PRECISION)
            .toNumber()
          gasPrice.maxFeePerGas.should.be.at.equal(estimatedMaxFee)
        }

        if ('maxFeePerGas' in gasPrice) {
          gasPrice.maxFeePerGas.should.be.a('number')
          gasPrice.maxPriorityFeePerGas.should.be.a('number')
        }

        if ('instant' in gasPrice) {
          gasPrice.instant.should.be.a('number')
          gasPrice.fast.should.be.a('number')
          gasPrice.standard.should.be.a('number')
          gasPrice.low.should.be.a('number')
        }

        newOracle.legacy.configuration.defaultRpc.should.be.equal(INJECTED_RPC_URL)
        newOracle.legacy.configuration.chainId.should.be.equal(INJECTED_CHAIN_ID)
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
