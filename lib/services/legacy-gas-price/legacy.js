"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyGasPriceOracle = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _config = require("../../config");

var _constants = require("../../constants");

var _constants2 = require("./constants");

var _excluded = ["fetcher"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var LegacyGasPriceOracle = /*#__PURE__*/function () {
  function LegacyGasPriceOracle(_ref) {
    var _NETWORKS$this$config;

    var fetcher = _ref.fetcher,
        options = _objectWithoutProperties(_ref, _excluded);

    _classCallCheck(this, LegacyGasPriceOracle);

    _defineProperty(this, "lastGasPrice", void 0);

    _defineProperty(this, "onChainOracles", {});

    _defineProperty(this, "offChainOracles", {});

    _defineProperty(this, "configuration", {
      chainId: _config.ChainId.MAINNET,
      timeout: _constants.DEFAULT_TIMEOUT,
      defaultRpc: _config.NETWORKS[_config.ChainId.MAINNET].rpcUrl,
      fallbackGasPrices: LegacyGasPriceOracle.getMultipliedPrices(_config.NETWORKS[_config.ChainId.MAINNET].defaultGasPrice)
    });

    _defineProperty(this, "fetcher", void 0);

    this.fetcher = fetcher;

    if (options) {
      this.configuration = _objectSpread(_objectSpread({}, this.configuration), options);
    }

    var fallbackGasPrices = this.configuration.fallbackGasPrices || LegacyGasPriceOracle.getMultipliedPrices(_config.NETWORKS[_config.ChainId.MAINNET].defaultGasPrice);
    this.configuration.fallbackGasPrices = LegacyGasPriceOracle.normalize(fallbackGasPrices);
    var network = (_NETWORKS$this$config = _config.NETWORKS[this.configuration.chainId]) === null || _NETWORKS$this$config === void 0 ? void 0 : _NETWORKS$this$config.oracles;

    if (network) {
      this.offChainOracles = _objectSpread({}, network.offChainOracles);
      this.onChainOracles = _objectSpread({}, network.onChainOracles);
    }
  }

  _createClass(LegacyGasPriceOracle, [{
    key: "addOffChainOracle",
    value: function addOffChainOracle(oracle) {
      this.offChainOracles[oracle.name] = oracle;
    }
  }, {
    key: "addOnChainOracle",
    value: function addOnChainOracle(oracle) {
      this.onChainOracles[oracle.name] = oracle;
    }
  }, {
    key: "removeOnChainOracle",
    value: function removeOnChainOracle(name) {
      delete this.onChainOracles[name];
    }
  }, {
    key: "removeOffChainOracle",
    value: function removeOffChainOracle(name) {
      delete this.offChainOracles[name];
    }
  }, {
    key: "fetchGasPricesOnChain",
    value: function () {
      var _fetchGasPricesOnChain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _i, _Object$values, oracle, name, callData, contract, denominator, rpc, response;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _i = 0, _Object$values = Object.values(this.onChainOracles);

              case 1:
                if (!(_i < _Object$values.length)) {
                  _context.next = 19;
                  break;
                }

                oracle = _Object$values[_i];
                name = oracle.name, callData = oracle.callData, contract = oracle.contract, denominator = oracle.denominator, rpc = oracle.rpc;
                _context.prev = 4;
                _context.next = 7;
                return this.fetcher.makeRpcCall({
                  rpc: rpc,
                  method: 'eth_call',
                  params: [{
                    data: callData,
                    to: contract
                  }, 'latest']
                });

              case 7:
                response = _context.sent;

                if (!(response.status === 200)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", LegacyGasPriceOracle.getGasPriceFromResponse({
                  denominator: denominator,
                  fetcherName: "".concat(name, " oracle"),
                  response: response.data.result
                }));

              case 10:
                throw new Error("Fetch gasPrice from ".concat(name, " oracle failed. Trying another one..."));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](4);
                console.error(_context.t0.message);

              case 16:
                _i++;
                _context.next = 1;
                break;

              case 19:
                throw new Error('All oracles are down. Probably a network error.');

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 13]]);
      }));

      function fetchGasPricesOnChain() {
        return _fetchGasPricesOnChain.apply(this, arguments);
      }

      return fetchGasPricesOnChain;
    }()
  }, {
    key: "fetchGasPriceFromRpc",
    value: function () {
      var _fetchGasPriceFromRpc = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _yield$this$fetcher$m, status, data;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.fetcher.makeRpcCall({
                  params: [],
                  method: 'eth_gasPrice'
                });

              case 3:
                _yield$this$fetcher$m = _context2.sent;
                status = _yield$this$fetcher$m.status;
                data = _yield$this$fetcher$m.data;

                if (!(status === 200)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", LegacyGasPriceOracle.getGasPriceFromResponse({
                  fetcherName: 'Default RPC',
                  response: data.result
                }));

              case 8:
                throw new Error("Fetch gasPrice from default RPC failed..");

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0.message);
                throw new Error('Default RPC is down. Probably a network error.');

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 11]]);
      }));

      function fetchGasPriceFromRpc() {
        return _fetchGasPriceFromRpc.apply(this, arguments);
      }

      return fetchGasPriceFromRpc;
    }()
  }, {
    key: "fetchGasPricesOffChain",
    value: function () {
      var _fetchGasPricesOffChain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var shouldGetMedian,
            _i2,
            _Object$values2,
            oracle,
            _args3 = arguments;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                shouldGetMedian = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : true;

                if (!shouldGetMedian) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 4;
                return this.fetchMedianGasPriceOffChain();

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 5:
                _i2 = 0, _Object$values2 = Object.values(this.offChainOracles);

              case 6:
                if (!(_i2 < _Object$values2.length)) {
                  _context3.next = 21;
                  break;
                }

                oracle = _Object$values2[_i2];
                _context3.prev = 8;
                _context3.next = 11;
                return this.askOracle(oracle);

              case 11:
                return _context3.abrupt("return", _context3.sent);

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](8);
                console.info("".concat(oracle, " has error - "), _context3.t0.message);
                return _context3.abrupt("continue", 18);

              case 18:
                _i2++;
                _context3.next = 6;
                break;

              case 21:
                throw new Error('All oracles are down. Probably a network error.');

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 14]]);
      }));

      function fetchGasPricesOffChain() {
        return _fetchGasPricesOffChain.apply(this, arguments);
      }

      return fetchGasPricesOffChain;
    }()
  }, {
    key: "fetchMedianGasPriceOffChain",
    value: function () {
      var _fetchMedianGasPriceOffChain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var promises, _iterator, _step, oracle, settledPromises, allGasPrices;

        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                promises = [];
                _iterator = _createForOfIteratorHelper(Object.values(this.offChainOracles));

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    oracle = _step.value;
                    promises.push(this.askOracle(oracle));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context4.next = 5;
                return Promise.allSettled(promises);

              case 5:
                settledPromises = _context4.sent;
                allGasPrices = settledPromises.reduce(function (acc, result) {
                  if (result.status === 'fulfilled') {
                    acc.push(result.value);
                    return acc;
                  }

                  return acc;
                }, []);

                if (!(allGasPrices.length === 0)) {
                  _context4.next = 9;
                  break;
                }

                throw new Error('All oracles are down. Probably a network error.');

              case 9:
                return _context4.abrupt("return", LegacyGasPriceOracle.getMedianGasPrice(allGasPrices));

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchMedianGasPriceOffChain() {
        return _fetchMedianGasPriceOffChain.apply(this, arguments);
      }

      return fetchMedianGasPriceOffChain;
    }()
  }, {
    key: "gasPrices",
    value: function () {
      var _gasPrices = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(fallbackGasPrices) {
        var shouldGetMedian,
            fastGas,
            _fastGas,
            _args5 = arguments;

        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                shouldGetMedian = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : true;

                if (!this.lastGasPrice) {
                  this.lastGasPrice = fallbackGasPrices || this.configuration.fallbackGasPrices;
                }

                if (!(Object.keys(this.offChainOracles).length > 0)) {
                  _context5.next = 13;
                  break;
                }

                _context5.prev = 3;
                _context5.next = 6;
                return this.fetchGasPricesOffChain(shouldGetMedian);

              case 6:
                this.lastGasPrice = _context5.sent;
                return _context5.abrupt("return", this.lastGasPrice);

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](3);
                console.error('Failed to fetch gas prices from offchain oracles...');

              case 13:
                if (!(Object.keys(this.onChainOracles).length > 0)) {
                  _context5.next = 25;
                  break;
                }

                _context5.prev = 14;
                _context5.next = 17;
                return this.fetchGasPricesOnChain();

              case 17:
                fastGas = _context5.sent;
                this.lastGasPrice = LegacyGasPriceOracle.getCategorize(fastGas);
                return _context5.abrupt("return", this.lastGasPrice);

              case 22:
                _context5.prev = 22;
                _context5.t1 = _context5["catch"](14);
                console.error('Failed to fetch gas prices from onchain oracles...');

              case 25:
                _context5.prev = 25;
                _context5.next = 28;
                return this.fetchGasPriceFromRpc();

              case 28:
                _fastGas = _context5.sent;
                this.lastGasPrice = LegacyGasPriceOracle.getCategorize(_fastGas);
                return _context5.abrupt("return", this.lastGasPrice);

              case 33:
                _context5.prev = 33;
                _context5.t2 = _context5["catch"](25);
                console.error('Failed to fetch gas prices from default RPC. Last known gas will be returned');

              case 36:
                return _context5.abrupt("return", LegacyGasPriceOracle.normalize(this.lastGasPrice));

              case 37:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 10], [14, 22], [25, 33]]);
      }));

      function gasPrices(_x) {
        return _gasPrices.apply(this, arguments);
      }

      return gasPrices;
    }()
  }, {
    key: "askOracle",
    value: function () {
      var _askOracle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(oracle) {
        var url, name, denominator, lowPropertyName, fastPropertyName, instantPropertyName, standardPropertyName, additionalDataProperty, response, gas, gasPrices;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = oracle.url, name = oracle.name, denominator = oracle.denominator, lowPropertyName = oracle.lowPropertyName, fastPropertyName = oracle.fastPropertyName, instantPropertyName = oracle.instantPropertyName, standardPropertyName = oracle.standardPropertyName, additionalDataProperty = oracle.additionalDataProperty;
                _context6.next = 3;
                return _axios["default"].get(url, {
                  timeout: this.configuration.timeout
                });

              case 3:
                response = _context6.sent;

                if (!(response.status === 200)) {
                  _context6.next = 12;
                  break;
                }

                gas = additionalDataProperty ? response.data[additionalDataProperty] : response.data;

                if (!(Number(gas[fastPropertyName]) === 0)) {
                  _context6.next = 8;
                  break;
                }

                throw new Error("".concat(name, " oracle provides corrupted values"));

              case 8:
                gasPrices = {
                  instant: parseFloat(gas[instantPropertyName]) / denominator,
                  fast: parseFloat(gas[fastPropertyName]) / denominator,
                  standard: parseFloat(gas[standardPropertyName]) / denominator,
                  low: parseFloat(gas[lowPropertyName]) / denominator
                };
                return _context6.abrupt("return", LegacyGasPriceOracle.normalize(gasPrices));

              case 12:
                throw new Error("Fetch gasPrice from ".concat(name, " oracle failed. Trying another one..."));

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function askOracle(_x2) {
        return _askOracle.apply(this, arguments);
      }

      return askOracle;
    }()
  }], [{
    key: "getMedianGasPrice",
    value: function getMedianGasPrice(gasPrices) {
      var medianGasPrice = _constants2.DEFAULT_GAS_PRICE;
      var results = {
        instant: [],
        fast: [],
        standard: [],
        low: []
      };

      var _iterator2 = _createForOfIteratorHelper(gasPrices),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var gasPrice = _step2.value;
          results.instant.push(gasPrice.instant);
          results.fast.push(gasPrice.fast);
          results.standard.push(gasPrice.standard);
          results.low.push(gasPrice.low);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(Object.keys(medianGasPrice)),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var type = _step3.value;
          var allPrices = results[type].sort(function (a, b) {
            return a - b;
          });

          if (allPrices.length === 1) {
            medianGasPrice[type] = allPrices[0];
            continue;
          } else if (allPrices.length === 0) {
            continue;
          }

          var isEven = allPrices.length % 2 === 0;
          var middle = Math.floor(allPrices.length / 2);
          medianGasPrice[type] = isEven ? (allPrices[middle - 1] + allPrices[middle]) / 2.0 : allPrices[middle];
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return LegacyGasPriceOracle.normalize(medianGasPrice);
    }
  }, {
    key: "getMultipliedPrices",
    value: function getMultipliedPrices(gasPrice) {
      return {
        instant: gasPrice * _constants2.MULTIPLIERS.instant,
        fast: gasPrice * _constants2.MULTIPLIERS.fast,
        standard: gasPrice * _constants2.MULTIPLIERS.standard,
        low: gasPrice * _constants2.MULTIPLIERS.low
      };
    }
  }, {
    key: "normalize",
    value: function normalize(_gas) {
      var format = {
        groupSeparator: '',
        decimalSeparator: '.'
      };

      var gas = _objectSpread({}, _gas);

      var _iterator4 = _createForOfIteratorHelper(Object.keys(gas)),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var type = _step4.value;
          gas[type] = Number(new _bignumber["default"](gas[type]).toFormat(_constants.GWEI_PRECISION, format));
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return gas;
    }
  }, {
    key: "getCategorize",
    value: function getCategorize(gasPrice) {
      return LegacyGasPriceOracle.normalize(LegacyGasPriceOracle.getMultipliedPrices(gasPrice));
    }
  }, {
    key: "getGasPriceFromResponse",
    value: function getGasPriceFromResponse(payload) {
      var response = payload.response,
          fetcherName = payload.fetcherName,
          _payload$denominator = payload.denominator,
          denominator = _payload$denominator === void 0 ? _constants.GWEI : _payload$denominator;
      var fastGasPrice = new _bignumber["default"](response);

      if (fastGasPrice.isZero()) {
        throw new Error("".concat(fetcherName, " provides corrupted values"));
      }

      fastGasPrice = fastGasPrice.div(denominator);
      return fastGasPrice.toNumber();
    }
  }]);

  return LegacyGasPriceOracle;
}();

