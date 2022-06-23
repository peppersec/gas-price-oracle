"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _chai = _interopRequireDefault(require("chai"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));

var _mockery = _interopRequireDefault(require("mockery"));

var _mocha = require("mocha");

var _config = require("../config");

var _constants = require("../constants");

var _gasPriceOracle = require("../services/gas-price-oracle");

var _constants2 = require("../services/gas-estimation/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(_chaiAsPromised["default"]);

_chai["default"].should();

var oracle = new _gasPriceOracle.GasPriceOracle();
(0, _mocha.before)('before', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var gasPrice;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return oracle.eip1559.estimateFees();

        case 2:
          gasPrice = _context.sent;
          console.log('eip estimation -', {
            gasPrice: gasPrice
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))); //

beforeEach('beforeEach', function () {
  oracle = new _gasPriceOracle.GasPriceOracle();
});
var INJECTED_RPC_URL = 'https://ethereum-rpc.trustwalletapp.com';
(0, _mocha.describe)('eip-1559 gasOracle', function () {
  (0, _mocha.describe)('eip constructor', function () {
    it('should set default values', function () {
      oracle.eip1559.configuration.blocksCount.should.be.equal(_config.NETWORKS[oracle.eip1559.configuration.chainId].blocksCount);
      oracle.eip1559.configuration.percentile.should.be.equal(_config.NETWORKS[oracle.eip1559.configuration.chainId].percentile);
    });
    it('should set passed values', function () {
      var newHistoryBlocks = 15;
      var newHistoryPercentile = 10;
      var newOracle = new _gasPriceOracle.GasPriceOracle({
        blocksCount: newHistoryBlocks,
        percentile: newHistoryPercentile
      });
      newOracle.eip1559.configuration.blocksCount.should.be.equal(newHistoryBlocks);
      newOracle.eip1559.configuration.percentile.should.be.equal(newHistoryPercentile);
    });
  });
  var chains = Object.keys(_config.NETWORKS).map(function (id) {
    return Number(id);
  });
  chains.forEach(function (chainId) {
    var eipOracle = new _gasPriceOracle.GasPriceOracle({
      chainId: chainId
    });
    (0, _mocha.describe)("estimateGas ".concat(chainId), function () {
      it('should return error if not eip-1559 not supported', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(chainId === _config.ChainId.OPTIMISM || chainId === _config.ChainId.ARBITRUM || chainId === _config.ChainId.BSC)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return eipOracle.eip1559.estimateFees().should.be.rejectedWith('An error occurred while fetching current base fee, falling back');

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));

      if (chainId === _config.ChainId.OPTIMISM || chainId === _config.ChainId.ARBITRUM || chainId === _config.ChainId.BSC) {
        return;
      }

      it('should work', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var estimateGas, estimatedMaxFee;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return eipOracle.eip1559.estimateFees();

              case 2:
                estimateGas = _context3.sent;
                console.log("estimateGas ".concat(chainId), estimateGas);

                if (estimateGas.baseFee) {
                  estimateGas.baseFee.should.be.a('number');
                  estimateGas.maxFeePerGas.should.be.a('number');
                  estimateGas.maxPriorityFeePerGas.should.be.a('number');
                  estimateGas.maxFeePerGas.should.be.at.least(estimateGas.baseFee);
                  estimatedMaxFee = new _bignumber["default"](estimateGas.baseFee).plus(estimateGas.maxPriorityFeePerGas).decimalPlaces(_constants.GWEI_PRECISION).toNumber();
                  estimateGas.maxFeePerGas.should.be.at.equal(estimatedMaxFee);
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
      it('should work with crashed rpc (return default data)', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var estimateGas;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                eipOracle = new _gasPriceOracle.GasPriceOracle({
                  defaultRpc: 'wrongRpcUrl',
                  chainId: chainId
                });
                _context4.next = 3;
                return eipOracle.eip1559.estimateFees(_constants2.FALLBACK_ESTIMATE);

              case 3:
                estimateGas = _context4.sent;

                if (estimateGas.baseFee) {
                  estimateGas.baseFee.should.be.a('number');
                  estimateGas.maxFeePerGas.should.be.a('number');
                  estimateGas.maxPriorityFeePerGas.should.be.a('number');
                  estimateGas.baseFee.should.be.at.equal(_constants2.FALLBACK_ESTIMATE.baseFee);
                  estimateGas.maxFeePerGas.should.be.at.equal(_constants2.FALLBACK_ESTIMATE.maxFeePerGas);
                  estimateGas.maxPriorityFeePerGas.should.be.at.equal(_constants2.FALLBACK_ESTIMATE.maxPriorityFeePerGas);
                }

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
      it('should work with custom rpc', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var estimateGas, estimatedMaxFee;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                eipOracle = new _gasPriceOracle.GasPriceOracle({
                  defaultRpc: INJECTED_RPC_URL,
                  chainId: chainId
                });
                _context5.next = 3;
                return eipOracle.eip1559.estimateFees(_constants2.FALLBACK_ESTIMATE);

              case 3:
                estimateGas = _context5.sent;

                if (estimateGas.baseFee) {
                  estimateGas.baseFee.should.be.a('number');
                  estimateGas.maxFeePerGas.should.be.a('number');
                  estimateGas.maxPriorityFeePerGas.should.be.a('number');
                  estimatedMaxFee = new _bignumber["default"](estimateGas.baseFee).plus(estimateGas.maxPriorityFeePerGas).decimalPlaces(_constants.GWEI_PRECISION).toNumber();
                  estimateGas.maxFeePerGas.should.be.at.least(estimateGas.baseFee);
                  estimateGas.maxFeePerGas.should.be.at.equal(estimatedMaxFee);
                }

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
    });
  });
});
after('after', function () {
  after(function () {
    _mockery["default"].disable();

    _mockery["default"].deregisterMock('node-fetch');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjaGFpIiwidXNlIiwiY2hhaUFzUHJvbWlzZWQiLCJzaG91bGQiLCJvcmFjbGUiLCJHYXNQcmljZU9yYWNsZSIsImJlZm9yZSIsImVpcDE1NTkiLCJlc3RpbWF0ZUZlZXMiLCJnYXNQcmljZSIsImNvbnNvbGUiLCJsb2ciLCJiZWZvcmVFYWNoIiwiSU5KRUNURURfUlBDX1VSTCIsImRlc2NyaWJlIiwiaXQiLCJjb25maWd1cmF0aW9uIiwiYmxvY2tzQ291bnQiLCJiZSIsImVxdWFsIiwiTkVUV09SS1MiLCJjaGFpbklkIiwicGVyY2VudGlsZSIsIm5ld0hpc3RvcnlCbG9ja3MiLCJuZXdIaXN0b3J5UGVyY2VudGlsZSIsIm5ld09yYWNsZSIsImNoYWlucyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpZCIsIk51bWJlciIsImZvckVhY2giLCJlaXBPcmFjbGUiLCJDaGFpbklkIiwiT1BUSU1JU00iLCJBUkJJVFJVTSIsIkJTQyIsInJlamVjdGVkV2l0aCIsImVzdGltYXRlR2FzIiwiYmFzZUZlZSIsImEiLCJtYXhGZWVQZXJHYXMiLCJtYXhQcmlvcml0eUZlZVBlckdhcyIsImF0IiwibGVhc3QiLCJlc3RpbWF0ZWRNYXhGZWUiLCJCaWdOdW1iZXIiLCJwbHVzIiwiZGVjaW1hbFBsYWNlcyIsIkdXRUlfUFJFQ0lTSU9OIiwidG9OdW1iZXIiLCJkZWZhdWx0UnBjIiwiRkFMTEJBQ0tfRVNUSU1BVEUiLCJhZnRlciIsIm1vY2tlcnkiLCJkaXNhYmxlIiwiZGVyZWdpc3Rlck1vY2siXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdHMvZWlwMTU1OS50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknXG5pbXBvcnQgQmlnTnVtYmVyIGZyb20gJ2JpZ251bWJlci5qcydcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IG1vY2tlcnkgZnJvbSAnbW9ja2VyeSdcbmltcG9ydCB7IGJlZm9yZSwgZGVzY3JpYmUgfSBmcm9tICdtb2NoYSdcblxuaW1wb3J0IHsgQ2hhaW5JZCwgTkVUV09SS1MgfSBmcm9tICdAL2NvbmZpZydcbmltcG9ydCB7IEdXRUlfUFJFQ0lTSU9OIH0gZnJvbSAnQC9jb25zdGFudHMnXG5cbmltcG9ydCB7IEdhc1ByaWNlT3JhY2xlIH0gZnJvbSAnQC9zZXJ2aWNlcy9nYXMtcHJpY2Utb3JhY2xlJ1xuaW1wb3J0IHsgRXN0aW1hdGVkR2FzUHJpY2UgfSBmcm9tICdAL3NlcnZpY2VzL2dhcy1lc3RpbWF0aW9uJ1xuaW1wb3J0IHsgRkFMTEJBQ0tfRVNUSU1BVEUgfSBmcm9tICdAL3NlcnZpY2VzL2dhcy1lc3RpbWF0aW9uL2NvbnN0YW50cydcblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpXG5jaGFpLnNob3VsZCgpXG5cbmxldCBvcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoKVxuXG5iZWZvcmUoJ2JlZm9yZScsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBvcmFjbGUuZWlwMTU1OS5lc3RpbWF0ZUZlZXMoKVxuICBjb25zb2xlLmxvZygnZWlwIGVzdGltYXRpb24gLScsIHsgZ2FzUHJpY2UgfSlcbn0pXG5cbi8vXG5iZWZvcmVFYWNoKCdiZWZvcmVFYWNoJywgZnVuY3Rpb24gKCkge1xuICBvcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoKVxufSlcblxuY29uc3QgSU5KRUNURURfUlBDX1VSTCA9ICdodHRwczovL2V0aGVyZXVtLXJwYy50cnVzdHdhbGxldGFwcC5jb20nXG5kZXNjcmliZSgnZWlwLTE1NTkgZ2FzT3JhY2xlJywgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZSgnZWlwIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgc2V0IGRlZmF1bHQgdmFsdWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgb3JhY2xlLmVpcDE1NTkuY29uZmlndXJhdGlvbi5ibG9ja3NDb3VudC5zaG91bGQuYmUuZXF1YWwoTkVUV09SS1Nbb3JhY2xlLmVpcDE1NTkuY29uZmlndXJhdGlvbi5jaGFpbklkXS5ibG9ja3NDb3VudClcbiAgICAgIG9yYWNsZS5laXAxNTU5LmNvbmZpZ3VyYXRpb24ucGVyY2VudGlsZS5zaG91bGQuYmUuZXF1YWwoTkVUV09SS1Nbb3JhY2xlLmVpcDE1NTkuY29uZmlndXJhdGlvbi5jaGFpbklkXS5wZXJjZW50aWxlKVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHNldCBwYXNzZWQgdmFsdWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbmV3SGlzdG9yeUJsb2NrcyA9IDE1XG4gICAgICBjb25zdCBuZXdIaXN0b3J5UGVyY2VudGlsZSA9IDEwXG5cbiAgICAgIGNvbnN0IG5ld09yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSh7XG4gICAgICAgIGJsb2Nrc0NvdW50OiBuZXdIaXN0b3J5QmxvY2tzLFxuICAgICAgICBwZXJjZW50aWxlOiBuZXdIaXN0b3J5UGVyY2VudGlsZSxcbiAgICAgIH0pXG5cbiAgICAgIG5ld09yYWNsZS5laXAxNTU5LmNvbmZpZ3VyYXRpb24uYmxvY2tzQ291bnQuc2hvdWxkLmJlLmVxdWFsKG5ld0hpc3RvcnlCbG9ja3MpXG4gICAgICBuZXdPcmFjbGUuZWlwMTU1OS5jb25maWd1cmF0aW9uLnBlcmNlbnRpbGUuc2hvdWxkLmJlLmVxdWFsKG5ld0hpc3RvcnlQZXJjZW50aWxlKVxuICAgIH0pXG4gIH0pXG5cbiAgY29uc3QgY2hhaW5zID0gT2JqZWN0LmtleXMoTkVUV09SS1MpLm1hcCgoaWQpID0+IE51bWJlcihpZCkpXG5cbiAgY2hhaW5zLmZvckVhY2goKGNoYWluSWQpID0+IHtcbiAgICBsZXQgZWlwT3JhY2xlID0gbmV3IEdhc1ByaWNlT3JhY2xlKHsgY2hhaW5JZCB9KVxuXG4gICAgZGVzY3JpYmUoYGVzdGltYXRlR2FzICR7Y2hhaW5JZH1gLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBlcnJvciBpZiBub3QgZWlwLTE1NTkgbm90IHN1cHBvcnRlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNoYWluSWQgPT09IENoYWluSWQuT1BUSU1JU00gfHwgY2hhaW5JZCA9PT0gQ2hhaW5JZC5BUkJJVFJVTSB8fCBjaGFpbklkID09PSBDaGFpbklkLkJTQykge1xuICAgICAgICAgIGF3YWl0IGVpcE9yYWNsZS5laXAxNTU5XG4gICAgICAgICAgICAuZXN0aW1hdGVGZWVzKClcbiAgICAgICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyBjdXJyZW50IGJhc2UgZmVlLCBmYWxsaW5nIGJhY2snKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAoY2hhaW5JZCA9PT0gQ2hhaW5JZC5PUFRJTUlTTSB8fCBjaGFpbklkID09PSBDaGFpbklkLkFSQklUUlVNIHx8IGNoYWluSWQgPT09IENoYWluSWQuQlNDKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpdCgnc2hvdWxkIHdvcmsnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGVzdGltYXRlR2FzOiBFc3RpbWF0ZWRHYXNQcmljZSA9IGF3YWl0IGVpcE9yYWNsZS5laXAxNTU5LmVzdGltYXRlRmVlcygpXG5cbiAgICAgICAgY29uc29sZS5sb2coYGVzdGltYXRlR2FzICR7Y2hhaW5JZH1gLCBlc3RpbWF0ZUdhcylcbiAgICAgICAgaWYgKGVzdGltYXRlR2FzLmJhc2VGZWUpIHtcbiAgICAgICAgICBlc3RpbWF0ZUdhcy5iYXNlRmVlLnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgICAgIGVzdGltYXRlR2FzLm1heEZlZVBlckdhcy5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICBlc3RpbWF0ZUdhcy5tYXhQcmlvcml0eUZlZVBlckdhcy5zaG91bGQuYmUuYSgnbnVtYmVyJylcblxuICAgICAgICAgIGVzdGltYXRlR2FzLm1heEZlZVBlckdhcy5zaG91bGQuYmUuYXQubGVhc3QoZXN0aW1hdGVHYXMuYmFzZUZlZSlcbiAgICAgICAgICBjb25zdCBlc3RpbWF0ZWRNYXhGZWUgPSBuZXcgQmlnTnVtYmVyKGVzdGltYXRlR2FzLmJhc2VGZWUpXG4gICAgICAgICAgICAucGx1cyhlc3RpbWF0ZUdhcy5tYXhQcmlvcml0eUZlZVBlckdhcylcbiAgICAgICAgICAgIC5kZWNpbWFsUGxhY2VzKEdXRUlfUFJFQ0lTSU9OKVxuICAgICAgICAgICAgLnRvTnVtYmVyKClcbiAgICAgICAgICBlc3RpbWF0ZUdhcy5tYXhGZWVQZXJHYXMuc2hvdWxkLmJlLmF0LmVxdWFsKGVzdGltYXRlZE1heEZlZSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggY3Jhc2hlZCBycGMgKHJldHVybiBkZWZhdWx0IGRhdGEpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBlaXBPcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoeyBkZWZhdWx0UnBjOiAnd3JvbmdScGNVcmwnLCBjaGFpbklkIH0pXG4gICAgICAgIGNvbnN0IGVzdGltYXRlR2FzOiBFc3RpbWF0ZWRHYXNQcmljZSA9IGF3YWl0IGVpcE9yYWNsZS5laXAxNTU5LmVzdGltYXRlRmVlcyhGQUxMQkFDS19FU1RJTUFURSlcblxuICAgICAgICBpZiAoZXN0aW1hdGVHYXMuYmFzZUZlZSkge1xuICAgICAgICAgIGVzdGltYXRlR2FzLmJhc2VGZWUuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICAgICAgZXN0aW1hdGVHYXMubWF4RmVlUGVyR2FzLnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgICAgIGVzdGltYXRlR2FzLm1heFByaW9yaXR5RmVlUGVyR2FzLnNob3VsZC5iZS5hKCdudW1iZXInKVxuXG4gICAgICAgICAgZXN0aW1hdGVHYXMuYmFzZUZlZS5zaG91bGQuYmUuYXQuZXF1YWwoRkFMTEJBQ0tfRVNUSU1BVEUuYmFzZUZlZSlcbiAgICAgICAgICBlc3RpbWF0ZUdhcy5tYXhGZWVQZXJHYXMuc2hvdWxkLmJlLmF0LmVxdWFsKEZBTExCQUNLX0VTVElNQVRFLm1heEZlZVBlckdhcylcbiAgICAgICAgICBlc3RpbWF0ZUdhcy5tYXhQcmlvcml0eUZlZVBlckdhcy5zaG91bGQuYmUuYXQuZXF1YWwoRkFMTEJBQ0tfRVNUSU1BVEUubWF4UHJpb3JpdHlGZWVQZXJHYXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGl0KCdzaG91bGQgd29yayB3aXRoIGN1c3RvbSBycGMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVpcE9yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSh7IGRlZmF1bHRScGM6IElOSkVDVEVEX1JQQ19VUkwsIGNoYWluSWQgfSlcbiAgICAgICAgY29uc3QgZXN0aW1hdGVHYXM6IEVzdGltYXRlZEdhc1ByaWNlID0gYXdhaXQgZWlwT3JhY2xlLmVpcDE1NTkuZXN0aW1hdGVGZWVzKEZBTExCQUNLX0VTVElNQVRFKVxuXG4gICAgICAgIGlmIChlc3RpbWF0ZUdhcy5iYXNlRmVlKSB7XG4gICAgICAgICAgZXN0aW1hdGVHYXMuYmFzZUZlZS5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICBlc3RpbWF0ZUdhcy5tYXhGZWVQZXJHYXMuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICAgICAgZXN0aW1hdGVHYXMubWF4UHJpb3JpdHlGZWVQZXJHYXMuc2hvdWxkLmJlLmEoJ251bWJlcicpXG5cbiAgICAgICAgICBjb25zdCBlc3RpbWF0ZWRNYXhGZWUgPSBuZXcgQmlnTnVtYmVyKGVzdGltYXRlR2FzLmJhc2VGZWUpXG4gICAgICAgICAgICAucGx1cyhlc3RpbWF0ZUdhcy5tYXhQcmlvcml0eUZlZVBlckdhcylcbiAgICAgICAgICAgIC5kZWNpbWFsUGxhY2VzKEdXRUlfUFJFQ0lTSU9OKVxuICAgICAgICAgICAgLnRvTnVtYmVyKClcbiAgICAgICAgICBlc3RpbWF0ZUdhcy5tYXhGZWVQZXJHYXMuc2hvdWxkLmJlLmF0LmxlYXN0KGVzdGltYXRlR2FzLmJhc2VGZWUpXG4gICAgICAgICAgZXN0aW1hdGVHYXMubWF4RmVlUGVyR2FzLnNob3VsZC5iZS5hdC5lcXVhbChlc3RpbWF0ZWRNYXhGZWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn0pXG5cbmFmdGVyKCdhZnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgYWZ0ZXIoZnVuY3Rpb24gKCkge1xuICAgIG1vY2tlcnkuZGlzYWJsZSgpXG4gICAgbW9ja2VyeS5kZXJlZ2lzdGVyTW9jaygnbm9kZS1mZXRjaCcpXG4gIH0pXG59KVxuIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7O0FBQ0E7O0FBR0E7O0FBR0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7K0NBaEJBLG9KOzs7Ozs7QUFrQkFBLGdCQUFBLENBQUtDLEdBQUwsQ0FBU0MsMEJBQVQ7O0FBQ0FGLGdCQUFBLENBQUtHLE1BQUw7O0FBRUEsSUFBSUMsTUFBTSxHQUFHLElBQUlDLDhCQUFKLEVBQWI7QUFFQSxJQUFBQyxhQUFBLEVBQU8sUUFBUCwwRUFBaUI7RUFBQTtFQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7VUFBQSxPQUNRRixNQUFNLENBQUNHLE9BQVAsQ0FBZUMsWUFBZixFQURSOztRQUFBO1VBQ1RDLFFBRFM7VUFFZkMsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVosRUFBZ0M7WUFBRUYsUUFBUSxFQUFSQTtVQUFG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