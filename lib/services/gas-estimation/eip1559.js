"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Eip1559GasPriceOracle = void 0;

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _config = require("../../config");

var _constants = require("../../constants");

var _utils = require("../../utils");

var _constants2 = require("./constants");

var _excluded = ["fetcher"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// !!! MAKE SENSE ALL CALCULATIONS IN GWEI !!!
var Eip1559GasPriceOracle = /*#__PURE__*/function () {
  function Eip1559GasPriceOracle(_ref) {
    var _NETWORKS$chainId, _NETWORKS$chainId2;

    var fetcher = _ref.fetcher,
        options = _objectWithoutProperties(_ref, _excluded);

    _classCallCheck(this, Eip1559GasPriceOracle);

    _defineProperty(this, "configuration", {
      chainId: _config.ChainId.MAINNET,
      blocksCount: _config.NETWORKS[_config.ChainId.MAINNET].blocksCount,
      percentile: _config.NETWORKS[_config.ChainId.MAINNET].percentile,
      fallbackGasPrices: undefined
    });

    _defineProperty(this, "fetcher", void 0);

    this.fetcher = fetcher;
    var chainId = (options === null || options === void 0 ? void 0 : options.chainId) || this.configuration.chainId;
    this.configuration.blocksCount = ((_NETWORKS$chainId = _config.NETWORKS[chainId]) === null || _NETWORKS$chainId === void 0 ? void 0 : _NETWORKS$chainId.blocksCount) || _constants2.FEE_HISTORY_BLOCKS;
    this.configuration.percentile = ((_NETWORKS$chainId2 = _config.NETWORKS[chainId]) === null || _NETWORKS$chainId2 === void 0 ? void 0 : _NETWORKS$chainId2.percentile) || _constants2.FEE_HISTORY_PERCENTILE;

    if (options) {
      this.configuration = _objectSpread(_objectSpread({}, this.configuration), options);
    }
  }

  _createClass(Eip1559GasPriceOracle, [{
    key: "estimateFees",
    value: function () {
      var _estimateFees = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(fallbackGasPrices) {
        var _yield$this$fetcher$m, latestBlock, baseFee, blockCount, rewardPercentiles, _yield$this$fetcher$m2, data;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.fetcher.makeRpcCall({
                  method: 'eth_getBlockByNumber',
                  params: ['latest', false]
                });

              case 3:
                _yield$this$fetcher$m = _context.sent;
                latestBlock = _yield$this$fetcher$m.data;

                if (latestBlock.result.baseFeePerGas) {
                  _context.next = 7;
                  break;
                }

                throw new Error('An error occurred while fetching current base fee, falling back');

              case 7:
                baseFee = (0, _utils.fromWeiToGwei)(latestBlock.result.baseFeePerGas);
                blockCount = (0, _utils.fromNumberToHex)(this.configuration.blocksCount);
                rewardPercentiles = [this.configuration.percentile];
                _context.next = 12;
                return this.fetcher.makeRpcCall({
                  method: 'eth_feeHistory',
                  params: [blockCount, 'latest', rewardPercentiles]
                });

              case 12:
                _yield$this$fetcher$m2 = _context.sent;
                data = _yield$this$fetcher$m2.data;
                return _context.abrupt("return", this.calculateFees({
                  baseFee: baseFee,
                  feeHistory: data.result
                }));

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);

                if (!fallbackGasPrices) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt("return", fallbackGasPrices);

              case 21:
                if (!this.configuration.fallbackGasPrices) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt("return", this.configuration.fallbackGasPrices);

              case 23:
                throw _context.t0;

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 17]]);
      }));

      function estimateFees(_x) {
        return _estimateFees.apply(this, arguments);
      }

      return estimateFees;
    }()
  }, {
    key: "calculatePriorityFeeEstimate",
    value: function calculatePriorityFeeEstimate(feeHistory) {
      var _feeHistory$reward;

      if (!feeHistory) {
        return null;
      }

      var rewards = (_feeHistory$reward = feeHistory.reward) === null || _feeHistory$reward === void 0 ? void 0 : _feeHistory$reward.map(function (r) {
        return (0, _utils.fromWeiToGwei)(r[0]);
      }).filter(function (r) {
        return r.isGreaterThan(0);
      }).sort();

      if (!rewards) {
        return null;
      } // Calculate percentage increases from between ordered list of fees


      var percentageIncreases = rewards.reduce(function (acc, curr, i, arr) {
        if (i !== arr.length - 1) {
          var next = arr[i + 1];
          var percentageIncrease = next.minus(curr).dividedBy(curr).multipliedBy(_constants.PERCENT_MULTIPLIER);
          acc.push(percentageIncrease);
        }

        return acc;
      }, []);

      var _findMax = (0, _utils.findMax)(percentageIncreases),
          highest = _findMax.highest,
          index = _findMax.index; // If we have big increased in value, we could be considering "outliers" in our estimate
      // Skip the low elements and take a new median


      var values = highest.isGreaterThanOrEqualTo(_constants2.PRIORITY_FEE_INCREASE_BOUNDARY) && index >= (0, _utils.getMedian)(rewards) ? rewards.slice(index) : rewards;
      return values[(0, _utils.getMedian)(values)];
    }
  }, {
    key: "getPriorityFromChain",
    value: function () {
      var _getPriorityFromChain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(feeHistory) {
        var _yield$this$fetcher$m3, data;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.fetcher.makeRpcCall({
                  method: 'eth_maxPriorityFeePerGas',
                  params: []
                });

              case 3:
                _yield$this$fetcher$m3 = _context2.sent;
                data = _yield$this$fetcher$m3.data;
                return _context2.abrupt("return", (0, _utils.fromWeiToGwei)(data.result));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", this.calculatePriorityFeeEstimate(feeHistory));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function getPriorityFromChain(_x2) {
        return _getPriorityFromChain.apply(this, arguments);
      }

      return getPriorityFromChain;
    }()
  }, {
    key: "calculateFees",
    value: function () {
      var _calculateFees = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref2) {
        var baseFee, feeHistory, estimatedPriorityFee, _findMax2, maxPriorityFeePerGas, maxFeePerGas;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                baseFee = _ref2.baseFee, feeHistory = _ref2.feeHistory;
                _context3.next = 3;
                return this.getPriorityFromChain(feeHistory);

              case 3:
                estimatedPriorityFee = _context3.sent;
                _findMax2 = (0, _utils.findMax)([estimatedPriorityFee !== null && estimatedPriorityFee !== void 0 ? estimatedPriorityFee : _constants.BG_ZERO, new _bignumber["default"](_constants2.DEFAULT_PRIORITY_FEE)]), maxPriorityFeePerGas = _findMax2.highest;
                maxFeePerGas = baseFee.plus(maxPriorityFeePerGas);

                if (!(this.checkIsGreaterThanMax(maxFeePerGas) || this.checkIsGreaterThanMax(maxPriorityFeePerGas))) {
                  _context3.next = 8;
                  break;
                }

                throw new Error('Estimated gas fee was much higher than expected, erroring');

              case 8:
                return _context3.abrupt("return", {
                  baseFee: baseFee.toNumber(),
                  maxFeePerGas: maxFeePerGas.toNumber(),
                  maxPriorityFeePerGas: maxPriorityFeePerGas.toNumber()
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function calculateFees(_x3) {
        return _calculateFees.apply(this, arguments);
      }

      return calculateFees;
    }()
  }, {
    key: "checkIsGreaterThanMax",
    value: function checkIsGreaterThanMax(value) {
      var _NETWORKS$this$config;

      return value.isGreaterThanOrEqualTo((_NETWORKS$this$config = _config.NETWORKS[this.configuration.chainId]) === null || _NETWORKS$this$config === void 0 ? void 0 : _NETWORKS$this$config.maxGasPrice) || false;
    }
  }]);

  return Eip1559GasPriceOracle;
}();