exports.LegacyGasPriceOracle = LegacyGasPriceOracle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMZWdhY3lHYXNQcmljZU9yYWNsZSIsImZldGNoZXIiLCJvcHRpb25zIiwiY2hhaW5JZCIsIkNoYWluSWQiLCJNQUlOTkVUIiwidGltZW91dCIsIkRFRkFVTFRfVElNRU9VVCIsImRlZmF1bHRScGMiLCJORVRXT1JLUyIsInJwY1VybCIsImZhbGxiYWNrR2FzUHJpY2VzIiwiZ2V0TXVsdGlwbGllZFByaWNlcyIsImRlZmF1bHRHYXNQcmljZSIsImNvbmZpZ3VyYXRpb24iLCJub3JtYWxpemUiLCJuZXR3b3JrIiwib3JhY2xlcyIsIm9mZkNoYWluT3JhY2xlcyIsIm9uQ2hhaW5PcmFjbGVzIiwib3JhY2xlIiwibmFtZSIsIk9iamVjdCIsInZhbHVlcyIsImNhbGxEYXRhIiwiY29udHJhY3QiLCJkZW5vbWluYXRvciIsInJwYyIsIm1ha2VScGNDYWxsIiwibWV0aG9kIiwicGFyYW1zIiwiZGF0YSIsInRvIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJnZXRHYXNQcmljZUZyb21SZXNwb25zZSIsImZldGNoZXJOYW1lIiwicmVzdWx0IiwiRXJyb3IiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwic2hvdWxkR2V0TWVkaWFuIiwiZmV0Y2hNZWRpYW5HYXNQcmljZU9mZkNoYWluIiwiYXNrT3JhY2xlIiwiaW5mbyIsInByb21pc2VzIiwicHVzaCIsIlByb21pc2UiLCJhbGxTZXR0bGVkIiwic2V0dGxlZFByb21pc2VzIiwiYWxsR2FzUHJpY2VzIiwicmVkdWNlIiwiYWNjIiwidmFsdWUiLCJsZW5ndGgiLCJnZXRNZWRpYW5HYXNQcmljZSIsImxhc3RHYXNQcmljZSIsImtleXMiLCJmZXRjaEdhc1ByaWNlc09mZkNoYWluIiwiZmV0Y2hHYXNQcmljZXNPbkNoYWluIiwiZmFzdEdhcyIsImdldENhdGVnb3JpemUiLCJmZXRjaEdhc1ByaWNlRnJvbVJwYyIsInVybCIsImxvd1Byb3BlcnR5TmFtZSIsImZhc3RQcm9wZXJ0eU5hbWUiLCJpbnN0YW50UHJvcGVydHlOYW1lIiwic3RhbmRhcmRQcm9wZXJ0eU5hbWUiLCJhZGRpdGlvbmFsRGF0YVByb3BlcnR5IiwiYXhpb3MiLCJnZXQiLCJnYXMiLCJOdW1iZXIiLCJnYXNQcmljZXMiLCJpbnN0YW50IiwicGFyc2VGbG9hdCIsImZhc3QiLCJzdGFuZGFyZCIsImxvdyIsIm1lZGlhbkdhc1ByaWNlIiwiREVGQVVMVF9HQVNfUFJJQ0UiLCJyZXN1bHRzIiwiZ2FzUHJpY2UiLCJ0eXBlIiwiYWxsUHJpY2VzIiwic29ydCIsImEiLCJiIiwiaXNFdmVuIiwibWlkZGxlIiwiTWF0aCIsImZsb29yIiwiTVVMVElQTElFUlMiLCJfZ2FzIiwiZm9ybWF0IiwiZ3JvdXBTZXBhcmF0b3IiLCJkZWNpbWFsU2VwYXJhdG9yIiwiQmlnTnVtYmVyIiwidG9Gb3JtYXQiLCJHV0VJX1BSRUNJU0lPTiIsInBheWxvYWQiLCJHV0VJIiwiZmFzdEdhc1ByaWNlIiwiaXNaZXJvIiwiZGl2IiwidG9OdW1iZXIiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvbGVnYWN5LWdhcy1wcmljZS9sZWdhY3kudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IEJpZ051bWJlciBmcm9tICdiaWdudW1iZXIuanMnXG5cbmltcG9ydCB7XG4gIEdhc1ByaWNlLFxuICBHYXNQcmljZUtleSxcbiAgTGVnYWN5T3JhY2xlLFxuICBPbkNoYWluT3JhY2xlLFxuICBPZmZDaGFpbk9yYWNsZSxcbiAgTGVnYWN5T3B0aW9ucyxcbiAgT25DaGFpbk9yYWNsZXMsXG4gIE9mZkNoYWluT3JhY2xlcyxcbiAgTGVnYWN5T3B0aW9uc1BheWxvYWQsXG4gIEdldEdhc1ByaWNlRnJvbVJlc3BJbnB1dCxcbn0gZnJvbSAnLi90eXBlcydcblxuaW1wb3J0IHsgUnBjRmV0Y2hlciB9IGZyb20gJ0Avc2VydmljZXMnXG5pbXBvcnQgeyBDaGFpbklkLCBORVRXT1JLUyB9IGZyb20gJ0AvY29uZmlnJ1xuaW1wb3J0IHsgR1dFSSwgREVGQVVMVF9USU1FT1VULCBHV0VJX1BSRUNJU0lPTiB9IGZyb20gJ0AvY29uc3RhbnRzJ1xuXG5pbXBvcnQgeyBNVUxUSVBMSUVSUywgREVGQVVMVF9HQVNfUFJJQ0UgfSBmcm9tICcuL2NvbnN0YW50cydcblxuZXhwb3J0IGNsYXNzIExlZ2FjeUdhc1ByaWNlT3JhY2xlIGltcGxlbWVudHMgTGVnYWN5T3JhY2xlIHtcbiAgc3RhdGljIGdldE1lZGlhbkdhc1ByaWNlKGdhc1ByaWNlczogR2FzUHJpY2VbXSk6IEdhc1ByaWNlIHtcbiAgICBjb25zdCBtZWRpYW5HYXNQcmljZTogR2FzUHJpY2UgPSBERUZBVUxUX0dBU19QUklDRVxuXG4gICAgY29uc3QgcmVzdWx0czogUmVjb3JkPEdhc1ByaWNlS2V5LCBudW1iZXJbXT4gPSB7XG4gICAgICBpbnN0YW50OiBbXSxcbiAgICAgIGZhc3Q6IFtdLFxuICAgICAgc3RhbmRhcmQ6IFtdLFxuICAgICAgbG93OiBbXSxcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGdhc1ByaWNlIG9mIGdhc1ByaWNlcykge1xuICAgICAgcmVzdWx0cy5pbnN0YW50LnB1c2goZ2FzUHJpY2UuaW5zdGFudClcbiAgICAgIHJlc3VsdHMuZmFzdC5wdXNoKGdhc1ByaWNlLmZhc3QpXG4gICAgICByZXN1bHRzLnN0YW5kYXJkLnB1c2goZ2FzUHJpY2Uuc3RhbmRhcmQpXG4gICAgICByZXN1bHRzLmxvdy5wdXNoKGdhc1ByaWNlLmxvdylcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHR5cGUgb2YgT2JqZWN0LmtleXMobWVkaWFuR2FzUHJpY2UpIGFzIChrZXlvZiBHYXNQcmljZSlbXSkge1xuICAgICAgY29uc3QgYWxsUHJpY2VzID0gcmVzdWx0c1t0eXBlXS5zb3J0KChhLCBiKSA9PiBhIC0gYilcbiAgICAgIGlmIChhbGxQcmljZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1lZGlhbkdhc1ByaWNlW3R5cGVdID0gYWxsUHJpY2VzWzBdXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2UgaWYgKGFsbFByaWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzRXZlbiA9IGFsbFByaWNlcy5sZW5ndGggJSAyID09PSAwXG4gICAgICBjb25zdCBtaWRkbGUgPSBNYXRoLmZsb29yKGFsbFByaWNlcy5sZW5ndGggLyAyKVxuICAgICAgbWVkaWFuR2FzUHJpY2VbdHlwZV0gPSBpc0V2ZW4gPyAoYWxsUHJpY2VzW21pZGRsZSAtIDFdICsgYWxsUHJpY2VzW21pZGRsZV0pIC8gMi4wIDogYWxsUHJpY2VzW21pZGRsZV1cbiAgICB9XG5cbiAgICByZXR1cm4gTGVnYWN5R2FzUHJpY2VPcmFjbGUubm9ybWFsaXplKG1lZGlhbkdhc1ByaWNlKVxuICB9XG5cbiAgc3RhdGljIGdldE11bHRpcGxpZWRQcmljZXMoZ2FzUHJpY2U6IG51bWJlcik6IEdhc1ByaWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5zdGFudDogZ2FzUHJpY2UgKiBNVUxUSVBMSUVSUy5pbnN0YW50LFxuICAgICAgZmFzdDogZ2FzUHJpY2UgKiBNVUxUSVBMSUVSUy5mYXN0LFxuICAgICAgc3RhbmRhcmQ6IGdhc1ByaWNlICogTVVMVElQTElFUlMuc3RhbmRhcmQsXG4gICAgICBsb3c6IGdhc1ByaWNlICogTVVMVElQTElFUlMubG93LFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBub3JtYWxpemUoX2dhczogR2FzUHJpY2UpOiBHYXNQcmljZSB7XG4gICAgY29uc3QgZm9ybWF0ID0ge1xuICAgICAgZ3JvdXBTZXBhcmF0b3I6ICcnLFxuICAgICAgZGVjaW1hbFNlcGFyYXRvcjogJy4nLFxuICAgIH1cblxuICAgIGNvbnN0IGdhczogR2FzUHJpY2UgPSB7IC4uLl9nYXMgfVxuICAgIGZvciAoY29uc3QgdHlwZSBvZiBPYmplY3Qua2V5cyhnYXMpIGFzIChrZXlvZiBHYXNQcmljZSlbXSkge1xuICAgICAgZ2FzW3R5cGVdID0gTnVtYmVyKG5ldyBCaWdOdW1iZXIoZ2FzW3R5cGVdKS50b0Zvcm1hdChHV0VJX1BSRUNJU0lPTiwgZm9ybWF0KSlcbiAgICB9XG5cbiAgICByZXR1cm4gZ2FzXG4gIH1cblxuICBzdGF0aWMgZ2V0Q2F0ZWdvcml6ZShnYXNQcmljZTogbnVtYmVyKTogR2FzUHJpY2Uge1xuICAgIHJldHVybiBMZWdhY3lHYXNQcmljZU9yYWNsZS5ub3JtYWxpemUoTGVnYWN5R2FzUHJpY2VPcmFjbGUuZ2V0TXVsdGlwbGllZFByaWNlcyhnYXNQcmljZSkpXG4gIH1cblxuICBzdGF0aWMgZ2V0R2FzUHJpY2VGcm9tUmVzcG9uc2UocGF5bG9hZDogR2V0R2FzUHJpY2VGcm9tUmVzcElucHV0KTogbnVtYmVyIHtcbiAgICBjb25zdCB7IHJlc3BvbnNlLCBmZXRjaGVyTmFtZSwgZGVub21pbmF0b3IgPSBHV0VJIH0gPSBwYXlsb2FkXG4gICAgbGV0IGZhc3RHYXNQcmljZSA9IG5ldyBCaWdOdW1iZXIocmVzcG9uc2UpXG4gICAgaWYgKGZhc3RHYXNQcmljZS5pc1plcm8oKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2ZldGNoZXJOYW1lfSBwcm92aWRlcyBjb3JydXB0ZWQgdmFsdWVzYClcbiAgICB9XG4gICAgZmFzdEdhc1ByaWNlID0gZmFzdEdhc1ByaWNlLmRpdihkZW5vbWluYXRvcilcbiAgICByZXR1cm4gZmFzdEdhc1ByaWNlLnRvTnVtYmVyKClcbiAgfVxuXG4gIHB1YmxpYyBsYXN0R2FzUHJpY2U6IEdhc1ByaWNlXG4gIHB1YmxpYyBvbkNoYWluT3JhY2xlczogT25DaGFpbk9yYWNsZXMgPSB7fVxuICBwdWJsaWMgb2ZmQ2hhaW5PcmFjbGVzOiBPZmZDaGFpbk9yYWNsZXMgPSB7fVxuICBwdWJsaWMgY29uZmlndXJhdGlvbjogUmVxdWlyZWQ8TGVnYWN5T3B0aW9ucz4gPSB7XG4gICAgY2hhaW5JZDogQ2hhaW5JZC5NQUlOTkVULFxuICAgIHRpbWVvdXQ6IERFRkFVTFRfVElNRU9VVCxcbiAgICBkZWZhdWx0UnBjOiBORVRXT1JLU1tDaGFpbklkLk1BSU5ORVRdLnJwY1VybCxcbiAgICBmYWxsYmFja0dhc1ByaWNlczogTGVnYWN5R2FzUHJpY2VPcmFjbGUuZ2V0TXVsdGlwbGllZFByaWNlcyhORVRXT1JLU1tDaGFpbklkLk1BSU5ORVRdLmRlZmF1bHRHYXNQcmljZSksXG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IGZldGNoZXI6IFJwY0ZldGNoZXJcblxuICBjb25zdHJ1Y3Rvcih7IGZldGNoZXIsIC4uLm9wdGlvbnMgfTogTGVnYWN5T3B0aW9uc1BheWxvYWQpIHtcbiAgICB0aGlzLmZldGNoZXIgPSBmZXRjaGVyXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHsgLi4udGhpcy5jb25maWd1cmF0aW9uLCAuLi5vcHRpb25zIH1cbiAgICB9XG5cbiAgICBjb25zdCBmYWxsYmFja0dhc1ByaWNlcyA9XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uZmFsbGJhY2tHYXNQcmljZXMgfHwgTGVnYWN5R2FzUHJpY2VPcmFjbGUuZ2V0TXVsdGlwbGllZFByaWNlcyhORVRXT1JLU1tDaGFpbklkLk1BSU5ORVRdLmRlZmF1bHRHYXNQcmljZSlcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24uZmFsbGJhY2tHYXNQcmljZXMgPSBMZWdhY3lHYXNQcmljZU9yYWNsZS5ub3JtYWxpemUoZmFsbGJhY2tHYXNQcmljZXMpXG5cbiAgICBjb25zdCBuZXR3b3JrID0gTkVUV09SS1NbdGhpcy5jb25maWd1cmF0aW9uLmNoYWluSWRdPy5vcmFjbGVzXG4gICAgaWYgKG5ldHdvcmspIHtcbiAgICAgIHRoaXMub2ZmQ2hhaW5PcmFjbGVzID0geyAuLi5uZXR3b3JrLm9mZkNoYWluT3JhY2xlcyB9XG4gICAgICB0aGlzLm9uQ2hhaW5PcmFjbGVzID0geyAuLi5uZXR3b3JrLm9uQ2hhaW5PcmFjbGVzIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkT2ZmQ2hhaW5PcmFjbGUob3JhY2xlOiBPZmZDaGFpbk9yYWNsZSk6IHZvaWQge1xuICAgIHRoaXMub2ZmQ2hhaW5PcmFjbGVzW29yYWNsZS5uYW1lXSA9IG9yYWNsZVxuICB9XG5cbiAgcHVibGljIGFkZE9uQ2hhaW5PcmFjbGUob3JhY2xlOiBPbkNoYWluT3JhY2xlKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYWluT3JhY2xlc1tvcmFjbGUubmFtZV0gPSBvcmFjbGVcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVPbkNoYWluT3JhY2xlKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLm9uQ2hhaW5PcmFjbGVzW25hbWVdXG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlT2ZmQ2hhaW5PcmFjbGUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMub2ZmQ2hhaW5PcmFjbGVzW25hbWVdXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZmV0Y2hHYXNQcmljZXNPbkNoYWluKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgZm9yIChjb25zdCBvcmFjbGUgb2YgT2JqZWN0LnZhbHVlcyh0aGlzLm9uQ2hhaW5PcmFjbGVzKSkge1xuICAgICAgY29uc3QgeyBuYW1lLCBjYWxsRGF0YSwgY29udHJhY3QsIGRlbm9taW5hdG9yLCBycGMgfSA9IG9yYWNsZVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2hlci5tYWtlUnBjQ2FsbDx7IHJlc3VsdDogc3RyaW5nIHwgbnVtYmVyIH0+KHtcbiAgICAgICAgICBycGMsXG4gICAgICAgICAgbWV0aG9kOiAnZXRoX2NhbGwnLFxuICAgICAgICAgIHBhcmFtczogW3sgZGF0YTogY2FsbERhdGEsIHRvOiBjb250cmFjdCB9LCAnbGF0ZXN0J10sXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgcmV0dXJuIExlZ2FjeUdhc1ByaWNlT3JhY2xlLmdldEdhc1ByaWNlRnJvbVJlc3BvbnNlKHtcbiAgICAgICAgICAgIGRlbm9taW5hdG9yLFxuICAgICAgICAgICAgZmV0Y2hlck5hbWU6IGAke25hbWV9IG9yYWNsZWAsXG4gICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UuZGF0YS5yZXN1bHQsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZldGNoIGdhc1ByaWNlIGZyb20gJHtuYW1lfSBvcmFjbGUgZmFpbGVkLiBUcnlpbmcgYW5vdGhlciBvbmUuLi5gKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSlcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgb3JhY2xlcyBhcmUgZG93bi4gUHJvYmFibHkgYSBuZXR3b3JrIGVycm9yLicpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZmV0Y2hHYXNQcmljZUZyb21ScGMoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IGF3YWl0IHRoaXMuZmV0Y2hlci5tYWtlUnBjQ2FsbDx7IHJlc3VsdDogc3RyaW5nIHwgbnVtYmVyIH0+KHtcbiAgICAgICAgcGFyYW1zOiBbXSxcbiAgICAgICAgbWV0aG9kOiAnZXRoX2dhc1ByaWNlJyxcbiAgICAgIH0pXG5cbiAgICAgIGlmIChzdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gTGVnYWN5R2FzUHJpY2VPcmFjbGUuZ2V0R2FzUHJpY2VGcm9tUmVzcG9uc2Uoe1xuICAgICAgICAgIGZldGNoZXJOYW1lOiAnRGVmYXVsdCBSUEMnLFxuICAgICAgICAgIHJlc3BvbnNlOiBkYXRhLnJlc3VsdCxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGZXRjaCBnYXNQcmljZSBmcm9tIGRlZmF1bHQgUlBDIGZhaWxlZC4uYClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVmYXVsdCBSUEMgaXMgZG93bi4gUHJvYmFibHkgYSBuZXR3b3JrIGVycm9yLicpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGZldGNoR2FzUHJpY2VzT2ZmQ2hhaW4oc2hvdWxkR2V0TWVkaWFuID0gdHJ1ZSk6IFByb21pc2U8R2FzUHJpY2U+IHtcbiAgICBpZiAoc2hvdWxkR2V0TWVkaWFuKSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5mZXRjaE1lZGlhbkdhc1ByaWNlT2ZmQ2hhaW4oKVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qgb3JhY2xlIG9mIE9iamVjdC52YWx1ZXModGhpcy5vZmZDaGFpbk9yYWNsZXMpKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hc2tPcmFjbGUob3JhY2xlKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmluZm8oYCR7b3JhY2xlfSBoYXMgZXJyb3IgLSBgLCBlLm1lc3NhZ2UpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignQWxsIG9yYWNsZXMgYXJlIGRvd24uIFByb2JhYmx5IGEgbmV0d29yayBlcnJvci4nKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGZldGNoTWVkaWFuR2FzUHJpY2VPZmZDaGFpbigpOiBQcm9taXNlPEdhc1ByaWNlPiB7XG4gICAgY29uc3QgcHJvbWlzZXM6IFByb21pc2U8R2FzUHJpY2U+W10gPSBbXVxuXG4gICAgZm9yIChjb25zdCBvcmFjbGUgb2YgT2JqZWN0LnZhbHVlcyh0aGlzLm9mZkNoYWluT3JhY2xlcykgYXMgT2ZmQ2hhaW5PcmFjbGVbXSkge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmFza09yYWNsZShvcmFjbGUpKVxuICAgIH1cblxuICAgIGNvbnN0IHNldHRsZWRQcm9taXNlcyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChwcm9taXNlcylcblxuICAgIGNvbnN0IGFsbEdhc1ByaWNlcyA9IHNldHRsZWRQcm9taXNlcy5yZWR1Y2UoKGFjYzogR2FzUHJpY2VbXSwgcmVzdWx0KSA9PiB7XG4gICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgYWNjLnB1c2gocmVzdWx0LnZhbHVlKVxuICAgICAgICByZXR1cm4gYWNjXG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgW10pXG5cbiAgICBpZiAoYWxsR2FzUHJpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgb3JhY2xlcyBhcmUgZG93bi4gUHJvYmFibHkgYSBuZXR3b3JrIGVycm9yLicpXG4gICAgfVxuXG4gICAgcmV0dXJuIExlZ2FjeUdhc1ByaWNlT3JhY2xlLmdldE1lZGlhbkdhc1ByaWNlKGFsbEdhc1ByaWNlcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnYXNQcmljZXMoZmFsbGJhY2tHYXNQcmljZXM/OiBHYXNQcmljZSwgc2hvdWxkR2V0TWVkaWFuID0gdHJ1ZSk6IFByb21pc2U8R2FzUHJpY2U+IHtcbiAgICBpZiAoIXRoaXMubGFzdEdhc1ByaWNlKSB7XG4gICAgICB0aGlzLmxhc3RHYXNQcmljZSA9IGZhbGxiYWNrR2FzUHJpY2VzIHx8IHRoaXMuY29uZmlndXJhdGlvbi5mYWxsYmFja0dhc1ByaWNlc1xuICAgIH1cblxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLm9mZkNoYWluT3JhY2xlcykubGVuZ3RoID4gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5sYXN0R2FzUHJpY2UgPSBhd2FpdCB0aGlzLmZldGNoR2FzUHJpY2VzT2ZmQ2hhaW4oc2hvdWxkR2V0TWVkaWFuKVxuICAgICAgICByZXR1cm4gdGhpcy5sYXN0R2FzUHJpY2VcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIGdhcyBwcmljZXMgZnJvbSBvZmZjaGFpbiBvcmFjbGVzLi4uJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5vbkNoYWluT3JhY2xlcykubGVuZ3RoID4gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmFzdEdhcyA9IGF3YWl0IHRoaXMuZmV0Y2hHYXNQcmljZXNPbkNoYWluKClcbiAgICAgICAgdGhpcy5sYXN0R2FzUHJpY2UgPSBMZWdhY3lHYXNQcmljZU9yYWNsZS5nZXRDYXRlZ29yaXplKGZhc3RHYXMpXG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RHYXNQcmljZVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggZ2FzIHByaWNlcyBmcm9tIG9uY2hhaW4gb3JhY2xlcy4uLicpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGZhc3RHYXMgPSBhd2FpdCB0aGlzLmZldGNoR2FzUHJpY2VGcm9tUnBjKClcbiAgICAgIHRoaXMubGFzdEdhc1ByaWNlID0gTGVnYWN5R2FzUHJpY2VPcmFjbGUuZ2V0Q2F0ZWdvcml6ZShmYXN0R2FzKVxuICAgICAgcmV0dXJuIHRoaXMubGFzdEdhc1ByaWNlXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIGdhcyBwcmljZXMgZnJvbSBkZWZhdWx0IFJQQy4gTGFzdCBrbm93biBnYXMgd2lsbCBiZSByZXR1cm5lZCcpXG4gICAgfVxuICAgIHJldHVybiBMZWdhY3lHYXNQcmljZU9yYWNsZS5ub3JtYWxpemUodGhpcy5sYXN0R2FzUHJpY2UpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYXNrT3JhY2xlKG9yYWNsZTogT2ZmQ2hhaW5PcmFjbGUpOiBQcm9taXNlPEdhc1ByaWNlPiB7XG4gICAgY29uc3Qge1xuICAgICAgdXJsLFxuICAgICAgbmFtZSxcbiAgICAgIGRlbm9taW5hdG9yLFxuICAgICAgbG93UHJvcGVydHlOYW1lLFxuICAgICAgZmFzdFByb3BlcnR5TmFtZSxcbiAgICAgIGluc3RhbnRQcm9wZXJ0eU5hbWUsXG4gICAgICBzdGFuZGFyZFByb3BlcnR5TmFtZSxcbiAgICAgIGFkZGl0aW9uYWxEYXRhUHJvcGVydHksXG4gICAgfSA9IG9yYWNsZVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodXJsLCB7IHRpbWVvdXQ6IHRoaXMuY29uZmlndXJhdGlvbi50aW1lb3V0IH0pXG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNvbnN0IGdhcyA9IGFkZGl0aW9uYWxEYXRhUHJvcGVydHkgPyByZXNwb25zZS5kYXRhW2FkZGl0aW9uYWxEYXRhUHJvcGVydHldIDogcmVzcG9uc2UuZGF0YVxuXG4gICAgICBpZiAoTnVtYmVyKGdhc1tmYXN0UHJvcGVydHlOYW1lXSkgPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke25hbWV9IG9yYWNsZSBwcm92aWRlcyBjb3JydXB0ZWQgdmFsdWVzYClcbiAgICAgIH1cblxuICAgICAgY29uc3QgZ2FzUHJpY2VzOiBHYXNQcmljZSA9IHtcbiAgICAgICAgaW5zdGFudDogcGFyc2VGbG9hdChnYXNbaW5zdGFudFByb3BlcnR5TmFtZV0pIC8gZGVub21pbmF0b3IsXG4gICAgICAgIGZhc3Q6IHBhcnNlRmxvYXQoZ2FzW2Zhc3RQcm9wZXJ0eU5hbWVdKSAvIGRlbm9taW5hdG9yLFxuICAgICAgICBzdGFuZGFyZDogcGFyc2VGbG9hdChnYXNbc3RhbmRhcmRQcm9wZXJ0eU5hbWVdKSAvIGRlbm9taW5hdG9yLFxuICAgICAgICBsb3c6IHBhcnNlRmxvYXQoZ2FzW2xvd1Byb3BlcnR5TmFtZV0pIC8gZGVub21pbmF0b3IsXG4gICAgICB9XG4gICAgICByZXR1cm4gTGVnYWN5R2FzUHJpY2VPcmFjbGUubm9ybWFsaXplKGdhc1ByaWNlcylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGZXRjaCBnYXNQcmljZSBmcm9tICR7bmFtZX0gb3JhY2xlIGZhaWxlZC4gVHJ5aW5nIGFub3RoZXIgb25lLi4uYClcbiAgICB9XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBZ0JBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7K0NBbkJBLG9KOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUJhQSxvQjtFQW1GWCxvQ0FBMkQ7SUFBQTs7SUFBQSxJQUE3Q0MsT0FBNkMsUUFBN0NBLE9BQTZDO0lBQUEsSUFBakNDLE9BQWlDOztJQUFBOztJQUFBOztJQUFBLHdDQVhuQixFQVdtQjs7SUFBQSx5Q0FWakIsRUFVaUI7O0lBQUEsdUNBVFg7TUFDOUNDLE9BQU8sRUFBRUMsZUFBQSxDQUFRQyxPQUQ2QjtNQUU5Q0MsT0FBTyxFQUFFQywwQkFGcUM7TUFHOUNDLFVBQVUsRUFBRUMsZ0JBQUEsQ0FBU0wsZUFBQSxDQUFRQyxPQUFqQixFQUEwQkssTUFIUTtNQUk5Q0MsaUJBQWlCLEVBQUVYLG9CQUFvQixDQUFDWSxtQkFBckIsQ0FBeUNILGdCQUFBLENBQVNMLGVBQUEsQ0FBUUMsT0FBakIsRUFBMEJRLGVBQW5FO0lBSjJCLENBU1c7O0lBQUE7O0lBQ3pELEtBQUtaLE9BQUwsR0FBZUEsT0FBZjs7SUFDQSxJQUFJQyxPQUFKLEVBQWE7TUFDWCxLQUFLWSxhQUFMLG1DQUEwQixLQUFLQSxhQUEvQixHQUFpRFosT0FBakQ7SUFDRDs7SUFFRCxJQUFNUyxpQkFBaUIsR0FDckIsS0FBS0csYUFBTCxDQUFtQkgsaUJBQW5CLElBQXdDWCxvQkFBb0IsQ0FBQ1ksbUJBQXJCLENBQXlDSCxnQkFBQSxDQUFTTCxlQUFBLENBQVFDLE9BQWpCLEVBQTBCUSxlQUFuRSxDQUQxQztJQUVBLEtBQUtDLGFBQUwsQ0FBbUJILGlCQUFuQixHQUF1Q1gsb0JBQW9CLENBQUNlLFNBQXJCLENBQStCSixpQkFBL0IsQ0FBdkM7SUFFQSxJQUFNSyxPQUFPLDRCQUFHUCxn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