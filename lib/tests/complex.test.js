"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _chai = _interopRequireDefault(require("chai"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _mockery = _interopRequireDefault(require("mockery"));

var _mocha = require("mocha");

var _constants = require("../constants");

var _services = require("../services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(require('chai-as-promised'));

_chai["default"].should();

var oracle = new _services.GasPriceOracle();
(0, _mocha.before)('before', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var gasPrice;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return oracle.legacy.gasPrices();

        case 2:
          gasPrice = _context.sent;
          console.log('legacy gasPrice - ', {
            gasPrice: gasPrice
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _mocha.before)('before', function () {
  var axiosMock = {
    get: function get() {
      throw new Error('axios GET method is mocked for tests');
    },
    post: function post() {
      throw new Error('axios POST method is mocked for tests');
    }
  };

  _mockery["default"].registerMock('axios', axiosMock);
});
beforeEach('beforeEach', function () {
  oracle = new _services.GasPriceOracle();
});
var INJECTED_CHAIN_ID = 5;
var INJECTED_RPC_URL = 'https://rpc.goerli.mudit.blog/';
(0, _mocha.describe)('complex test', function () {
  (0, _mocha.describe)('fetching data', function () {
    (0, _mocha.describe)('should work with unexpected chainId', function () {
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
      it('legacy', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var newOracle, goerliGas;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                newOracle = new _services.GasPriceOracle({
                  timeout: 1337,
                  chainId: INJECTED_CHAIN_ID,
                  defaultRpc: INJECTED_RPC_URL
                });
                _context2.next = 3;
                return newOracle.gasPrices({
                  isLegacy: true
                });

              case 3:
                goerliGas = _context2.sent;

                if ('instant' in goerliGas) {
                  goerliGas.instant.should.be.a('number');
                  goerliGas.fast.should.be.a('number');
                  goerliGas.standard.should.be.a('number');
                  goerliGas.low.should.be.a('number');
                }

                newOracle.legacy.configuration.defaultRpc.should.be.equal(INJECTED_RPC_URL);
                newOracle.legacy.configuration.chainId.should.be.equal(INJECTED_CHAIN_ID);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
      it('eip-1559', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var newOracle, goerliEstimated, estimatedMaxFee;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                newOracle = new _services.GasPriceOracle({
                  timeout: 1337,
                  chainId: INJECTED_CHAIN_ID,
                  defaultRpc: INJECTED_RPC_URL
                });
                _context3.next = 3;
                return newOracle.eip1559.estimateFees();

              case 3:
                goerliEstimated = _context3.sent;

                if (goerliEstimated.baseFee) {
                  goerliEstimated.baseFee.should.be.a('number');
                  goerliEstimated.maxFeePerGas.should.be.at.least(goerliEstimated.baseFee);
                  estimatedMaxFee = new _bignumber["default"](goerliEstimated.baseFee).plus(goerliEstimated.maxPriorityFeePerGas).decimalPlaces(_constants.GWEI_PRECISION).toNumber();
                  goerliEstimated.maxFeePerGas.should.be.at.equal(estimatedMaxFee);
                }

                goerliEstimated.maxFeePerGas.should.be.a('number');
                goerliEstimated.maxPriorityFeePerGas.should.be.a('number');
                newOracle.legacy.configuration.defaultRpc.should.be.equal(INJECTED_RPC_URL);
                newOracle.legacy.configuration.chainId.should.be.equal(INJECTED_CHAIN_ID);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
      it('without selected strategy', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var newOracle, gasPrice, estimatedMaxFee;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                newOracle = new _services.GasPriceOracle({
                  timeout: 1337,
                  chainId: INJECTED_CHAIN_ID,
                  defaultRpc: INJECTED_RPC_URL
                });
                _context4.next = 3;
                return newOracle.gasPrices({});

              case 3:
                gasPrice = _context4.sent;

                if ('baseFee' in gasPrice && gasPrice.baseFee) {
                  gasPrice.baseFee.should.be.a('number');
                  gasPrice.maxFeePerGas.should.be.at.least(gasPrice.baseFee);
                  estimatedMaxFee = new _bignumber["default"](gasPrice.baseFee).plus(gasPrice.maxPriorityFeePerGas).decimalPlaces(_constants.GWEI_PRECISION).toNumber();
                  gasPrice.maxFeePerGas.should.be.at.equal(estimatedMaxFee);
                }

                if ('maxFeePerGas' in gasPrice) {
                  gasPrice.maxFeePerGas.should.be.a('number');
                  gasPrice.maxPriorityFeePerGas.should.be.a('number');
                }

                if ('instant' in gasPrice) {
                  gasPrice.instant.should.be.a('number');
                  gasPrice.fast.should.be.a('number');
                  gasPrice.standard.should.be.a('number');
                  gasPrice.low.should.be.a('number');
                }

                newOracle.legacy.configuration.defaultRpc.should.be.equal(INJECTED_RPC_URL);
                newOracle.legacy.configuration.chainId.should.be.equal(INJECTED_CHAIN_ID);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjaGFpIiwidXNlIiwicmVxdWlyZSIsInNob3VsZCIsIm9yYWNsZSIsIkdhc1ByaWNlT3JhY2xlIiwiYmVmb3JlIiwibGVnYWN5IiwiZ2FzUHJpY2VzIiwiZ2FzUHJpY2UiLCJjb25zb2xlIiwibG9nIiwiYXhpb3NNb2NrIiwiZ2V0IiwiRXJyb3IiLCJwb3N0IiwibW9ja2VyeSIsInJlZ2lzdGVyTW9jayIsImJlZm9yZUVhY2giLCJJTkpFQ1RFRF9DSEFJTl9JRCIsIklOSkVDVEVEX1JQQ19VUkwiLCJkZXNjcmliZSIsIml0IiwibmV3T3JhY2xlIiwidGltZW91dCIsImNoYWluSWQiLCJkZWZhdWx0UnBjIiwiaXNMZWdhY3kiLCJnb2VybGlHYXMiLCJpbnN0YW50IiwiYmUiLCJhIiwiZmFzdCIsInN0YW5kYXJkIiwibG93IiwiY29uZmlndXJhdGlvbiIsImVxdWFsIiwiZWlwMTU1OSIsImVzdGltYXRlRmVlcyIsImdvZXJsaUVzdGltYXRlZCIsImJhc2VGZWUiLCJtYXhGZWVQZXJHYXMiLCJhdCIsImxlYXN0IiwiZXN0aW1hdGVkTWF4RmVlIiwiQmlnTnVtYmVyIiwicGx1cyIsIm1heFByaW9yaXR5RmVlUGVyR2FzIiwiZGVjaW1hbFBsYWNlcyIsIkdXRUlfUFJFQ0lTSU9OIiwidG9OdW1iZXIiLCJhZnRlciIsImRpc2FibGUiLCJkZXJlZ2lzdGVyTW9jayJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9jb21wbGV4LnRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlcyAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSdcbmltcG9ydCBCaWdOdW1iZXIgZnJvbSAnYmlnbnVtYmVyLmpzJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IG1vY2tlcnkgZnJvbSAnbW9ja2VyeSdcbmltcG9ydCB7IGJlZm9yZSwgZGVzY3JpYmUgfSBmcm9tICdtb2NoYSdcblxuaW1wb3J0IHsgR1dFSV9QUkVDSVNJT04gfSBmcm9tICdAL2NvbnN0YW50cydcbmltcG9ydCB7IEdhc1ByaWNlT3JhY2xlLCBHYXNQcmljZSB9IGZyb20gJ0Avc2VydmljZXMnXG5cbmNoYWkudXNlKHJlcXVpcmUoJ2NoYWktYXMtcHJvbWlzZWQnKSlcbmNoYWkuc2hvdWxkKClcblxubGV0IG9yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSgpXG5cbmJlZm9yZSgnYmVmb3JlJywgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IG9yYWNsZS5sZWdhY3kuZ2FzUHJpY2VzKClcbiAgY29uc29sZS5sb2coJ2xlZ2FjeSBnYXNQcmljZSAtICcsIHsgZ2FzUHJpY2UgfSlcbn0pXG5cbmJlZm9yZSgnYmVmb3JlJywgZnVuY3Rpb24gKCkge1xuICBjb25zdCBheGlvc01vY2sgPSB7XG4gICAgZ2V0OiAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F4aW9zIEdFVCBtZXRob2QgaXMgbW9ja2VkIGZvciB0ZXN0cycpXG4gICAgfSxcbiAgICBwb3N0OiAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F4aW9zIFBPU1QgbWV0aG9kIGlzIG1vY2tlZCBmb3IgdGVzdHMnKVxuICAgIH0sXG4gIH1cbiAgbW9ja2VyeS5yZWdpc3Rlck1vY2soJ2F4aW9zJywgYXhpb3NNb2NrKVxufSlcblxuYmVmb3JlRWFjaCgnYmVmb3JlRWFjaCcsIGZ1bmN0aW9uICgpIHtcbiAgb3JhY2xlID0gbmV3IEdhc1ByaWNlT3JhY2xlKClcbn0pXG5cbmNvbnN0IElOSkVDVEVEX0NIQUlOX0lEID0gNVxuY29uc3QgSU5KRUNURURfUlBDX1VSTCA9ICdodHRwczovL3JwYy5nb2VybGkubXVkaXQuYmxvZy8nXG5cbmRlc2NyaWJlKCdjb21wbGV4IHRlc3QnLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCdmZXRjaGluZyBkYXRhJywgZnVuY3Rpb24gKCkge1xuICAgIGRlc2NyaWJlKCdzaG91bGQgd29yayB3aXRoIHVuZXhwZWN0ZWQgY2hhaW5JZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGl0KCdsZWdhY3knLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgIGNvbnN0IG5ld09yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSh7IGNoYWluSWQ6IENoYWluSWQuWERBSSB9KVxuICAgICAgLy9cbiAgICAgIC8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgLy8gICAgIGNvbnN0IHJlcyA9IGF3YWl0IG5ld09yYWNsZS5laXAxNTU5LmVzdGltYXRlRmVlcygpXG4gICAgICAvLyAgICAgYXdhaXQgbmV3IFByb21pc2UoKHIpID0+XG4gICAgICAvLyAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vICAgICAgICAgcihjb25zb2xlLmxvZyhgcmVzIC0gJHtpfWAsIHJlcykpXG4gICAgICAvLyAgICAgICB9LCAzMDAwKSxcbiAgICAgIC8vICAgICApXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pXG5cbiAgICAgIGl0KCdsZWdhY3knLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IG5ld09yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSh7IHRpbWVvdXQ6IDEzMzcsIGNoYWluSWQ6IElOSkVDVEVEX0NIQUlOX0lELCBkZWZhdWx0UnBjOiBJTkpFQ1RFRF9SUENfVVJMIH0pXG5cbiAgICAgICAgY29uc3QgZ29lcmxpR2FzID0gKGF3YWl0IG5ld09yYWNsZS5nYXNQcmljZXMoeyBpc0xlZ2FjeTogdHJ1ZSB9KSkgYXMgdW5rbm93biBhcyBHYXNQcmljZVxuICAgICAgICBpZiAoJ2luc3RhbnQnIGluIGdvZXJsaUdhcykge1xuICAgICAgICAgIGdvZXJsaUdhcy5pbnN0YW50LnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgICAgIGdvZXJsaUdhcy5mYXN0LnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgICAgIGdvZXJsaUdhcy5zdGFuZGFyZC5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICBnb2VybGlHYXMubG93LnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgICB9XG5cbiAgICAgICAgbmV3T3JhY2xlLmxlZ2FjeS5jb25maWd1cmF0aW9uLmRlZmF1bHRScGMuc2hvdWxkLmJlLmVxdWFsKElOSkVDVEVEX1JQQ19VUkwpXG4gICAgICAgIG5ld09yYWNsZS5sZWdhY3kuY29uZmlndXJhdGlvbi5jaGFpbklkLnNob3VsZC5iZS5lcXVhbChJTkpFQ1RFRF9DSEFJTl9JRClcbiAgICAgIH0pXG4gICAgICBpdCgnZWlwLTE1NTknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IG5ld09yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSh7IHRpbWVvdXQ6IDEzMzcsIGNoYWluSWQ6IElOSkVDVEVEX0NIQUlOX0lELCBkZWZhdWx0UnBjOiBJTkpFQ1RFRF9SUENfVVJMIH0pXG5cbiAgICAgICAgY29uc3QgZ29lcmxpRXN0aW1hdGVkID0gYXdhaXQgbmV3T3JhY2xlLmVpcDE1NTkuZXN0aW1hdGVGZWVzKClcbiAgICAgICAgaWYgKGdvZXJsaUVzdGltYXRlZC5iYXNlRmVlKSB7XG4gICAgICAgICAgZ29lcmxpRXN0aW1hdGVkLmJhc2VGZWUuc2hvdWxkLmJlLmEoJ251bWJlcicpXG5cbiAgICAgICAgICBnb2VybGlFc3RpbWF0ZWQubWF4RmVlUGVyR2FzLnNob3VsZC5iZS5hdC5sZWFzdChnb2VybGlFc3RpbWF0ZWQuYmFzZUZlZSlcbiAgICAgICAgICBjb25zdCBlc3RpbWF0ZWRNYXhGZWUgPSBuZXcgQmlnTnVtYmVyKGdvZXJsaUVzdGltYXRlZC5iYXNlRmVlKVxuICAgICAgICAgICAgLnBsdXMoZ29lcmxpRXN0aW1hdGVkLm1heFByaW9yaXR5RmVlUGVyR2FzKVxuICAgICAgICAgICAgLmRlY2ltYWxQbGFjZXMoR1dFSV9QUkVDSVNJT04pXG4gICAgICAgICAgICAudG9OdW1iZXIoKVxuICAgICAgICAgIGdvZXJsaUVzdGltYXRlZC5tYXhGZWVQZXJHYXMuc2hvdWxkLmJlLmF0LmVxdWFsKGVzdGltYXRlZE1heEZlZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGdvZXJsaUVzdGltYXRlZC5tYXhGZWVQZXJHYXMuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICAgIGdvZXJsaUVzdGltYXRlZC5tYXhQcmlvcml0eUZlZVBlckdhcy5zaG91bGQuYmUuYSgnbnVtYmVyJylcblxuICAgICAgICBuZXdPcmFjbGUubGVnYWN5LmNvbmZpZ3VyYXRpb24uZGVmYXVsdFJwYy5zaG91bGQuYmUuZXF1YWwoSU5KRUNURURfUlBDX1VSTClcbiAgICAgICAgbmV3T3JhY2xlLmxlZ2FjeS5jb25maWd1cmF0aW9uLmNoYWluSWQuc2hvdWxkLmJlLmVxdWFsKElOSkVDVEVEX0NIQUlOX0lEKVxuICAgICAgfSlcbiAgICAgIGl0KCd3aXRob3V0IHNlbGVjdGVkIHN0cmF0ZWd5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBuZXdPcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoeyB0aW1lb3V0OiAxMzM3LCBjaGFpbklkOiBJTkpFQ1RFRF9DSEFJTl9JRCwgZGVmYXVsdFJwYzogSU5KRUNURURfUlBDX1VSTCB9KVxuXG4gICAgICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgbmV3T3JhY2xlLmdhc1ByaWNlcyh7fSlcblxuICAgICAgICBpZiAoJ2Jhc2VGZWUnIGluIGdhc1ByaWNlICYmIGdhc1ByaWNlLmJhc2VGZWUpIHtcbiAgICAgICAgICBnYXNQcmljZS5iYXNlRmVlLnNob3VsZC5iZS5hKCdudW1iZXInKVxuXG4gICAgICAgICAgZ2FzUHJpY2UubWF4RmVlUGVyR2FzLnNob3VsZC5iZS5hdC5sZWFzdChnYXNQcmljZS5iYXNlRmVlKVxuICAgICAgICAgIGNvbnN0IGVzdGltYXRlZE1heEZlZSA9IG5ldyBCaWdOdW1iZXIoZ2FzUHJpY2UuYmFzZUZlZSlcbiAgICAgICAgICAgIC5wbHVzKGdhc1ByaWNlLm1heFByaW9yaXR5RmVlUGVyR2FzKVxuICAgICAgICAgICAgLmRlY2ltYWxQbGFjZXMoR1dFSV9QUkVDSVNJT04pXG4gICAgICAgICAgICAudG9OdW1iZXIoKVxuICAgICAgICAgIGdhc1ByaWNlLm1heEZlZVBlckdhcy5zaG91bGQuYmUuYXQuZXF1YWwoZXN0aW1hdGVkTWF4RmVlKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdtYXhGZWVQZXJHYXMnIGluIGdhc1ByaWNlKSB7XG4gICAgICAgICAgZ2FzUHJpY2UubWF4RmVlUGVyR2FzLnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgICAgIGdhc1ByaWNlLm1heFByaW9yaXR5RmVlUGVyR2FzLnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCdpbnN0YW50JyBpbiBnYXNQcmljZSkge1xuICAgICAgICAgIGdhc1ByaWNlLmluc3RhbnQuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICAgICAgZ2FzUHJpY2UuZmFzdC5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICBnYXNQcmljZS5zdGFuZGFyZC5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICBnYXNQcmljZS5sb3cuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICAgIH1cblxuICAgICAgICBuZXdPcmFjbGUubGVnYWN5LmNvbmZpZ3VyYXRpb24uZGVmYXVsdFJwYy5zaG91bGQuYmUuZXF1YWwoSU5KRUNURURfUlBDX1VSTClcbiAgICAgICAgbmV3T3JhY2xlLmxlZ2FjeS5jb25maWd1cmF0aW9uLmNoYWluSWQuc2hvdWxkLmJlLmVxdWFsKElOSkVDVEVEX0NIQUlOX0lEKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufSlcblxuYWZ0ZXIoJ2FmdGVyJywgZnVuY3Rpb24gKCkge1xuICBhZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgbW9ja2VyeS5kaXNhYmxlKClcbiAgICBtb2NrZXJ5LmRlcmVnaXN0ZXJNb2NrKCdub2RlLWZldGNoJylcbiAgfSlcbn0pXG4iXSwibWFwcGluZ3MiOiI7Ozs7QUFHQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFFQTs7QUFDQTs7OzsrQ0FWQSxvSjs7Ozs7O0FBWUFBLGdCQUFBLENBQUtDLEdBQUwsQ0FBU0MsT0FBTyxDQUFDLGtCQUFELENBQWhCOztBQUNBRixnQkFBQSxDQUFLRyxNQUFMOztBQUVBLElBQUlDLE1BQU0sR0FBRyxJQUFJQyx3QkFBSixFQUFiO0FBRUEsSUFBQUMsYUFBQSxFQUFPLFFBQVAsMEVBQWlCO0VBQUE7RUFBQTtJQUFBO01BQUE7UUFBQTtVQUFBO1VBQUEsT0FDUUYsTUFBTSxDQUFDRyxNQUFQLENBQWNDLFNBQWQsRUFEUjs7UUFBQTtVQUNUQyxRQURTO1VBRWZDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaLEVBQWtDO1lBQUVGLFFBQVEsRUFBUkE7VUFBRixDQUFsQzs7UUFGZTtRQUFBO1VBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQSxDQUFqQjtBQUtBLElBQUFILGFBQUEsRUFBTyxRQUFQLEVBQWlCLFlBQVk7RUFDM0IsSUFBTU0sU0FBUyxHQUFHO0lBQ2hCQyxHQUFHLEVBQUUsZUFBTTtNQUNULE1BQU0sSUFBSUMsS0FBSixDQUFVLHNDQUFWLENBQU47SUFDRCxDQUhlO0lBSWhCQyxJQUFJLEVBQUUsZ0JBQU07TUFDVixNQUFNLElBQUlELEtBQUosQ0FBVSx1Q0FBVixDQUFOO0lBQ0Q7RUFOZSxDQUFsQjs7RUFRQUUsbUJBQUEsQ0FBUUMsWUFBUixDQUFxQixPQUFyQixFQUE4QkwsU0FBOUI7QUFDRCxDQVZEO0FBWUFNLFVBQVUsQ0FBQyxZQUFELEVBQWUsWUFBWTtFQUNuQ2QsTUFBTSxHQUFHLElBQUlDLHdCQUFK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