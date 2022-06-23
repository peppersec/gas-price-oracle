"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NETWORKS = exports.ChainId = void 0;

var _bsc = _interopRequireDefault(require("./bsc"));

var _xdai = _interopRequireDefault(require("./xdai"));

var _avax = _interopRequireDefault(require("./avax"));

var _mainnet = _interopRequireDefault(require("./mainnet"));

var _polygon = _interopRequireDefault(require("./polygon"));

var _optimism = _interopRequireDefault(require("./optimism"));

var _arbitrum = _interopRequireDefault(require("./arbitrum"));

var _NETWORKS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChainId;
exports.ChainId = ChainId;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["BSC"] = 56] = "BSC";
  ChainId[ChainId["XDAI"] = 100] = "XDAI";
  ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
  ChainId[ChainId["OPTIMISM"] = 10] = "OPTIMISM";
  ChainId[ChainId["ARBITRUM"] = 42161] = "ARBITRUM";
  ChainId[ChainId["AVAX"] = 43114] = "AVAX";
})(ChainId || (exports.ChainId = ChainId = {}));

var NETWORKS = (_NETWORKS = {}, _defineProperty(_NETWORKS, ChainId.MAINNET, {
  oracles: _mainnet["default"],
  rpcUrl: 'https://api.mycryptoapi.com/eth',
  defaultGasPrice: 22,
  maxGasPrice: 1500,
  blocksCount: 10,
  percentile: 5
}), _defineProperty(_NETWORKS, ChainId.BSC, {
  oracles: _bsc["default"],
  rpcUrl: 'https://bsc-dataseed1.ninicoin.io',
  defaultGasPrice: 5,
  maxGasPrice: 200,
  blocksCount: 10,
  percentile: 5
}), _defineProperty(_NETWORKS, ChainId.XDAI, {
  oracles: _xdai["default"],
  rpcUrl: 'https://rpc.gnosischain.com',
  defaultGasPrice: 5,
  maxGasPrice: 200,
  blocksCount: 200,
  percentile: 5
}), _defineProperty(_NETWORKS, ChainId.POLYGON, {
  oracles: _polygon["default"],
  rpcUrl: 'https://polygon-rpc.com',
  defaultGasPrice: 75,
  maxGasPrice: 1000,
  blocksCount: 10,
  percentile: 5
}), _defineProperty(_NETWORKS, ChainId.OPTIMISM, {
  oracles: _optimism["default"],
  rpcUrl: 'https://mainnet.optimism.io',
  defaultGasPrice: 0.001,
  maxGasPrice: 5,
  blocksCount: 10,
  percentile: 5
}), _defineProperty(_NETWORKS, ChainId.ARBITRUM, {
  oracles: _arbitrum["default"],
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
  defaultGasPrice: 3,
  maxGasPrice: 15,
  blocksCount: 10,
  percentile: 5
}), _defineProperty(_NETWORKS, ChainId.AVAX, {
  oracles: _avax["default"],
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  defaultGasPrice: 50,
  maxGasPrice: 1000,
  blocksCount: 10,
  percentile: 5
}), _NETWORKS);
exports.NETWORKS = NETWORKS;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDaGFpbklkIiwiTkVUV09SS1MiLCJNQUlOTkVUIiwib3JhY2xlcyIsIm1haW5uZXRPcmFjbGVzIiwicnBjVXJsIiwiZGVmYXVsdEdhc1ByaWNlIiwibWF4R2FzUHJpY2UiLCJibG9ja3NDb3VudCIsInBlcmNlbnRpbGUiLCJCU0MiLCJic2NPcmFjbGVzIiwiWERBSSIsInhkYWlPcmFjbGVzIiwiUE9MWUdPTiIsInBvbHlnb25PcmFjbGVzIiwiT1BUSU1JU00iLCJvcHRpbWlzbU9yYWNsZXMiLCJBUkJJVFJVTSIsImFyYml0cnVtT3JhY2xlcyIsIkFWQVgiLCJhdmFsYW5jaGVPcmFjbGVzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnNjT3JhY2xlcyBmcm9tICcuL2JzYydcbmltcG9ydCB4ZGFpT3JhY2xlcyBmcm9tICcuL3hkYWknXG5pbXBvcnQgYXZhbGFuY2hlT3JhY2xlcyBmcm9tICcuL2F2YXgnXG5pbXBvcnQgbWFpbm5ldE9yYWNsZXMgZnJvbSAnLi9tYWlubmV0J1xuaW1wb3J0IHBvbHlnb25PcmFjbGVzIGZyb20gJy4vcG9seWdvbidcbmltcG9ydCBvcHRpbWlzbU9yYWNsZXMgZnJvbSAnLi9vcHRpbWlzbSdcbmltcG9ydCBhcmJpdHJ1bU9yYWNsZXMgZnJvbSAnLi9hcmJpdHJ1bSdcblxuaW1wb3J0IHsgTmV0d29ya3NDb25maWcgfSBmcm9tICdAL3R5cGVzJ1xuXG5leHBvcnQgZW51bSBDaGFpbklkIHtcbiAgTUFJTk5FVCA9IDEsXG4gIEJTQyA9IDU2LFxuICBYREFJID0gMTAwLFxuICBQT0xZR09OID0gMTM3LFxuICBPUFRJTUlTTSA9IDEwLFxuICBBUkJJVFJVTSA9IDQyMTYxLFxuICBBVkFYID0gNDMxMTQsXG59XG5cbmV4cG9ydCBjb25zdCBORVRXT1JLUzogUmVjb3JkPG51bWJlciwgTmV0d29ya3NDb25maWc+ID0ge1xuICBbQ2hhaW5JZC5NQUlOTkVUXToge1xuICAgIG9yYWNsZXM6IG1haW5uZXRPcmFjbGVzLFxuICAgIHJwY1VybDogJ2h0dHBzOi8vYXBpLm15Y3J5cHRvYXBpLmNvbS9ldGgnLFxuICAgIGRlZmF1bHRHYXNQcmljZTogMjIsXG4gICAgbWF4R2FzUHJpY2U6IDE1MDAsXG4gICAgYmxvY2tzQ291bnQ6IDEwLFxuICAgIHBlcmNlbnRpbGU6IDUsXG4gIH0sXG4gIFtDaGFpbklkLkJTQ106IHtcbiAgICBvcmFjbGVzOiBic2NPcmFjbGVzLFxuICAgIHJwY1VybDogJ2h0dHBzOi8vYnNjLWRhdGFzZWVkMS5uaW5pY29pbi5pbycsXG4gICAgZGVmYXVsdEdhc1ByaWNlOiA1LFxuICAgIG1heEdhc1ByaWNlOiAyMDAsXG4gICAgYmxvY2tzQ291bnQ6IDEwLFxuICAgIHBlcmNlbnRpbGU6IDUsXG4gIH0sXG4gIFtDaGFpbklkLlhEQUldOiB7XG4gICAgb3JhY2xlczogeGRhaU9yYWNsZXMsXG4gICAgcnBjVXJsOiAnaHR0cHM6Ly9ycGMuZ25vc2lzY2hhaW4uY29tJyxcbiAgICBkZWZhdWx0R2FzUHJpY2U6IDUsXG4gICAgbWF4R2FzUHJpY2U6IDIwMCxcbiAgICBibG9ja3NDb3VudDogMjAwLFxuICAgIHBlcmNlbnRpbGU6IDUsXG4gIH0sXG4gIFtDaGFpbklkLlBPTFlHT05dOiB7XG4gICAgb3JhY2xlczogcG9seWdvbk9yYWNsZXMsXG4gICAgcnBjVXJsOiAnaHR0cHM6Ly9wb2x5Z29uLXJwYy5jb20nLFxuICAgIGRlZmF1bHRHYXNQcmljZTogNzUsXG4gICAgbWF4R2FzUHJpY2U6IDEwMDAsXG4gICAgYmxvY2tzQ291bnQ6IDEwLFxuICAgIHBlcmNlbnRpbGU6IDUsXG4gIH0sXG4gIFtDaGFpbklkLk9QVElNSVNNXToge1xuICAgIG9yYWNsZXM6IG9wdGltaXNtT3JhY2xlcyxcbiAgICBycGNVcmw6ICdodHRwczovL21haW5uZXQub3B0aW1pc20uaW8nLFxuICAgIGRlZmF1bHRHYXNQcmljZTogMC4wMDEsXG4gICAgbWF4R2FzUHJpY2U6IDUsXG4gICAgYmxvY2tzQ291bnQ6IDEwLFxuICAgIHBlcmNlbnRpbGU6IDUsXG4gIH0sXG4gIFtDaGFpbklkLkFSQklUUlVNXToge1xuICAgIG9yYWNsZXM6IGFyYml0cnVtT3JhY2xlcyxcbiAgICBycGNVcmw6ICdodHRwczovL2FyYjEuYXJiaXRydW0uaW8vcnBjJyxcbiAgICBkZWZhdWx0R2FzUHJpY2U6IDMsXG4gICAgbWF4R2FzUHJpY2U6IDE1LFxuICAgIGJsb2Nrc0NvdW50OiAxMCxcbiAgICBwZXJjZW50aWxlOiA1LFxuICB9LFxuICBbQ2hhaW5JZC5BVkFYXToge1xuICAgIG9yYWNsZXM6IGF2YWxhbmNoZU9yYWNsZXMsXG4gICAgcnBjVXJsOiAnaHR0cHM6Ly9hcGkuYXZheC5uZXR3b3JrL2V4dC9iYy9DL3JwYycsXG4gICAgZGVmYXVsdEdhc1ByaWNlOiA1MCxcbiAgICBtYXhHYXNQcmljZTogMTAwMCxcbiAgICBibG9ja3NDb3VudDogMTAsXG4gICAgcGVyY2VudGlsZTogNSxcbiAgfSxcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztJQUlZQSxPOzs7V0FBQUEsTztFQUFBQSxPLENBQUFBLE87RUFBQUEsTyxDQUFBQSxPO0VBQUFBLE8sQ0FBQUEsTztFQUFBQSxPLENBQUFBLE87RUFBQUEsTyxDQUFBQSxPO0VBQUFBLE8sQ0FBQUEsTztFQUFBQSxPLENBQUFBLE87R0FBQUEsTyx1QkFBQUEsTzs7QUFVTCxJQUFNQyxRQUF3QywrQ0FDbERELE9BQU8sQ0FBQ0UsT0FEMEMsRUFDaEM7RUFDakJDLE9BQU8sRUFBRUMsbUJBRFE7RUFFakJDLE1BQU0sRUFBRSxpQ0FGUztFQUdqQkMsZUFBZSxFQUFFLEVBSEE7RUFJakJDLFdBQVcsRUFBRSxJQUpJO0VBS2pCQyxXQUFXLEVBQUUsRUFMSTtFQU1qQkMsVUFBVSxFQUFFO0FBTkssQ0FEZ0MsOEJBU2xEVCxPQUFPLENBQUNVLEdBVDBDLEVBU3BDO0VBQ2JQLE9BQU8sRUFBRVEsZUFESTtFQUViTixNQUFNLEVBQUUsbUNBRks7RUFHYkMsZUFBZSxFQUFFLENBSEo7RUFJYkMsV0FBVyxFQUFFLEdBSkE7RUFLYkMsV0FBVyxFQUFFLEVBTEE7RUFNYkMsVUFBVSxFQUFFO0FBTkMsQ0FUb0MsOEJBaUJsRFQsT0FBTyxDQUFDWSxJQWpCMEMsRUFpQm5DO0VBQ2RULE9BQU8sRUFBRVUsZ0JBREs7RUFFZFIsTUFBTSxFQUFFLDZCQUZNO0VBR2RDLGVBQWUsRUFBRSxDQUhIO0VBSWRDLFdBQVcsRUFBRSxHQUpDO0VBS2RDLFdBQVcsRUFBRSxHQUxDO0VBTWRDLFVBQVUsRUFBRTtBQU5FLENBakJtQyw4QkF5QmxEVCxPQUFPLENBQUNjLE9BekIwQyxFQXlCaEM7RUFDakJYLE9BQU8sRUFBRVksbUJBRFE7RUFFakJWLE1BQU0sRUFBRSx5QkFGUztFQUdqQkMsZUFBZSxFQUFFLEVBSEE7RUFJakJDLFdBQVcsRUFBRSxJQUpJO0VBS2pCQyxXQUFXLEVBQUUsRUFMSTtFQU1qQkMsVUFBVSxFQUFFO0FBTkssQ0F6QmdDLDhCQWlDbERULE9BQU8sQ0FBQ2dCLFFBakMwQyxFQWlDL0I7RUFDbEJiLE9BQU8sRUFBRWMsb0JBRFM7RUFFbEJaLE1BQU0sRUFBRSw2QkFGVTtFQUdsQkMsZUFBZSxFQUFFLEtBSEM7RUFJbEJDLFdBQVcsRUFBRSxDQUpLO0VBS2xCQyxXQUFXLEVBQUUsRUFMSztFQU1sQkMsVUFBVSxFQUFFO0FBTk0sQ0FqQytCLDhCQXlDbERULE9BQU8sQ0FBQ2tCLFFBekMwQyxFQXlDL0I7RUFDbEJmLE9BQU8sRUFBRWdCLG9CQURTO0VBRWxCZCxNQUFNLEVBQUUsOEJBRlU7RUFHbEJDLGVBQWUsRUFBRSxDQUhDO0VBSWxCQyxXQUFXLEVBQUUsRUFKSztFQUtsQkMsV0FBVyxFQUFFLEVBTEs7RUFNbEJDLFVBQVUsRUFBRTtBQU5NLENBekMrQiw4QkFpRGxEVCxPQUFPLENBQUNvQixJQWpEMEMsRUFpRG5DO0VBQ2RqQixPQUFPLEVBQUVrQixnQkFESztFQUVkaEIsTUFBTSxFQUFFLHVDQUZNO0VBR2RDLGVBQWUsRUFBRSxFQUhIO0VBSWRDLFdBQVcsRUFBRSxJQUpDO0VBS2RDLFdBQVcsRUFBRSxFQUxDO0VBTWRDLFVBQVUsRUFBRTtBQU5FLENBakRtQyxhQUE5QyJ9