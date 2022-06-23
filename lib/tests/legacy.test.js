"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _chai = _interopRequireDefault(require("chai"));

var _mockery = _interopRequireDefault(require("mockery"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _mocha = require("mocha");

var _config = require("../config");

var _constants = require("../constants");

var _gasPriceOracle = require("../services/gas-price-oracle");

var _legacyGasPrice = require("../services/legacy-gas-price");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(require('chai-as-promised'));

_chai["default"].should();

var oracle = new _gasPriceOracle.GasPriceOracle();
var _oracle$legacy = oracle.legacy,
    onChainOracles = _oracle$legacy.onChainOracles,
    offChainOracles = _oracle$legacy.offChainOracles;
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
  oracle = new _gasPriceOracle.GasPriceOracle();
  var _oracle$legacy2 = oracle.legacy;
  onChainOracles = _oracle$legacy2.onChainOracles;
  offChainOracles = _oracle$legacy2.offChainOracles;
});
var INJECTED_RPC_URL = 'https://ethereum-rpc.trustwalletapp.com';
(0, _mocha.describe)('legacy gasOracle', function () {
  (0, _mocha.describe)('legacy constructor', function () {
    it('should set default values', function () {
      oracle.legacy.configuration.defaultRpc.should.be.equal(_config.NETWORKS[_config.ChainId.MAINNET].rpcUrl);
      oracle.legacy.configuration.timeout.should.be.equal(_constants.DEFAULT_TIMEOUT);
    });
    it('should set passed values', function () {
      var newOracle = new _gasPriceOracle.GasPriceOracle({
        timeout: 1337
      });
      newOracle.legacy.configuration.defaultRpc.should.be.equal(_config.NETWORKS[_config.ChainId.MAINNET].rpcUrl);
      newOracle.legacy.configuration.timeout.should.be.equal(1337);
    });
  });
  (0, _mocha.describe)('fetchGasPricesOffChain', function () {
    it('should work', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var gas;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return oracle.legacy.fetchGasPricesOffChain(true);

            case 2:
              gas = _context2.sent;
              gas.instant.should.be.a('number');
              gas.fast.should.be.a('number');
              gas.standard.should.be.a('number');
              gas.low.should.be.a('number');
              gas.instant.should.be.at.least(gas.fast);
              gas.fast.should.be.at.least(gas.standard);
              gas.standard.should.be.at.least(gas.low);
              gas.low.should.not.be.equal(0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should throw if all offchain oracles are down', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var _require, GasPriceOracle;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _mockery["default"].enable({
                useCleanCache: true,
                warnOnUnregistered: false
              });

              _require = require("../index"), GasPriceOracle = _require.GasPriceOracle;
              oracle = new GasPriceOracle();
              _context3.next = 5;
              return oracle.legacy.fetchGasPricesOffChain(true).should.be.rejectedWith('All oracles are down. Probably a network error.');

            case 5:
              _mockery["default"].disable();

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  (0, _mocha.describe)('fetchGasPricesOnChain', function () {
    it('should work', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var gas;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return oracle.legacy.fetchGasPricesOnChain();

            case 2:
              gas = _context4.sent;
              gas.should.be.a('number');
              gas.should.be.above(1);
              gas.should.not.be.equal(0);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should work with custom rpc', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var rpc, gas;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              rpc = INJECTED_RPC_URL;
              oracle = new _gasPriceOracle.GasPriceOracle({
                defaultRpc: rpc
              });
              oracle.legacy.configuration.defaultRpc.should.be.equal(rpc);
              _context5.next = 5;
              return oracle.legacy.fetchGasPricesOnChain();

            case 5:
              gas = _context5.sent;
              gas.should.be.a('number');
              gas.should.be.above(1);
              gas.should.not.be.equal(0);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should remove oracle', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return oracle.legacy.fetchGasPricesOnChain();

            case 2:
              oracle.legacy.removeOnChainOracle('chainlink');
              _context6.next = 5;
              return oracle.legacy.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probably a network error.');

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('should add oracle', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var toAdd, gas;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              toAdd = onChainOracles.chainlink;
              _context7.next = 3;
              return oracle.legacy.fetchGasPricesOnChain();

            case 3:
              oracle.legacy.removeOnChainOracle('chainlink');
              _context7.next = 6;
              return oracle.legacy.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probably a network error.');

            case 6:
              oracle.legacy.addOnChainOracle(toAdd);
              _context7.next = 9;
              return oracle.legacy.fetchGasPricesOnChain();

            case 9:
              gas = _context7.sent;
              gas.should.be.a('number');
              gas.should.not.be.equal(0);

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should throw if all onchain oracles are down', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var _require2, GasPriceOracle;

      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _mockery["default"].enable({
                useCleanCache: true,
                warnOnUnregistered: false
              });

              _require2 = require("../index"), GasPriceOracle = _require2.GasPriceOracle;
              oracle = new GasPriceOracle();
              _context8.next = 5;
              return oracle.legacy.fetchGasPricesOnChain().should.be.rejectedWith('All oracles are down. Probably a network error.');

            case 5:
              _mockery["default"].disable();

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  (0, _mocha.describe)('fetchGasPriceFromRpc', function () {
    it('should work', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var gas;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return oracle.legacy.fetchGasPriceFromRpc();

            case 2:
              gas = _context9.sent;
              gas.should.be.a('number');
              gas.should.be.above(1);
              gas.should.not.be.equal(0);

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('should work with custom rpc', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var rpc, oracle, gas;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              rpc = INJECTED_RPC_URL;
              oracle = new _gasPriceOracle.GasPriceOracle({
                defaultRpc: rpc
              });
              oracle.legacy.configuration.defaultRpc.should.be.equal(rpc);
              _context10.next = 5;
              return oracle.legacy.fetchGasPriceFromRpc();

            case 5:
              gas = _context10.sent;
              gas.should.be.a('number');
              gas.should.be.above(1);
              gas.should.not.be.equal(0);

            case 9:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('should throw if default rpc is down', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var _require3, GasPriceOracle;

      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _mockery["default"].enable({
                useCleanCache: true,
                warnOnUnregistered: false
              });

              _require3 = require("../index"), GasPriceOracle = _require3.GasPriceOracle;
              oracle = new GasPriceOracle();
              _context11.next = 5;
              return oracle.legacy.fetchGasPriceFromRpc().should.be.rejectedWith('Default RPC is down. Probably a network error.');

            case 5:
              _mockery["default"].disable();

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  (0, _mocha.describe)('legacy gasPrice', function () {
    it('should work', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var gas;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return oracle.gasPrices({
                isLegacy: true
              });

            case 2:
              gas = _context12.sent;
              gas.instant.should.be.a('number');
              gas.fast.should.be.a('number');
              gas.standard.should.be.a('number');
              gas.low.should.be.a('number');
              gas.instant.should.be.at.least(gas.fast);
              gas.fast.should.be.at.least(gas.standard);
              gas.standard.should.be.at.least(gas.low);
              gas.low.should.not.be.equal(0);

            case 11:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it('should fallback', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var _require4, GasPriceOracle, gas, shouldBe;

      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _mockery["default"].enable({
                useCleanCache: true,
                warnOnUnregistered: false
              });

              _require4 = require("../index"), GasPriceOracle = _require4.GasPriceOracle;
              oracle = new GasPriceOracle();
              _context13.next = 5;
              return oracle.gasPrices({
                isLegacy: true
              });

            case 5:
              gas = _context13.sent;
              shouldBe = _legacyGasPrice.LegacyGasPriceOracle.getMultipliedPrices(_config.NETWORKS[_config.ChainId.MAINNET].defaultGasPrice);
              gas.instant.should.be.equal(shouldBe.instant);
              gas.fast.should.be.equal(shouldBe.fast);
              gas.standard.should.be.equal(shouldBe.standard);
              gas.low.should.be.equal(shouldBe.low);

              _mockery["default"].disable();

            case 12:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it('should fallback to set values', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
      var _require5, GasPriceOracle, fallbackGasPrices, gas;

      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _mockery["default"].enable({
                useCleanCache: true,
                warnOnUnregistered: false
              });

              _require5 = require("../index"), GasPriceOracle = _require5.GasPriceOracle;
              oracle = new GasPriceOracle();
              fallbackGasPrices = {
                gasPrices: {
                  instant: 50,
                  fast: 21,
                  standard: 10,
                  low: 3
                }
              };
              _context14.next = 6;
              return oracle.gasPrices({
                isLegacy: true,
                fallbackGasPrices: fallbackGasPrices
              });

            case 6:
              gas = _context14.sent;
              gas.instant.should.be.equal(fallbackGasPrices.gasPrices.instant);
              gas.fast.should.be.equal(fallbackGasPrices.gasPrices.fast);
              gas.standard.should.be.equal(fallbackGasPrices.gasPrices.standard);
              gas.low.should.be.equal(fallbackGasPrices.gasPrices.low);

              _mockery["default"].disable();

            case 12:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
  });
  (0, _mocha.describe)('median', function () {
    it('should work', function () {
      var gas1 = {
        instant: 100,
        fast: 100,
        standard: 100,
        low: 100
      };
      var gas2 = {
        instant: 90,
        fast: 90,
        standard: 90,
        low: 90
      };
      var gas3 = {
        instant: 70,
        fast: 70,
        standard: 70,
        low: 70
      };
      var gas4 = {
        instant: 110.1,
        fast: 110.1,
        standard: 110.1,
        low: 110.1
      };

      var gas = _legacyGasPrice.LegacyGasPriceOracle.getMedianGasPrice([gas1, gas2, gas3]);

      gas.instant.should.be.a('number');
      gas.fast.should.be.a('number');
      gas.standard.should.be.a('number');
      gas.low.should.be.a('number');
      gas.instant.should.be.eq(90);
      gas.fast.should.be.eq(90);
      gas.standard.should.be.eq(90);
      gas.low.should.be.eq(90);
      gas = _legacyGasPrice.LegacyGasPriceOracle.getMedianGasPrice([gas1, gas2, gas3, gas4]);
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
  (0, _mocha.describe)('fetchMedianGasPriceOffChain', function () {
    it('should work', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
      var gas;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return oracle.legacy.fetchMedianGasPriceOffChain();

            case 2:
              gas = _context15.sent;
              gas.instant.should.be.a('number');
              gas.fast.should.be.a('number');
              gas.standard.should.be.a('number');
              gas.low.should.be.a('number');
              gas.instant.should.be.at.least(gas.fast);
              gas.fast.should.be.at.least(gas.standard);
              gas.standard.should.be.at.least(gas.low);
              gas.low.should.not.be.equal(0);

            case 11:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
  });
  (0, _mocha.describe)('normalize result values', function () {
    var wrongDecimalsGas = {
      gasPrices: {
        instant: 1.1,
        fast: 2.12345678901,
        standard: 3.12345678901,
        low: 3.12345679
      }
    };

    var checkDecimals = function checkDecimals(gas) {
      var gasPrices = Object.values(gas);

      for (var _i = 0, _gasPrices = gasPrices; _i < _gasPrices.length; _i++) {
        var _gas = _gasPrices[_i];
        new _bignumber["default"](_gas).dp().should.be.at.most(9);
      }
    };

    it('default fallback should be normalized', function () {
      _mockery["default"].enable({
        useCleanCache: true,
        warnOnUnregistered: false
      });

      oracle = new _gasPriceOracle.GasPriceOracle({
        fallbackGasPrices: wrongDecimalsGas
      });
      checkDecimals(oracle.legacy.configuration.fallbackGasPrices);

      _mockery["default"].disable();
    });
    it('fallback should be normalized', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var _require6, GasPriceOracle, gas;

      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _mockery["default"].enable({
                useCleanCache: true,
                warnOnUnregistered: false
              });

              _require6 = require("../index"), GasPriceOracle = _require6.GasPriceOracle;
              oracle = new GasPriceOracle();
              _context16.next = 5;
              return oracle.legacy.gasPrices(wrongDecimalsGas.gasPrices);

            case 5:
              gas = _context16.sent;
              checkDecimals(gas);

              _mockery["default"].disable();

            case 8:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it('rpc fallback should be normalized', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      var gas;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              oracle = new _gasPriceOracle.GasPriceOracle({
                chainId: 42161,
                defaultRpc: 'https://arb1.arbitrum.io/rpc'
              });
              _context17.next = 3;
              return oracle.legacy.gasPrices();

            case 3:
              gas = _context17.sent;
              checkDecimals(gas);

            case 5:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
  });
  (0, _mocha.describe)('askOracle', function () {
    var chains = Object.keys(_config.NETWORKS).map(function (id) {
      return Number(id);
    });
    chains.forEach(function (chainId) {
      (0, _mocha.describe)("all ".concat(_config.ChainId[chainId], " oracles should answer"), function () {
        oracle = new _gasPriceOracle.GasPriceOracle({
          chainId: chainId
        });
        offChainOracles = oracle.legacy.offChainOracles;

        var _iterator = _createForOfIteratorHelper(Object.values(offChainOracles)),
            _step;

        try {
          var _loop = function _loop() {
            var o = _step.value;
            it("check ".concat(o.name), /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
              var gas;
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) {
                  switch (_context18.prev = _context18.next) {
                    case 0:
                      _context18.prev = 0;
                      _context18.next = 3;
                      return oracle.legacy.askOracle(o);

                    case 3:
                      gas = _context18.sent;
                      gas.instant.should.be.a('number');
                      gas.fast.should.be.a('number');
                      gas.standard.should.be.a('number');
                      gas.low.should.be.a('number');
                      gas.instant.should.be.at.least(gas.fast);
                      gas.fast.should.be.at.least(gas.standard);
                      gas.standard.should.be.at.least(gas.low);
                      gas.low.should.not.be.equal(0);
                      _context18.next = 18;
                      break;

                    case 14:
                      _context18.prev = 14;
                      _context18.t0 = _context18["catch"](0);
                      console.error("Failed to get data from ".concat(o.name, " oracle"));
                      throw new Error(_context18.t0);

                    case 18:
                    case "end":
                      return _context18.stop();
                  }
                }
              }, _callee18, null, [[0, 14]]);
            })));
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    });
  });
});
after('after', function () {
  after(function () {
    _mockery["default"].disable();

    _mockery["default"].deregisterMock('node-fetch');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjaGFpIiwidXNlIiwicmVxdWlyZSIsInNob3VsZCIsIm9yYWNsZSIsIkdhc1ByaWNlT3JhY2xlIiwibGVnYWN5Iiwib25DaGFpbk9yYWNsZXMiLCJvZmZDaGFpbk9yYWNsZXMiLCJiZWZvcmUiLCJnYXNQcmljZXMiLCJnYXNQcmljZSIsImNvbnNvbGUiLCJsb2ciLCJheGlvc01vY2siLCJnZXQiLCJFcnJvciIsInBvc3QiLCJtb2NrZXJ5IiwicmVnaXN0ZXJNb2NrIiwiYmVmb3JlRWFjaCIsIklOSkVDVEVEX1JQQ19VUkwiLCJkZXNjcmliZSIsIml0IiwiY29uZmlndXJhdGlvbiIsImRlZmF1bHRScGMiLCJiZSIsImVxdWFsIiwiTkVUV09SS1MiLCJDaGFpbklkIiwiTUFJTk5FVCIsInJwY1VybCIsInRpbWVvdXQiLCJERUZBVUxUX1RJTUVPVVQiLCJuZXdPcmFjbGUiLCJmZXRjaEdhc1ByaWNlc09mZkNoYWluIiwiZ2FzIiwiaW5zdGFudCIsImEiLCJmYXN0Iiwic3RhbmRhcmQiLCJsb3ciLCJhdCIsImxlYXN0Iiwibm90IiwiZW5hYmxlIiwidXNlQ2xlYW5DYWNoZSIsIndhcm5PblVucmVnaXN0ZXJlZCIsInJlamVjdGVkV2l0aCIsImRpc2FibGUiLCJmZXRjaEdhc1ByaWNlc09uQ2hhaW4iLCJhYm92ZSIsInJwYyIsInJlbW92ZU9uQ2hhaW5PcmFjbGUiLCJ0b0FkZCIsImNoYWlubGluayIsImFkZE9uQ2hhaW5PcmFjbGUiLCJmZXRjaEdhc1ByaWNlRnJvbVJwYyIsImlzTGVnYWN5Iiwic2hvdWxkQmUiLCJMZWdhY3lHYXNQcmljZU9yYWNsZSIsImdldE11bHRpcGxpZWRQcmljZXMiLCJkZWZhdWx0R2FzUHJpY2UiLCJmYWxsYmFja0dhc1ByaWNlcyIsImdhczEiLCJnYXMyIiwiZ2FzMyIsImdhczQiLCJnZXRNZWRpYW5HYXNQcmljZSIsImVxIiwiZmV0Y2hNZWRpYW5HYXNQcmljZU9mZkNoYWluIiwid3JvbmdEZWNpbWFsc0dhcyIsImNoZWNrRGVjaW1hbHMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJCaWdOdW1iZXIiLCJkcCIsIm1vc3QiLCJjaGFpbklkIiwiY2hhaW5zIiwia2V5cyIsIm1hcCIsImlkIiwiTnVtYmVyIiwiZm9yRWFjaCIsIm8iLCJuYW1lIiwiYXNrT3JhY2xlIiwiZXJyb3IiLCJhZnRlciIsImRlcmVnaXN0ZXJNb2NrIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3RzL2xlZ2FjeS50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgbW9ja2VyeSBmcm9tICdtb2NrZXJ5J1xuaW1wb3J0IEJpZ051bWJlciBmcm9tICdiaWdudW1iZXIuanMnXG5pbXBvcnQgeyBiZWZvcmUsIGRlc2NyaWJlIH0gZnJvbSAnbW9jaGEnXG5cbmltcG9ydCB7IENoYWluSWQsIE5FVFdPUktTIH0gZnJvbSAnQC9jb25maWcnXG5pbXBvcnQgeyBERUZBVUxUX1RJTUVPVVQgfSBmcm9tICdAL2NvbnN0YW50cydcbmltcG9ydCB7IEdhc1ByaWNlT3JhY2xlIH0gZnJvbSAnQC9zZXJ2aWNlcy9nYXMtcHJpY2Utb3JhY2xlJ1xuaW1wb3J0IHsgR2FzUHJpY2UsIExlZ2FjeUdhc1ByaWNlT3JhY2xlLCBPZmZDaGFpbk9yYWNsZSB9IGZyb20gJ0Avc2VydmljZXMvbGVnYWN5LWdhcy1wcmljZSdcblxuY2hhaS51c2UocmVxdWlyZSgnY2hhaS1hcy1wcm9taXNlZCcpKVxuY2hhaS5zaG91bGQoKVxuXG5sZXQgb3JhY2xlID0gbmV3IEdhc1ByaWNlT3JhY2xlKClcbmxldCB7IG9uQ2hhaW5PcmFjbGVzLCBvZmZDaGFpbk9yYWNsZXMgfSA9IG9yYWNsZS5sZWdhY3lcblxuYmVmb3JlKCdiZWZvcmUnLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgb3JhY2xlLmxlZ2FjeS5nYXNQcmljZXMoKVxuICBjb25zb2xlLmxvZygnbGVnYWN5IGdhc1ByaWNlIC0gJywgeyBnYXNQcmljZSB9KVxufSlcblxuYmVmb3JlKCdiZWZvcmUnLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGF4aW9zTW9jayA9IHtcbiAgICBnZXQ6ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXhpb3MgR0VUIG1ldGhvZCBpcyBtb2NrZWQgZm9yIHRlc3RzJylcbiAgICB9LFxuICAgIHBvc3Q6ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXhpb3MgUE9TVCBtZXRob2QgaXMgbW9ja2VkIGZvciB0ZXN0cycpXG4gICAgfSxcbiAgfVxuICBtb2NrZXJ5LnJlZ2lzdGVyTW9jaygnYXhpb3MnLCBheGlvc01vY2spXG59KVxuXG5iZWZvcmVFYWNoKCdiZWZvcmVFYWNoJywgZnVuY3Rpb24gKCkge1xuICBvcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoKVxuICA7KHsgb25DaGFpbk9yYWNsZXMsIG9mZkNoYWluT3JhY2xlcyB9ID0gb3JhY2xlLmxlZ2FjeSlcbn0pXG5cbmNvbnN0IElOSkVDVEVEX1JQQ19VUkwgPSAnaHR0cHM6Ly9ldGhlcmV1bS1ycGMudHJ1c3R3YWxsZXRhcHAuY29tJ1xuXG5kZXNjcmliZSgnbGVnYWN5IGdhc09yYWNsZScsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoJ2xlZ2FjeSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHNldCBkZWZhdWx0IHZhbHVlcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG9yYWNsZS5sZWdhY3kuY29uZmlndXJhdGlvbi5kZWZhdWx0UnBjLnNob3VsZC5iZS5lcXVhbChORVRXT1JLU1tDaGFpbklkLk1BSU5ORVRdLnJwY1VybClcbiAgICAgIG9yYWNsZS5sZWdhY3kuY29uZmlndXJhdGlvbi50aW1lb3V0LnNob3VsZC5iZS5lcXVhbChERUZBVUxUX1RJTUVPVVQpXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgc2V0IHBhc3NlZCB2YWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBuZXdPcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoeyB0aW1lb3V0OiAxMzM3IH0pXG5cbiAgICAgIG5ld09yYWNsZS5sZWdhY3kuY29uZmlndXJhdGlvbi5kZWZhdWx0UnBjLnNob3VsZC5iZS5lcXVhbChORVRXT1JLU1tDaGFpbklkLk1BSU5ORVRdLnJwY1VybClcbiAgICAgIG5ld09yYWNsZS5sZWdhY3kuY29uZmlndXJhdGlvbi50aW1lb3V0LnNob3VsZC5iZS5lcXVhbCgxMzM3KVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ2ZldGNoR2FzUHJpY2VzT2ZmQ2hhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCB3b3JrJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZ2FzOiBHYXNQcmljZSA9IGF3YWl0IG9yYWNsZS5sZWdhY3kuZmV0Y2hHYXNQcmljZXNPZmZDaGFpbih0cnVlKVxuXG4gICAgICBnYXMuaW5zdGFudC5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgIGdhcy5mYXN0LnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgZ2FzLnN0YW5kYXJkLnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgZ2FzLmxvdy5zaG91bGQuYmUuYSgnbnVtYmVyJylcblxuICAgICAgZ2FzLmluc3RhbnQuc2hvdWxkLmJlLmF0LmxlYXN0KGdhcy5mYXN0KVxuICAgICAgZ2FzLmZhc3Quc2hvdWxkLmJlLmF0LmxlYXN0KGdhcy5zdGFuZGFyZClcbiAgICAgIGdhcy5zdGFuZGFyZC5zaG91bGQuYmUuYXQubGVhc3QoZ2FzLmxvdylcbiAgICAgIGdhcy5sb3cuc2hvdWxkLm5vdC5iZS5lcXVhbCgwKVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGlmIGFsbCBvZmZjaGFpbiBvcmFjbGVzIGFyZSBkb3duJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbW9ja2VyeS5lbmFibGUoeyB1c2VDbGVhbkNhY2hlOiB0cnVlLCB3YXJuT25VbnJlZ2lzdGVyZWQ6IGZhbHNlIH0pXG4gICAgICBjb25zdCB7IEdhc1ByaWNlT3JhY2xlIH0gPSByZXF1aXJlKCcuLi9pbmRleCcpXG4gICAgICBvcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoKVxuICAgICAgYXdhaXQgb3JhY2xlLmxlZ2FjeS5mZXRjaEdhc1ByaWNlc09mZkNoYWluKHRydWUpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ0FsbCBvcmFjbGVzIGFyZSBkb3duLiBQcm9iYWJseSBhIG5ldHdvcmsgZXJyb3IuJylcbiAgICAgIG1vY2tlcnkuZGlzYWJsZSgpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnZmV0Y2hHYXNQcmljZXNPbkNoYWluJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgd29yaycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGdhczogbnVtYmVyID0gYXdhaXQgb3JhY2xlLmxlZ2FjeS5mZXRjaEdhc1ByaWNlc09uQ2hhaW4oKVxuICAgICAgZ2FzLnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgZ2FzLnNob3VsZC5iZS5hYm92ZSgxKVxuICAgICAgZ2FzLnNob3VsZC5ub3QuYmUuZXF1YWwoMClcbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggY3VzdG9tIHJwYycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHJwYyA9IElOSkVDVEVEX1JQQ19VUkxcbiAgICAgIG9yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSh7IGRlZmF1bHRScGM6IHJwYyB9KVxuICAgICAgb3JhY2xlLmxlZ2FjeS5jb25maWd1cmF0aW9uLmRlZmF1bHRScGMuc2hvdWxkLmJlLmVxdWFsKHJwYylcbiAgICAgIGNvbnN0IGdhczogbnVtYmVyID0gYXdhaXQgb3JhY2xlLmxlZ2FjeS5mZXRjaEdhc1ByaWNlc09uQ2hhaW4oKVxuXG4gICAgICBnYXMuc2hvdWxkLmJlLmEoJ251bWJlcicpXG5cbiAgICAgIGdhcy5zaG91bGQuYmUuYWJvdmUoMSlcbiAgICAgIGdhcy5zaG91bGQubm90LmJlLmVxdWFsKDApXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgcmVtb3ZlIG9yYWNsZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IG9yYWNsZS5sZWdhY3kuZmV0Y2hHYXNQcmljZXNPbkNoYWluKClcbiAgICAgIG9yYWNsZS5sZWdhY3kucmVtb3ZlT25DaGFpbk9yYWNsZSgnY2hhaW5saW5rJylcbiAgICAgIGF3YWl0IG9yYWNsZS5sZWdhY3kuZmV0Y2hHYXNQcmljZXNPbkNoYWluKCkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnQWxsIG9yYWNsZXMgYXJlIGRvd24uIFByb2JhYmx5IGEgbmV0d29yayBlcnJvci4nKVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIGFkZCBvcmFjbGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0b0FkZCA9IG9uQ2hhaW5PcmFjbGVzLmNoYWlubGlua1xuICAgICAgYXdhaXQgb3JhY2xlLmxlZ2FjeS5mZXRjaEdhc1ByaWNlc09uQ2hhaW4oKVxuICAgICAgb3JhY2xlLmxlZ2FjeS5yZW1vdmVPbkNoYWluT3JhY2xlKCdjaGFpbmxpbmsnKVxuXG4gICAgICBhd2FpdCBvcmFjbGUubGVnYWN5LmZldGNoR2FzUHJpY2VzT25DaGFpbigpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ0FsbCBvcmFjbGVzIGFyZSBkb3duLiBQcm9iYWJseSBhIG5ldHdvcmsgZXJyb3IuJylcblxuICAgICAgb3JhY2xlLmxlZ2FjeS5hZGRPbkNoYWluT3JhY2xlKHRvQWRkKVxuICAgICAgY29uc3QgZ2FzOiBudW1iZXIgPSBhd2FpdCBvcmFjbGUubGVnYWN5LmZldGNoR2FzUHJpY2VzT25DaGFpbigpXG5cbiAgICAgIGdhcy5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgIGdhcy5zaG91bGQubm90LmJlLmVxdWFsKDApXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgYWxsIG9uY2hhaW4gb3JhY2xlcyBhcmUgZG93bicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tlcnkuZW5hYmxlKHsgdXNlQ2xlYW5DYWNoZTogdHJ1ZSwgd2Fybk9uVW5yZWdpc3RlcmVkOiBmYWxzZSB9KVxuICAgICAgY29uc3QgeyBHYXNQcmljZU9yYWNsZSB9ID0gcmVxdWlyZSgnLi4vaW5kZXgnKVxuXG4gICAgICBvcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoKVxuICAgICAgYXdhaXQgb3JhY2xlLmxlZ2FjeS5mZXRjaEdhc1ByaWNlc09uQ2hhaW4oKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdBbGwgb3JhY2xlcyBhcmUgZG93bi4gUHJvYmFibHkgYSBuZXR3b3JrIGVycm9yLicpXG4gICAgICBtb2NrZXJ5LmRpc2FibGUoKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ2ZldGNoR2FzUHJpY2VGcm9tUnBjJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgd29yaycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGdhczogbnVtYmVyID0gYXdhaXQgb3JhY2xlLmxlZ2FjeS5mZXRjaEdhc1ByaWNlRnJvbVJwYygpXG4gICAgICBnYXMuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICBnYXMuc2hvdWxkLmJlLmFib3ZlKDEpXG4gICAgICBnYXMuc2hvdWxkLm5vdC5iZS5lcXVhbCgwKVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBjdXN0b20gcnBjJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcnBjID0gSU5KRUNURURfUlBDX1VSTFxuICAgICAgY29uc3Qgb3JhY2xlID0gbmV3IEdhc1ByaWNlT3JhY2xlKHsgZGVmYXVsdFJwYzogcnBjIH0pXG4gICAgICBvcmFjbGUubGVnYWN5LmNvbmZpZ3VyYXRpb24uZGVmYXVsdFJwYy5zaG91bGQuYmUuZXF1YWwocnBjKVxuICAgICAgY29uc3QgZ2FzOiBudW1iZXIgPSBhd2FpdCBvcmFjbGUubGVnYWN5LmZldGNoR2FzUHJpY2VGcm9tUnBjKClcblxuICAgICAgZ2FzLnNob3VsZC5iZS5hKCdudW1iZXInKVxuXG4gICAgICBnYXMuc2hvdWxkLmJlLmFib3ZlKDEpXG4gICAgICBnYXMuc2hvdWxkLm5vdC5iZS5lcXVhbCgwKVxuICAgIH0pXG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGlmIGRlZmF1bHQgcnBjIGlzIGRvd24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2NrZXJ5LmVuYWJsZSh7IHVzZUNsZWFuQ2FjaGU6IHRydWUsIHdhcm5PblVucmVnaXN0ZXJlZDogZmFsc2UgfSlcbiAgICAgIGNvbnN0IHsgR2FzUHJpY2VPcmFjbGUgfSA9IHJlcXVpcmUoJy4uL2luZGV4JylcblxuICAgICAgb3JhY2xlID0gbmV3IEdhc1ByaWNlT3JhY2xlKClcbiAgICAgIGF3YWl0IG9yYWNsZS5sZWdhY3kuZmV0Y2hHYXNQcmljZUZyb21ScGMoKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdEZWZhdWx0IFJQQyBpcyBkb3duLiBQcm9iYWJseSBhIG5ldHdvcmsgZXJyb3IuJylcbiAgICAgIG1vY2tlcnkuZGlzYWJsZSgpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnbGVnYWN5IGdhc1ByaWNlJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgd29yaycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGdhcyA9IChhd2FpdCBvcmFjbGUuZ2FzUHJpY2VzKHsgaXNMZWdhY3k6IHRydWUgfSkpIGFzIHVua25vd24gYXMgR2FzUHJpY2VcblxuICAgICAgZ2FzLmluc3RhbnQuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICBnYXMuZmFzdC5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgIGdhcy5zdGFuZGFyZC5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgIGdhcy5sb3cuc2hvdWxkLmJlLmEoJ251bWJlcicpXG5cbiAgICAgIGdhcy5pbnN0YW50LnNob3VsZC5iZS5hdC5sZWFzdChnYXMuZmFzdClcbiAgICAgIGdhcy5mYXN0LnNob3VsZC5iZS5hdC5sZWFzdChnYXMuc3RhbmRhcmQpXG4gICAgICBnYXMuc3RhbmRhcmQuc2hvdWxkLmJlLmF0LmxlYXN0KGdhcy5sb3cpXG4gICAgICBnYXMubG93LnNob3VsZC5ub3QuYmUuZXF1YWwoMClcbiAgICB9KVxuXG4gICAgaXQoJ3Nob3VsZCBmYWxsYmFjaycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tlcnkuZW5hYmxlKHsgdXNlQ2xlYW5DYWNoZTogdHJ1ZSwgd2Fybk9uVW5yZWdpc3RlcmVkOiBmYWxzZSB9KVxuICAgICAgY29uc3QgeyBHYXNQcmljZU9yYWNsZSB9ID0gcmVxdWlyZSgnLi4vaW5kZXgnKVxuXG4gICAgICBvcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoKVxuXG4gICAgICBjb25zdCBnYXMgPSAoYXdhaXQgb3JhY2xlLmdhc1ByaWNlcyh7IGlzTGVnYWN5OiB0cnVlIH0pKSBhcyB1bmtub3duIGFzIEdhc1ByaWNlXG5cbiAgICAgIGNvbnN0IHNob3VsZEJlID0gTGVnYWN5R2FzUHJpY2VPcmFjbGUuZ2V0TXVsdGlwbGllZFByaWNlcyhORVRXT1JLU1tDaGFpbklkLk1BSU5ORVRdLmRlZmF1bHRHYXNQcmljZSlcblxuICAgICAgZ2FzLmluc3RhbnQuc2hvdWxkLmJlLmVxdWFsKHNob3VsZEJlLmluc3RhbnQpXG4gICAgICBnYXMuZmFzdC5zaG91bGQuYmUuZXF1YWwoc2hvdWxkQmUuZmFzdClcbiAgICAgIGdhcy5zdGFuZGFyZC5zaG91bGQuYmUuZXF1YWwoc2hvdWxkQmUuc3RhbmRhcmQpXG4gICAgICBnYXMubG93LnNob3VsZC5iZS5lcXVhbChzaG91bGRCZS5sb3cpXG5cbiAgICAgIG1vY2tlcnkuZGlzYWJsZSgpXG4gICAgfSlcblxuICAgIGl0KCdzaG91bGQgZmFsbGJhY2sgdG8gc2V0IHZhbHVlcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tlcnkuZW5hYmxlKHsgdXNlQ2xlYW5DYWNoZTogdHJ1ZSwgd2Fybk9uVW5yZWdpc3RlcmVkOiBmYWxzZSB9KVxuICAgICAgY29uc3QgeyBHYXNQcmljZU9yYWNsZSB9ID0gcmVxdWlyZSgnLi4vaW5kZXgnKVxuICAgICAgb3JhY2xlID0gbmV3IEdhc1ByaWNlT3JhY2xlKClcblxuICAgICAgY29uc3QgZmFsbGJhY2tHYXNQcmljZXMgPSB7XG4gICAgICAgIGdhc1ByaWNlczoge1xuICAgICAgICAgIGluc3RhbnQ6IDUwLFxuICAgICAgICAgIGZhc3Q6IDIxLFxuICAgICAgICAgIHN0YW5kYXJkOiAxMCxcbiAgICAgICAgICBsb3c6IDMsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgICBjb25zdCBnYXMgPSAoYXdhaXQgb3JhY2xlLmdhc1ByaWNlcyh7IGlzTGVnYWN5OiB0cnVlLCBmYWxsYmFja0dhc1ByaWNlcyB9KSkgYXMgdW5rbm93biBhcyBHYXNQcmljZVxuXG4gICAgICBnYXMuaW5zdGFudC5zaG91bGQuYmUuZXF1YWwoZmFsbGJhY2tHYXNQcmljZXMuZ2FzUHJpY2VzLmluc3RhbnQpXG4gICAgICBnYXMuZmFzdC5zaG91bGQuYmUuZXF1YWwoZmFsbGJhY2tHYXNQcmljZXMuZ2FzUHJpY2VzLmZhc3QpXG4gICAgICBnYXMuc3RhbmRhcmQuc2hvdWxkLmJlLmVxdWFsKGZhbGxiYWNrR2FzUHJpY2VzLmdhc1ByaWNlcy5zdGFuZGFyZClcbiAgICAgIGdhcy5sb3cuc2hvdWxkLmJlLmVxdWFsKGZhbGxiYWNrR2FzUHJpY2VzLmdhc1ByaWNlcy5sb3cpXG5cbiAgICAgIG1vY2tlcnkuZGlzYWJsZSgpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnbWVkaWFuJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgd29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGdhczEgPSB7IGluc3RhbnQ6IDEwMCwgZmFzdDogMTAwLCBzdGFuZGFyZDogMTAwLCBsb3c6IDEwMCB9XG4gICAgICBjb25zdCBnYXMyID0geyBpbnN0YW50OiA5MCwgZmFzdDogOTAsIHN0YW5kYXJkOiA5MCwgbG93OiA5MCB9XG4gICAgICBjb25zdCBnYXMzID0geyBpbnN0YW50OiA3MCwgZmFzdDogNzAsIHN0YW5kYXJkOiA3MCwgbG93OiA3MCB9XG4gICAgICBjb25zdCBnYXM0ID0geyBpbnN0YW50OiAxMTAuMSwgZmFzdDogMTEwLjEsIHN0YW5kYXJkOiAxMTAuMSwgbG93OiAxMTAuMSB9XG5cbiAgICAgIGxldCBnYXM6IEdhc1ByaWNlID0gTGVnYWN5R2FzUHJpY2VPcmFjbGUuZ2V0TWVkaWFuR2FzUHJpY2UoW2dhczEsIGdhczIsIGdhczNdKVxuXG4gICAgICBnYXMuaW5zdGFudC5zaG91bGQuYmUuYSgnbnVtYmVyJylcbiAgICAgIGdhcy5mYXN0LnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgZ2FzLnN0YW5kYXJkLnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgZ2FzLmxvdy5zaG91bGQuYmUuYSgnbnVtYmVyJylcblxuICAgICAgZ2FzLmluc3RhbnQuc2hvdWxkLmJlLmVxKDkwKVxuICAgICAgZ2FzLmZhc3Quc2hvdWxkLmJlLmVxKDkwKVxuICAgICAgZ2FzLnN0YW5kYXJkLnNob3VsZC5iZS5lcSg5MClcbiAgICAgIGdhcy5sb3cuc2hvdWxkLmJlLmVxKDkwKVxuXG4gICAgICBnYXMgPSBMZWdhY3lHYXNQcmljZU9yYWNsZS5nZXRNZWRpYW5HYXNQcmljZShbZ2FzMSwgZ2FzMiwgZ2FzMywgZ2FzNF0pXG5cbiAgICAgIGdhcy5pbnN0YW50LnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgZ2FzLmZhc3Quc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICBnYXMuc3RhbmRhcmQuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICBnYXMubG93LnNob3VsZC5iZS5hKCdudW1iZXInKVxuXG4gICAgICBnYXMuaW5zdGFudC5zaG91bGQuYmUuZXEoOTUpXG4gICAgICBnYXMuZmFzdC5zaG91bGQuYmUuZXEoOTUpXG4gICAgICBnYXMuc3RhbmRhcmQuc2hvdWxkLmJlLmVxKDk1KVxuICAgICAgZ2FzLmxvdy5zaG91bGQuYmUuZXEoOTUpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnZmV0Y2hNZWRpYW5HYXNQcmljZU9mZkNoYWluJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgd29yaycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGdhczogR2FzUHJpY2UgPSBhd2FpdCBvcmFjbGUubGVnYWN5LmZldGNoTWVkaWFuR2FzUHJpY2VPZmZDaGFpbigpXG5cbiAgICAgIGdhcy5pbnN0YW50LnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgZ2FzLmZhc3Quc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICBnYXMuc3RhbmRhcmQuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICBnYXMubG93LnNob3VsZC5iZS5hKCdudW1iZXInKVxuXG4gICAgICBnYXMuaW5zdGFudC5zaG91bGQuYmUuYXQubGVhc3QoZ2FzLmZhc3QpXG4gICAgICBnYXMuZmFzdC5zaG91bGQuYmUuYXQubGVhc3QoZ2FzLnN0YW5kYXJkKVxuICAgICAgZ2FzLnN0YW5kYXJkLnNob3VsZC5iZS5hdC5sZWFzdChnYXMubG93KVxuICAgICAgZ2FzLmxvdy5zaG91bGQubm90LmJlLmVxdWFsKDApXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnbm9ybWFsaXplIHJlc3VsdCB2YWx1ZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgd3JvbmdEZWNpbWFsc0dhcyA9IHtcbiAgICAgIGdhc1ByaWNlczoge1xuICAgICAgICBpbnN0YW50OiAxLjEsXG4gICAgICAgIGZhc3Q6IDIuMTIzNDU2Nzg5MDEsXG4gICAgICAgIHN0YW5kYXJkOiAzLjEyMzQ1Njc4OTAxLFxuICAgICAgICBsb3c6IDMuMTIzNDU2NzksXG4gICAgICB9LFxuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrRGVjaW1hbHMgPSAoZ2FzOiBHYXNQcmljZSkgPT4ge1xuICAgICAgY29uc3QgZ2FzUHJpY2VzOiBudW1iZXJbXSA9IE9iamVjdC52YWx1ZXMoZ2FzKVxuXG4gICAgICBmb3IgKGNvbnN0IGdhcyBvZiBnYXNQcmljZXMpIHtcbiAgICAgICAgbmV3IEJpZ051bWJlcihnYXMpLmRwKCkuc2hvdWxkLmJlLmF0Lm1vc3QoOSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpdCgnZGVmYXVsdCBmYWxsYmFjayBzaG91bGQgYmUgbm9ybWFsaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tlcnkuZW5hYmxlKHsgdXNlQ2xlYW5DYWNoZTogdHJ1ZSwgd2Fybk9uVW5yZWdpc3RlcmVkOiBmYWxzZSB9KVxuXG4gICAgICBvcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoeyBmYWxsYmFja0dhc1ByaWNlczogd3JvbmdEZWNpbWFsc0dhcyB9KVxuXG4gICAgICBjaGVja0RlY2ltYWxzKG9yYWNsZS5sZWdhY3kuY29uZmlndXJhdGlvbi5mYWxsYmFja0dhc1ByaWNlcylcblxuICAgICAgbW9ja2VyeS5kaXNhYmxlKClcbiAgICB9KVxuXG4gICAgaXQoJ2ZhbGxiYWNrIHNob3VsZCBiZSBub3JtYWxpemVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbW9ja2VyeS5lbmFibGUoeyB1c2VDbGVhbkNhY2hlOiB0cnVlLCB3YXJuT25VbnJlZ2lzdGVyZWQ6IGZhbHNlIH0pXG4gICAgICBjb25zdCB7IEdhc1ByaWNlT3JhY2xlIH0gPSByZXF1aXJlKCcuLi9pbmRleCcpXG5cbiAgICAgIG9yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSgpXG5cbiAgICAgIGNvbnN0IGdhcyA9IGF3YWl0IG9yYWNsZS5sZWdhY3kuZ2FzUHJpY2VzKHdyb25nRGVjaW1hbHNHYXMuZ2FzUHJpY2VzKVxuXG4gICAgICBjaGVja0RlY2ltYWxzKGdhcylcbiAgICAgIG1vY2tlcnkuZGlzYWJsZSgpXG4gICAgfSlcblxuICAgIGl0KCdycGMgZmFsbGJhY2sgc2hvdWxkIGJlIG5vcm1hbGl6ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBvcmFjbGUgPSBuZXcgR2FzUHJpY2VPcmFjbGUoeyBjaGFpbklkOiA0MjE2MSwgZGVmYXVsdFJwYzogJ2h0dHBzOi8vYXJiMS5hcmJpdHJ1bS5pby9ycGMnIH0pXG5cbiAgICAgIGNvbnN0IGdhcyA9IGF3YWl0IG9yYWNsZS5sZWdhY3kuZ2FzUHJpY2VzKClcblxuICAgICAgY2hlY2tEZWNpbWFscyhnYXMpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnYXNrT3JhY2xlJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNoYWlucyA9IE9iamVjdC5rZXlzKE5FVFdPUktTKS5tYXAoKGlkKSA9PiBOdW1iZXIoaWQpKVxuXG4gICAgY2hhaW5zLmZvckVhY2goKGNoYWluSWQpID0+IHtcbiAgICAgIGRlc2NyaWJlKGBhbGwgJHtDaGFpbklkW2NoYWluSWRdfSBvcmFjbGVzIHNob3VsZCBhbnN3ZXJgLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9yYWNsZSA9IG5ldyBHYXNQcmljZU9yYWNsZSh7IGNoYWluSWQgfSlcbiAgICAgICAgOyh7IG9mZkNoYWluT3JhY2xlcyB9ID0gb3JhY2xlLmxlZ2FjeSlcblxuICAgICAgICBmb3IgKGNvbnN0IG8gb2YgT2JqZWN0LnZhbHVlcyhvZmZDaGFpbk9yYWNsZXMpIGFzIE9mZkNoYWluT3JhY2xlW10pIHtcbiAgICAgICAgICBpdChgY2hlY2sgJHtvLm5hbWV9YCwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgZ2FzOiBHYXNQcmljZSA9IGF3YWl0IG9yYWNsZS5sZWdhY3kuYXNrT3JhY2xlKG8pXG5cbiAgICAgICAgICAgICAgZ2FzLmluc3RhbnQuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICAgICAgICAgIGdhcy5mYXN0LnNob3VsZC5iZS5hKCdudW1iZXInKVxuICAgICAgICAgICAgICBnYXMuc3RhbmRhcmQuc2hvdWxkLmJlLmEoJ251bWJlcicpXG4gICAgICAgICAgICAgIGdhcy5sb3cuc2hvdWxkLmJlLmEoJ251bWJlcicpXG5cbiAgICAgICAgICAgICAgZ2FzLmluc3RhbnQuc2hvdWxkLmJlLmF0LmxlYXN0KGdhcy5mYXN0KVxuICAgICAgICAgICAgICBnYXMuZmFzdC5zaG91bGQuYmUuYXQubGVhc3QoZ2FzLnN0YW5kYXJkKVxuICAgICAgICAgICAgICBnYXMuc3RhbmRhcmQuc2hvdWxkLmJlLmF0LmxlYXN0KGdhcy5sb3cpXG4gICAgICAgICAgICAgIGdhcy5sb3cuc2hvdWxkLm5vdC5iZS5lcXVhbCgwKVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gZ2V0IGRhdGEgZnJvbSAke28ubmFtZX0gb3JhY2xlYClcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufSlcblxuYWZ0ZXIoJ2FmdGVyJywgZnVuY3Rpb24gKCkge1xuICBhZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgbW9ja2VyeS5kaXNhYmxlKClcbiAgICBtb2NrZXJ5LmRlcmVnaXN0ZXJNb2NrKCdub2RlLWZldGNoJylcbiAgfSlcbn0pXG4iXSwibWFwcGluZ3MiOiI7Ozs7QUFHQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7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