exports.Eip1559GasPriceOracle = Eip1559GasPriceOracle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFaXAxNTU5R2FzUHJpY2VPcmFjbGUiLCJmZXRjaGVyIiwib3B0aW9ucyIsImNoYWluSWQiLCJDaGFpbklkIiwiTUFJTk5FVCIsImJsb2Nrc0NvdW50IiwiTkVUV09SS1MiLCJwZXJjZW50aWxlIiwiZmFsbGJhY2tHYXNQcmljZXMiLCJ1bmRlZmluZWQiLCJjb25maWd1cmF0aW9uIiwiRkVFX0hJU1RPUllfQkxPQ0tTIiwiRkVFX0hJU1RPUllfUEVSQ0VOVElMRSIsIm1ha2VScGNDYWxsIiwibWV0aG9kIiwicGFyYW1zIiwibGF0ZXN0QmxvY2siLCJkYXRhIiwicmVzdWx0IiwiYmFzZUZlZVBlckdhcyIsIkVycm9yIiwiYmFzZUZlZSIsImZyb21XZWlUb0d3ZWkiLCJibG9ja0NvdW50IiwiZnJvbU51bWJlclRvSGV4IiwicmV3YXJkUGVyY2VudGlsZXMiLCJjYWxjdWxhdGVGZWVzIiwiZmVlSGlzdG9yeSIsInJld2FyZHMiLCJyZXdhcmQiLCJtYXAiLCJyIiwiZmlsdGVyIiwiaXNHcmVhdGVyVGhhbiIsInNvcnQiLCJwZXJjZW50YWdlSW5jcmVhc2VzIiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImkiLCJhcnIiLCJsZW5ndGgiLCJuZXh0IiwicGVyY2VudGFnZUluY3JlYXNlIiwibWludXMiLCJkaXZpZGVkQnkiLCJtdWx0aXBsaWVkQnkiLCJQRVJDRU5UX01VTFRJUExJRVIiLCJwdXNoIiwiZmluZE1heCIsImhpZ2hlc3QiLCJpbmRleCIsInZhbHVlcyIsImlzR3JlYXRlclRoYW5PckVxdWFsVG8iLCJQUklPUklUWV9GRUVfSU5DUkVBU0VfQk9VTkRBUlkiLCJnZXRNZWRpYW4iLCJzbGljZSIsImNhbGN1bGF0ZVByaW9yaXR5RmVlRXN0aW1hdGUiLCJnZXRQcmlvcml0eUZyb21DaGFpbiIsImVzdGltYXRlZFByaW9yaXR5RmVlIiwiQkdfWkVSTyIsIkJpZ051bWJlciIsIkRFRkFVTFRfUFJJT1JJVFlfRkVFIiwibWF4UHJpb3JpdHlGZWVQZXJHYXMiLCJtYXhGZWVQZXJHYXMiLCJwbHVzIiwiY2hlY2tJc0dyZWF0ZXJUaGFuTWF4IiwidG9OdW1iZXIiLCJ2YWx1ZSIsIm1heEdhc1ByaWNlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2dhcy1lc3RpbWF0aW9uL2VpcDE1NTkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpZ051bWJlciBmcm9tICdiaWdudW1iZXIuanMnXG5cbmltcG9ydCB7IEZlZUhpc3RvcnksIEJsb2NrIH0gZnJvbSAnQC90eXBlcydcbmltcG9ydCB7IENvbmZpZywgRXN0aW1hdGVPcmFjbGUsIEVzdGltYXRlZEdhc1ByaWNlLCBDYWxjdWxhdGVGZWVzUGFyYW1zLCBHYXNFc3RpbWF0aW9uT3B0aW9uc1BheWxvYWQgfSBmcm9tICcuL3R5cGVzJ1xuXG5pbXBvcnQgeyBScGNGZXRjaGVyIH0gZnJvbSAnQC9zZXJ2aWNlcydcbmltcG9ydCB7IENoYWluSWQsIE5FVFdPUktTIH0gZnJvbSAnQC9jb25maWcnXG5pbXBvcnQgeyBCR19aRVJPLCBQRVJDRU5UX01VTFRJUExJRVIgfSBmcm9tICdAL2NvbnN0YW50cydcbmltcG9ydCB7IGZpbmRNYXgsIGZyb21OdW1iZXJUb0hleCwgZnJvbVdlaVRvR3dlaSwgZ2V0TWVkaWFuIH0gZnJvbSAnQC91dGlscydcblxuaW1wb3J0IHsgREVGQVVMVF9QUklPUklUWV9GRUUsIFBSSU9SSVRZX0ZFRV9JTkNSRUFTRV9CT1VOREFSWSwgRkVFX0hJU1RPUllfQkxPQ0tTLCBGRUVfSElTVE9SWV9QRVJDRU5USUxFIH0gZnJvbSAnLi9jb25zdGFudHMnXG5cbi8vICEhISBNQUtFIFNFTlNFIEFMTCBDQUxDVUxBVElPTlMgSU4gR1dFSSAhISFcbmV4cG9ydCBjbGFzcyBFaXAxNTU5R2FzUHJpY2VPcmFjbGUgaW1wbGVtZW50cyBFc3RpbWF0ZU9yYWNsZSB7XG4gIHB1YmxpYyBjb25maWd1cmF0aW9uOiBDb25maWcgPSB7XG4gICAgY2hhaW5JZDogQ2hhaW5JZC5NQUlOTkVULFxuICAgIGJsb2Nrc0NvdW50OiBORVRXT1JLU1tDaGFpbklkLk1BSU5ORVRdLmJsb2Nrc0NvdW50LFxuICAgIHBlcmNlbnRpbGU6IE5FVFdPUktTW0NoYWluSWQuTUFJTk5FVF0ucGVyY2VudGlsZSxcbiAgICBmYWxsYmFja0dhc1ByaWNlczogdW5kZWZpbmVkLFxuICB9XG4gIHByaXZhdGUgZmV0Y2hlcjogUnBjRmV0Y2hlclxuXG4gIGNvbnN0cnVjdG9yKHsgZmV0Y2hlciwgLi4ub3B0aW9ucyB9OiBHYXNFc3RpbWF0aW9uT3B0aW9uc1BheWxvYWQpIHtcbiAgICB0aGlzLmZldGNoZXIgPSBmZXRjaGVyXG4gICAgY29uc3QgY2hhaW5JZCA9IG9wdGlvbnM/LmNoYWluSWQgfHwgdGhpcy5jb25maWd1cmF0aW9uLmNoYWluSWRcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmxvY2tzQ291bnQgPSBORVRXT1JLU1tjaGFpbklkXT8uYmxvY2tzQ291bnQgfHwgRkVFX0hJU1RPUllfQkxPQ0tTXG4gICAgdGhpcy5jb25maWd1cmF0aW9uLnBlcmNlbnRpbGUgPSBORVRXT1JLU1tjaGFpbklkXT8ucGVyY2VudGlsZSB8fCBGRUVfSElTVE9SWV9QRVJDRU5USUxFXG5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0geyAuLi50aGlzLmNvbmZpZ3VyYXRpb24sIC4uLm9wdGlvbnMgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBlc3RpbWF0ZUZlZXMoZmFsbGJhY2tHYXNQcmljZXM/OiBFc3RpbWF0ZWRHYXNQcmljZSk6IFByb21pc2U8RXN0aW1hdGVkR2FzUHJpY2U+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBkYXRhOiBsYXRlc3RCbG9jayB9ID0gYXdhaXQgdGhpcy5mZXRjaGVyLm1ha2VScGNDYWxsPHsgcmVzdWx0OiBCbG9jayB9Pih7XG4gICAgICAgIG1ldGhvZDogJ2V0aF9nZXRCbG9ja0J5TnVtYmVyJyxcbiAgICAgICAgcGFyYW1zOiBbJ2xhdGVzdCcsIGZhbHNlXSxcbiAgICAgIH0pXG5cbiAgICAgIGlmICghbGF0ZXN0QmxvY2sucmVzdWx0LmJhc2VGZWVQZXJHYXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyBjdXJyZW50IGJhc2UgZmVlLCBmYWxsaW5nIGJhY2snKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBiYXNlRmVlID0gZnJvbVdlaVRvR3dlaShsYXRlc3RCbG9jay5yZXN1bHQuYmFzZUZlZVBlckdhcylcblxuICAgICAgY29uc3QgYmxvY2tDb3VudCA9IGZyb21OdW1iZXJUb0hleCh0aGlzLmNvbmZpZ3VyYXRpb24uYmxvY2tzQ291bnQpXG4gICAgICBjb25zdCByZXdhcmRQZXJjZW50aWxlczogbnVtYmVyW10gPSBbdGhpcy5jb25maWd1cmF0aW9uLnBlcmNlbnRpbGVdXG5cbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgdGhpcy5mZXRjaGVyLm1ha2VScGNDYWxsPHsgcmVzdWx0OiBGZWVIaXN0b3J5IH0+KHtcbiAgICAgICAgbWV0aG9kOiAnZXRoX2ZlZUhpc3RvcnknLFxuICAgICAgICBwYXJhbXM6IFtibG9ja0NvdW50LCAnbGF0ZXN0JywgcmV3YXJkUGVyY2VudGlsZXNdLFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlRmVlcyh7IGJhc2VGZWUsIGZlZUhpc3Rvcnk6IGRhdGEucmVzdWx0IH0pXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZmFsbGJhY2tHYXNQcmljZXMpIHtcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrR2FzUHJpY2VzXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmZhbGxiYWNrR2FzUHJpY2VzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb24uZmFsbGJhY2tHYXNQcmljZXNcbiAgICAgIH1cbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlUHJpb3JpdHlGZWVFc3RpbWF0ZShmZWVIaXN0b3J5PzogRmVlSGlzdG9yeSkge1xuICAgIGlmICghZmVlSGlzdG9yeSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCByZXdhcmRzID0gZmVlSGlzdG9yeS5yZXdhcmRcbiAgICAgID8ubWFwKChyKSA9PiBmcm9tV2VpVG9Hd2VpKHJbMF0pKVxuICAgICAgLmZpbHRlcigocikgPT4gci5pc0dyZWF0ZXJUaGFuKDApKVxuICAgICAgLnNvcnQoKVxuXG4gICAgaWYgKCFyZXdhcmRzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBwZXJjZW50YWdlIGluY3JlYXNlcyBmcm9tIGJldHdlZW4gb3JkZXJlZCBsaXN0IG9mIGZlZXNcbiAgICBjb25zdCBwZXJjZW50YWdlSW5jcmVhc2VzID0gcmV3YXJkcy5yZWR1Y2U8QmlnTnVtYmVyW10+KChhY2MsIGN1cnIsIGksIGFycikgPT4ge1xuICAgICAgaWYgKGkgIT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSBhcnJbaSArIDFdXG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2VJbmNyZWFzZSA9IG5leHQubWludXMoY3VycikuZGl2aWRlZEJ5KGN1cnIpLm11bHRpcGxpZWRCeShQRVJDRU5UX01VTFRJUExJRVIpXG4gICAgICAgIGFjYy5wdXNoKHBlcmNlbnRhZ2VJbmNyZWFzZSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKVxuXG4gICAgY29uc3QgeyBoaWdoZXN0LCBpbmRleCB9ID0gZmluZE1heChwZXJjZW50YWdlSW5jcmVhc2VzKVxuICAgIC8vIElmIHdlIGhhdmUgYmlnIGluY3JlYXNlZCBpbiB2YWx1ZSwgd2UgY291bGQgYmUgY29uc2lkZXJpbmcgXCJvdXRsaWVyc1wiIGluIG91ciBlc3RpbWF0ZVxuICAgIC8vIFNraXAgdGhlIGxvdyBlbGVtZW50cyBhbmQgdGFrZSBhIG5ldyBtZWRpYW5cbiAgICBjb25zdCB2YWx1ZXMgPVxuICAgICAgaGlnaGVzdC5pc0dyZWF0ZXJUaGFuT3JFcXVhbFRvKFBSSU9SSVRZX0ZFRV9JTkNSRUFTRV9CT1VOREFSWSkgJiYgaW5kZXggPj0gZ2V0TWVkaWFuKHJld2FyZHMpXG4gICAgICAgID8gcmV3YXJkcy5zbGljZShpbmRleClcbiAgICAgICAgOiByZXdhcmRzXG5cbiAgICByZXR1cm4gdmFsdWVzW2dldE1lZGlhbih2YWx1ZXMpXVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRQcmlvcml0eUZyb21DaGFpbihmZWVIaXN0b3J5PzogRmVlSGlzdG9yeSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuZmV0Y2hlci5tYWtlUnBjQ2FsbDx7IHJlc3VsdDogc3RyaW5nIH0+KHtcbiAgICAgICAgbWV0aG9kOiAnZXRoX21heFByaW9yaXR5RmVlUGVyR2FzJyxcbiAgICAgICAgcGFyYW1zOiBbXSxcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBmcm9tV2VpVG9Hd2VpKGRhdGEucmVzdWx0KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlUHJpb3JpdHlGZWVFc3RpbWF0ZShmZWVIaXN0b3J5KVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2FsY3VsYXRlRmVlcyh7IGJhc2VGZWUsIGZlZUhpc3RvcnkgfTogQ2FsY3VsYXRlRmVlc1BhcmFtcyk6IFByb21pc2U8RXN0aW1hdGVkR2FzUHJpY2U+IHtcbiAgICBjb25zdCBlc3RpbWF0ZWRQcmlvcml0eUZlZSA9IGF3YWl0IHRoaXMuZ2V0UHJpb3JpdHlGcm9tQ2hhaW4oZmVlSGlzdG9yeSlcblxuICAgIGNvbnN0IHsgaGlnaGVzdDogbWF4UHJpb3JpdHlGZWVQZXJHYXMgfSA9IGZpbmRNYXgoW2VzdGltYXRlZFByaW9yaXR5RmVlID8/IEJHX1pFUk8sIG5ldyBCaWdOdW1iZXIoREVGQVVMVF9QUklPUklUWV9GRUUpXSlcblxuICAgIGNvbnN0IG1heEZlZVBlckdhcyA9IGJhc2VGZWUucGx1cyhtYXhQcmlvcml0eUZlZVBlckdhcylcblxuICAgIGlmICh0aGlzLmNoZWNrSXNHcmVhdGVyVGhhbk1heChtYXhGZWVQZXJHYXMpIHx8IHRoaXMuY2hlY2tJc0dyZWF0ZXJUaGFuTWF4KG1heFByaW9yaXR5RmVlUGVyR2FzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFc3RpbWF0ZWQgZ2FzIGZlZSB3YXMgbXVjaCBoaWdoZXIgdGhhbiBleHBlY3RlZCwgZXJyb3JpbmcnKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBiYXNlRmVlOiBiYXNlRmVlLnRvTnVtYmVyKCksXG4gICAgICBtYXhGZWVQZXJHYXM6IG1heEZlZVBlckdhcy50b051bWJlcigpLFxuICAgICAgbWF4UHJpb3JpdHlGZWVQZXJHYXM6IG1heFByaW9yaXR5RmVlUGVyR2FzLnRvTnVtYmVyKCksXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0lzR3JlYXRlclRoYW5NYXgodmFsdWU6IEJpZ051bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZS5pc0dyZWF0ZXJUaGFuT3JFcXVhbFRvKE5FVFdPUktTW3RoaXMuY29uZmlndXJhdGlvbi5jaGFpbklkXT8ubWF4R2FzUHJpY2UpIHx8IGZhbHNlXG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OzsrQ0FUQSxvSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBO0lBQ2FBLHFCO0VBU1gscUNBQWtFO0lBQUE7O0lBQUEsSUFBcERDLE9BQW9ELFFBQXBEQSxPQUFvRDtJQUFBLElBQXhDQyxPQUF3Qzs7SUFBQTs7SUFBQSx1Q0FSbkM7TUFDN0JDLE9BQU8sRUFBRUMsZUFBQSxDQUFRQyxPQURZO01BRTdCQyxXQUFXLEVBQUVDLGdCQUFBLENBQVNILGVBQUEsQ0FBUUMsT0FBakIsRUFBMEJDLFdBRlY7TUFHN0JFLFVBQVUsRUFBRUQsZ0JBQUEsQ0FBU0gsZUFBQSxDQUFRQyxPQUFqQixFQUEwQkcsVUFIVDtNQUk3QkMsaUJBQWlCLEVBQUVDO0lBSlUsQ0FRbUM7O0lBQUE7O0lBQ2hFLEtBQUtULE9BQUwsR0FBZUEsT0FBZjtJQUNBLElBQU1FLE9BQU8sR0FBRyxDQUFBRCxPQUFPLFNBQVAsSUFBQUEsT0FBTyxXQUFQLFlBQUFBLE9BQU8sQ0FBRUMsT0FBVCxLQUFvQixLQUFLUSxhQUFMLENBQW1CUixPQUF2RDtJQUNBLEtBQUtRLGFBQUwsQ0FBbUJMLFdBQW5CLEdBQWlDLHNCQUFBQyxnQkFBQSxDQUFTSixPQUFULHlFQUFtQkcsV0FBbkIsS0FBa0NNLDhCQUFuRTtJQUNBLEtBQUtELGFBQUwsQ0FBbUJILFVBQW5CLEdBQWdDLHVCQUFBRCxnQkFBQSxDQUFTSixPQUFULDJFQUFtQkssVUFBbkIsS0FBaUNLLGtDQUFqRTs7SUFFQSxJQUFJWCxPQUFKLEVBQWE7TUFDWCxLQUFLUyxhQUFMLG1DQUEwQixLQUFLQSxhQUEvQixHQUFpRFQsT0FBakQ7SUFDRDtFQUNGOzs7OztxRkFFRCxpQkFBMEJPLGlCQUExQjtRQUFBOztRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUFBO2dCQUFBO2dCQUFBLE9BRXdDLEtBQUtSLE9BQUwsQ0FBYWEsV0FBYixDQUE0QztrQkFDOUVDLE1BQU0sRUFBRSxzQkFEc0U7a0JBRTlFQyxNQUFNLEVBQUUsQ0FBQyxRQUFELEVBQVcsS0FBWDtnQkFGc0UsQ0FBNUMsQ0FGeEM7O2NBQUE7Z0JBQUE7Z0JBRWtCQyxXQUZsQix5QkFFWUMsSUFGWjs7Z0JBQUEsSUFPU0QsV0FBVyxDQUFDRSxNQUFaLENBQW1CQyxhQVA1QjtrQkFBQTtrQkFBQTtnQkFBQTs7Z0JBQUEsTUFRWSxJQUFJQyxLQUFKLENBQVUsaUVBQVYsQ0FSWjs7Y0FBQTtnQkFXVUMsT0FYVixHQVdvQixJQUFBQyxvQkFBQSxFQUFjTixXQUFXLENBQUNFLE1BQVosQ0FBbUJDLGFBQWpDLENBWHBCO2dCQWFVSSxVQWJWLEdBYXVCLElBQUFDLHNCQUFBLEVBQWdCLEtBQUtkLGFBQUwsQ0FBbUJMLFdBQW5DLENBYnZCO2dCQWNVb0IsaUJBZFYsR0Fjd0MsQ0FBQyxLQUFLZixhQUFMLENBQW1CSCxVQUFwQixDQWR4QztnQkFBQTtnQkFBQSxPQWdCMkIsS0FBS1AsT0FBTCxDQUFhYSxXQUFiLENBQWlEO2tCQUN0RUMsTUFBTSxFQUFFLGdCQUQ4RDtrQkFFdEVDLE1BQU0sRUFBRSxDQUFDUSxVQUFELEVBQWEsUUFBYixFQUF1QkUsaUJBQXZCO2dCQUY4RCxDQUFqRCxDQWhCM0I7O2NBQUE7Z0JBQUE7Z0JBZ0JZUixJQWhCWiwwQkFnQllBLElBaEJaO2dCQUFBLGlDQXFCVyxLQUFLUyxhQUFMLENBQW1CO2tCQUFFTCxPQUFPLEVBQVBBLE9BQUY7a0JBQVdNLFVBQVUsRUFBRVYsSUFBSSxDQUFDQztnQkFBNUIsQ0FBbkIsQ0FyQlg7O2NBQUE7Z0JBQUE7Z0JBQUE7O2dCQUFBLEtBdUJRVixpQkF2QlI7a0JBQUE7a0JBQUE7Z0JBQUE7O2dCQUFBLGlDQXdCYUEsaUJBeEJiOztjQUFBO2dCQUFBLEtBMEJRLEtBQUtFLGFBQUwsQ0FBbUJGLGlCQTFCM0I7a0JBQUE7a0JBQUE7Z0JBQUE7O2dCQUFBLGlDQTJCYSxLQUFLRSxhQUFMLENBQW1CRixpQkEzQmhDOztjQUFBO2dCQUFBOztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDOzs7Ozs7Ozs7O1dBaUNBLHNDQUFxQ21CLFVBQXJDLEVBQThEO01BQUE7O01BQzVELElBQUksQ0FBQ0EsVUFBTCxFQUFpQjtRQUNmLE9BQU8sSUFBUDtNQUNEOztNQUVELElBQU1DLE9BQU8seUJBQUdELFVBQVUsQ0FBQ0UsTUFBZCx1REFBRyxtQkFDWkMsR0FEWSxDQUNSLFVBQUNDLENBQUQ7UUFBQSxPQUFPLElBQUFULG9CQUFBLEVBQWNTLENBQUMsQ0FBQyxDQUFELENBQWYsQ0FBUDtNQUFBLENBRFEsRUFFYkMsTUFGYSxDQUVOLFVBQUNELENBQUQ7UUFBQSxPQUFPQSxDQUFDLENBQUNFLGFBQUYsQ0FBZ0IsQ0FBaEIsQ0FBUDtNQUFBLENBRk0sRUFHYkMsSUFIYSxFQUFoQjs7TUFLQSxJQUFJLENBQUNOLE9BQUwsRUFBYztRQUNaLE9BQU8sSUFBUDtNQUNELENBWjJELENBYzVEOzs7TUFDQSxJQUFNTyxtQkFBbUIsR0FBR1AsT0FBTyxDQUFDUSxNQUFSLENBQTRCLFVBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFZQyxDQUFaLEVBQWVDLEdBQWYsRUFBdUI7UUFDN0UsSUFBSUQsQ0FBQyxLQUFLQyxHQUFHLENBQUNDLE1BQUosR0FBYSxDQUF2QixFQUEwQjtVQUN4QixJQUFNQyxJQUFJLEdBQUdGLEdBQUcsQ0FBQ0QsQ0FBQyxHQUFHLENBQUwsQ0FBaEI7VUFDQSxJQUFNSSxrQkFBa0IsR0FBR0QsSUFBSSxDQUFDRSxLQUFMLENBQVdOLElBQVgsRUFBaUJPLFNBQWpCLENBQTJCUCxJQUEzQixFQUFpQ1EsWUFBakMsQ0FBOENDLDZCQUE5QyxDQUEzQjtVQUNBVixHQUFHLENBQUNXLElBQUosQ0FBU0wsa0JBQVQ7UUFDRDs7UUFFRCxPQUFPTixHQUFQO01BQ0QsQ0FSMkIsRUFRekIsRUFSeUIsQ0FBNUI7O01BVUEsZUFBMkIsSUFBQVksY0FBQSxFQUFRZCxtQkFBUixDQUEzQjtNQUFBLElBQVFlLE9BQVIsWUFBUUEsT0FBUjtNQUFBLElBQWlCQyxLQUFqQixZQUFpQkEsS0FBakIsQ0F6QjRELENBMEI1RDtNQUNBOzs7TUFDQSxJQUFNQyxNQUFNLEdBQ1ZGLE9BQU8sQ0FBQ0csc0JBQVIsQ0FBK0JDLDBDQUEvQixLQUFrRUgsS0FBSyxJQUFJLElBQUFJLGdCQUFBLEVBQVUzQixPQUFWLENBQTNFLEdBQ0lBLE9BQU8sQ0FBQzRCLEtBQVIsQ0FBY0wsS0FBZCxDQURKLEdBRUl2QixPQUhOO01BS0EsT0FBT3dCLE1BQU0sQ0FBQyxJQUFBRyxnQkFBQSxFQUFVSCxNQUFWLENBQUQsQ0FBYjtJQUNEOzs7OzZGQUVELGtCQUFtQ3pCLFVBQW5DO1FBQUE7O1FBQUE7VUFBQTtZQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQUEsT0FFMkIsS0FBSzNCLE9BQUwsQ0FBYWEsV0FBYixDQUE2QztrQkFDbEVDLE1BQU0sRUFBRSwwQkFEMEQ7a0JBRWxFQyxNQUFNLEVBQUU7Z0JBRjBELENBQTdDLENBRjNCOztjQUFBO2dCQUFBO2dCQUVZRSxJQUZaLDBCQUVZQSxJQUZaO2dCQUFBLGtDQU9XLElBQUFLLG9CQUFBLEVBQWNMLElBQUksQ0FBQ0MsTUFBbkIsQ0FQWDs7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBQSxrQ0FTVyxLQUFLdUMsNEJBQUwsQ0FBa0M5QixVQUFsQyxDQVRYOztjQUFBO2NBQUE7Z0JBQUE7WUFBQTtVQUFBO1FBQUE7TUFBQSxDOzs7Ozs7Ozs7OztzRkFhQTtRQUFBOztRQUFBO1VBQUE7WUFBQTtjQUFBO2dCQUE4Qk4sT0FBOUIsU0FBOEJBLE9BQTlCLEVBQXVDTSxVQUF2QyxTQUF1Q0EsVUFBdkM7Z0JBQUE7Z0JBQUEsT0FDcUMsS0FBSytCLG9CQUFMLENBQTBCL0IsVUFBMUIsQ0FEckM7O2NBQUE7Z0JBQ1FnQyxvQkFEUjtnQkFBQSxZQUc0QyxJQUFBVixjQUFBLEVBQVEsQ0FBQ1Usb0JBQUQsYUFBQ0Esb0JBQUQsY0FBQ0Esb0JBQUQsR0FBeUJDLGtCQUF6QixFQUFrQyxJQUFJQyxxQkFBSixDQUFjQyxnQ0FBZCxDQUFsQyxDQUFSLENBSDVDLEVBR21CQyxvQkFIbkIsYUFHVWIsT0FIVjtnQkFLUWMsWUFMUixHQUt1QjNDLE9BQU8sQ0FBQzRDLElBQVIsQ0FBYUYsb0JBQWIsQ0FMdkI7O2dCQUFBLE1BT00sS0FBS0cscUJBQUwsQ0FBMkJGLFlBQTNCLEtBQTRDLEtBQUtFLHFCQUFMLENBQTJCSCxvQkFBM0IsQ0FQbEQ7a0JBQUE7a0JBQUE7Z0JBQUE7O2dCQUFBLE1BUVUsSUFBSTNDLEtBQUosQ0FBVSwyREFBVixDQVJWOztjQUFBO2dCQUFBLGtDQVdTO2tCQUNMQyxPQUFPLEVBQUVBLE9BQU8sQ0FBQzhDLFFBQVIsRUFESjtrQkFFTEgsWUFBWSxFQUFFQSxZQUFZLENBQUNHLFFBQWIsRUFGVDtrQkFHTEosb0JBQW9CLEVBQUVBLG9CQUFvQixDQUFDSSxRQUFyQjtnQkFIakIsQ0FYVDs7Y0FBQTtjQUFBO2dCQUFBO1lBQUE7VUFBQTtRQUFBO01BQUEsQzs7Ozs7Ozs7OztXQWtCQSwrQkFBOEJDLEtBQTlCLEVBQXlEO01BQUE7O01BQ3ZELE9BQU9BLEtBQUssQ0FBQ2Ysc0JBQU4sMEJBQTZCL0MsZ0JBQUEsQ0FBUyxLQUFLSSxhQUFMLENBQW1CUixPQUE1QixDQUE3QiwwREFBNkIsc0JBQXNDbUUsV0FBbkUsS0FBbUYsS0FBMUY7SUFDRCJ9