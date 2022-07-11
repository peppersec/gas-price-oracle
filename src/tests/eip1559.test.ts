// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chai from 'chai'
import BigNumber from 'bignumber.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chaiAsPromised from 'chai-as-promised'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mockery from 'mockery'
import { before, describe } from 'mocha'

import { ChainId, NETWORKS } from '@/config'
import { GWEI_PRECISION } from '@/constants'

import { GasPriceOracle } from '@/services/gas-price-oracle'
import { EstimatedGasPrice } from '@/services/gas-estimation'
import { FALLBACK_ESTIMATE } from '@/services/gas-estimation/constants'

chai.use(chaiAsPromised)
chai.should()

let oracle = new GasPriceOracle()

before('before', async () => {
  const gasPrice = await oracle.eip1559.estimateFees()
  console.log('eip estimation -', { gasPrice })
})

//
beforeEach('beforeEach', function () {
  oracle = new GasPriceOracle()
})

const INJECTED_RPC_URL = 'https://ethereum-rpc.trustwalletapp.com'
describe('eip-1559 gasOracle', function () {
  describe('eip constructor', function () {
    it('should set default values', function () {
      oracle.eip1559.configuration.blocksCount.should.be.equal(NETWORKS[oracle.eip1559.configuration.chainId].blocksCount)
      oracle.eip1559.configuration.percentile.should.be.equal(NETWORKS[oracle.eip1559.configuration.chainId].percentile)
    })

    it('should set passed values', function () {
      const newHistoryBlocks = 15
      const newHistoryPercentile = 10

      const newOracle = new GasPriceOracle({
        blocksCount: newHistoryBlocks,
        percentile: newHistoryPercentile,
      })

      newOracle.eip1559.configuration.blocksCount.should.be.equal(newHistoryBlocks)
      newOracle.eip1559.configuration.percentile.should.be.equal(newHistoryPercentile)
    })
  })

  const chains = Object.keys(NETWORKS).map((id) => Number(id))

  chains.forEach((chainId) => {
    let eipOracle = new GasPriceOracle({ chainId })

    describe(`estimateGas ${chainId}`, function () {
      it('should return error if not eip-1559 not supported', async function () {
        if (chainId === ChainId.OPTIMISM || chainId === ChainId.ARBITRUM || chainId === ChainId.BSC) {
          await eipOracle.eip1559
            .estimateFees()
            .should.be.rejectedWith('An error occurred while fetching current base fee, falling back')
        }
      })

      if (chainId === ChainId.OPTIMISM || chainId === ChainId.ARBITRUM || chainId === ChainId.BSC) {
        return
      }

      it('should work', async function () {
        const estimateGas: EstimatedGasPrice = await eipOracle.eip1559.estimateFees()

        console.log(`estimateGas ${chainId}`, estimateGas)
        if (estimateGas.baseFee) {
          estimateGas.baseFee.should.be.a('number')
          estimateGas.maxFeePerGas.should.be.a('number')
          estimateGas.maxPriorityFeePerGas.should.be.a('number')

          estimateGas.maxFeePerGas.should.be.at.least(estimateGas.baseFee)
          const estimatedMaxFee = new BigNumber(estimateGas.baseFee)
            .plus(estimateGas.maxPriorityFeePerGas)
            .decimalPlaces(GWEI_PRECISION)
            .toNumber()
          estimateGas.maxFeePerGas.should.be.at.equal(estimatedMaxFee)
        }
      })

      it('should work with crashed rpc (return default data)', async function () {
        eipOracle = new GasPriceOracle({ defaultRpc: 'wrongRpcUrl', chainId })
        const estimateGas: EstimatedGasPrice = await eipOracle.eip1559.estimateFees(FALLBACK_ESTIMATE)

        if (estimateGas.baseFee) {
          estimateGas.baseFee.should.be.a('number')
          estimateGas.maxFeePerGas.should.be.a('number')
          estimateGas.maxPriorityFeePerGas.should.be.a('number')

          estimateGas.baseFee.should.be.at.equal(FALLBACK_ESTIMATE.baseFee)
          estimateGas.maxFeePerGas.should.be.at.equal(FALLBACK_ESTIMATE.maxFeePerGas)
          estimateGas.maxPriorityFeePerGas.should.be.at.equal(FALLBACK_ESTIMATE.maxPriorityFeePerGas)
        }
      })

      it('should work with custom rpc', async function () {
        eipOracle = new GasPriceOracle({ defaultRpc: INJECTED_RPC_URL, chainId })
        const estimateGas: EstimatedGasPrice = await eipOracle.eip1559.estimateFees(FALLBACK_ESTIMATE)

        if (estimateGas.baseFee) {
          estimateGas.baseFee.should.be.a('number')
          estimateGas.maxFeePerGas.should.be.a('number')
          estimateGas.maxPriorityFeePerGas.should.be.a('number')

          const estimatedMaxFee = new BigNumber(estimateGas.baseFee)
            .plus(estimateGas.maxPriorityFeePerGas)
            .decimalPlaces(GWEI_PRECISION)
            .toNumber()
          estimateGas.maxFeePerGas.should.be.at.least(estimateGas.baseFee)
          estimateGas.maxFeePerGas.should.be.at.equal(estimatedMaxFee)
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
