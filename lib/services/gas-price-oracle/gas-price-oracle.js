"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GasPriceOracle = void 0;

var _utils = require("../../utils");

var _config = require("../../config");

var _constants = require("../../constants");

var _ = require("./..");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GasPriceOracle = /*#__PURE__*/function () {
  function GasPriceOracle(options) {
    var _options$timeout;

    _classCallCheck(this, GasPriceOracle);

    _defineProperty(this, "eip1559", void 0);

    _defineProperty(this, "legacy", void 0);

    _defineProperty(this, "fetcher", void 0);

    _defineProperty(this, "chainId", void 0);

    var timeout = (_options$timeout = options === null || options === void 0 ? void 0 : options.timeout) !== null && _options$timeout !== void 0 ? _options$timeout : _constants.DEFAULT_TIMEOUT;
    this.chainId = (options === null || options === void 0 ? void 0 : options.chainId) || _config.ChainId.MAINNET;
    var defaultRpc = (options === null || options === void 0 ? void 0 : options.defaultRpc) || _config.NETWORKS[this.chainId].rpcUrl;
    this.fetcher = new _.RpcFetcher(defaultRpc, timeout);

    var _ref = (options === null || options === void 0 ? void 0 : options.fallbackGasPrices) || {},
        gasPrices = _ref.gasPrices,
        estimated = _ref.estimated;

    var payload = _objectSpread(_objectSpread({}, options), {}, {
      fetcher: this.fetcher
    });

    this.legacy = new _.LegacyGasPriceOracle(_objectSpread(_objectSpread({}, payload), {}, {
      fallbackGasPrices: gasPrices
    }));
    this.eip1559 = new _.Eip1559GasPriceOracle(_objectSpread(_objectSpread({}, payload), {}, {
      fallbackGasPrices: estimated
    }));
  }

  _createClass(GasPriceOracle, [{
    key: "gasPrices",
    value: function () {
      var _gasPrices = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(payload) {
        var fallbackGasPrices, shouldGetMedian, _payload$isLegacy, isLegacy;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fallbackGasPrices = payload.fallbackGasPrices, shouldGetMedian = payload.shouldGetMedian, _payload$isLegacy = payload.isLegacy, isLegacy = _payload$isLegacy === void 0 ? false : _payload$isLegacy;

                if (!isLegacy) {
                  _context.next = 5;
                  break;
                }

                _context.next = 4;
                return this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
                _context.prev = 5;
                _context.next = 8;
                return this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated);

              case 8:
                return _context.abrupt("return", _context.sent);

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](5);
                _context.next = 15;
                return this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);

              case 15:
                return _context.abrupt("return", _context.sent);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 11]]);
      }));

      function gasPrices(_x) {
        return _gasPrices.apply(this, arguments);
      }

      return gasPrices;
    }()
  }, {
    key: "getTxGasParams",
    value: function () {
      var _getTxGasParams = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(payload) {
        var fallbackGasPrices, shouldGetMedian, _payload$isLegacy2, isLegacy, _payload$bumpPercent, bumpPercent, _payload$legacySpeed, legacySpeed, legacyGasPrice, eipParams, _legacyGasPrice;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fallbackGasPrices = payload.fallbackGasPrices, shouldGetMedian = payload.shouldGetMedian, _payload$isLegacy2 = payload.isLegacy, isLegacy = _payload$isLegacy2 === void 0 ? false : _payload$isLegacy2, _payload$bumpPercent = payload.bumpPercent, bumpPercent = _payload$bumpPercent === void 0 ? 0 : _payload$bumpPercent, _payload$legacySpeed = payload.legacySpeed, legacySpeed = _payload$legacySpeed === void 0 ? 'fast' : _payload$legacySpeed;

                if (!isLegacy) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 4;
                return this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);

              case 4:
                legacyGasPrice = _context2.sent;
                return _context2.abrupt("return", {
                  gasPrice: (0, _utils.toWei)((0, _utils.bumpOnPercent)(legacyGasPrice[legacySpeed], bumpPercent))
                });

              case 6:
                _context2.prev = 6;
                _context2.next = 9;
                return this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated);

              case 9:
                eipParams = _context2.sent;
                return _context2.abrupt("return", {
                  maxFeePerGas: (0, _utils.toWei)((0, _utils.bumpOnPercent)(eipParams.maxFeePerGas, bumpPercent)),
                  maxPriorityFeePerGas: (0, _utils.toWei)((0, _utils.bumpOnPercent)(eipParams.maxPriorityFeePerGas, bumpPercent))
                });

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](6);
                _context2.next = 17;
                return this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);

              case 17:
                _legacyGasPrice = _context2.sent;
                return _context2.abrupt("return", {
                  gasPrice: (0, _utils.toWei)((0, _utils.bumpOnPercent)(_legacyGasPrice[legacySpeed], bumpPercent))
                });

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 13]]);
      }));

      function getTxGasParams(_x2) {
        return _getTxGasParams.apply(this, arguments);
      }

      return getTxGasParams;
    }()
  }, {
    key: "gasPricesWithEstimate",
    value: function () {
      var _gasPricesWithEstimate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(payload) {
        var fallbackGasPrices, shouldGetMedian, estimate, gasPrices;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fallbackGasPrices = payload.fallbackGasPrices, shouldGetMedian = payload.shouldGetMedian;
                _context3.next = 3;
                return this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated);

              case 3:
                estimate = _context3.sent;
                _context3.next = 6;
                return this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);

              case 6:
                gasPrices = _context3.sent;
                return _context3.abrupt("return", {
                  estimate: estimate,
                  gasPrices: gasPrices
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function gasPricesWithEstimate(_x3) {
        return _gasPricesWithEstimate.apply(this, arguments);
      }

      return gasPricesWithEstimate;
    }()
  }]);

  return GasPriceOracle;
}();

exports.GasPriceOracle = GasPriceOracle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJHYXNQcmljZU9yYWNsZSIsIm9wdGlvbnMiLCJ0aW1lb3V0IiwiREVGQVVMVF9USU1FT1VUIiwiY2hhaW5JZCIsIkNoYWluSWQiLCJNQUlOTkVUIiwiZGVmYXVsdFJwYyIsIk5FVFdPUktTIiwicnBjVXJsIiwiZmV0Y2hlciIsIlJwY0ZldGNoZXIiLCJmYWxsYmFja0dhc1ByaWNlcyIsImdhc1ByaWNlcyIsImVzdGltYXRlZCIsInBheWxvYWQiLCJsZWdhY3kiLCJMZWdhY3lHYXNQcmljZU9yYWNsZSIsImVpcDE1NTkiLCJFaXAxNTU5R2FzUHJpY2VPcmFjbGUiLCJzaG91bGRHZXRNZWRpYW4iLCJpc0xlZ2FjeSIsImVzdGltYXRlRmVlcyIsImJ1bXBQZXJjZW50IiwibGVnYWN5U3BlZWQiLCJsZWdhY3lHYXNQcmljZSIsImdhc1ByaWNlIiwidG9XZWkiLCJidW1wT25QZXJjZW50IiwiZWlwUGFyYW1zIiwibWF4RmVlUGVyR2FzIiwibWF4UHJpb3JpdHlGZWVQZXJHYXMiLCJlc3RpbWF0ZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9nYXMtcHJpY2Utb3JhY2xlL2dhcy1wcmljZS1vcmFjbGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR2FzT3JhY2xlT3B0aW9ucyxcbiAgR2FzUHJpY2VzV2l0aEVzdGltYXRlSW5wdXQsXG4gIEdhc1ByaWNlV2l0aEVzdGltYXRlLFxuICBHZXRHYXNQcmljZUlucHV0LFxuICBHZXRUeEdhc1BhcmFtc0lucHV0LFxuICBHZXRUeEdhc1BhcmFtc1JlcyxcbiAgT3JhY2xlUHJvdmlkZXIsXG59IGZyb20gJy4vdHlwZXMnXG5cbmltcG9ydCB7IGJ1bXBPblBlcmNlbnQsIHRvV2VpIH0gZnJvbSAnQC91dGlscydcbmltcG9ydCB7IENoYWluSWQsIE5FVFdPUktTIH0gZnJvbSAnQC9jb25maWcnXG5pbXBvcnQgeyBERUZBVUxUX1RJTUVPVVQgfSBmcm9tICdAL2NvbnN0YW50cydcblxuaW1wb3J0IHtcbiAgUnBjRmV0Y2hlcixcbiAgR2FzUHJpY2UsXG4gIExlZ2FjeU9yYWNsZSxcbiAgRXN0aW1hdGVPcmFjbGUsXG4gIEVzdGltYXRlZEdhc1ByaWNlLFxuICBMZWdhY3lHYXNQcmljZU9yYWNsZSxcbiAgRWlwMTU1OUdhc1ByaWNlT3JhY2xlLFxufSBmcm9tICdAL3NlcnZpY2VzJ1xuXG5leHBvcnQgY2xhc3MgR2FzUHJpY2VPcmFjbGUgaW1wbGVtZW50cyBPcmFjbGVQcm92aWRlciB7XG4gIHB1YmxpYyBlaXAxNTU5OiBFc3RpbWF0ZU9yYWNsZVxuICBwdWJsaWMgbGVnYWN5OiBMZWdhY3lPcmFjbGVcbiAgcHVibGljIGZldGNoZXI6IFJwY0ZldGNoZXJcbiAgcHJpdmF0ZSBjaGFpbklkOiBDaGFpbklkXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zPzogR2FzT3JhY2xlT3B0aW9ucykge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBvcHRpb25zPy50aW1lb3V0ID8/IERFRkFVTFRfVElNRU9VVFxuICAgIHRoaXMuY2hhaW5JZCA9IG9wdGlvbnM/LmNoYWluSWQgfHwgQ2hhaW5JZC5NQUlOTkVUXG4gICAgY29uc3QgZGVmYXVsdFJwYyA9IG9wdGlvbnM/LmRlZmF1bHRScGMgfHwgTkVUV09SS1NbdGhpcy5jaGFpbklkXS5ycGNVcmxcblxuICAgIHRoaXMuZmV0Y2hlciA9IG5ldyBScGNGZXRjaGVyKGRlZmF1bHRScGMsIHRpbWVvdXQpXG5cbiAgICBjb25zdCB7IGdhc1ByaWNlcywgZXN0aW1hdGVkIH0gPSBvcHRpb25zPy5mYWxsYmFja0dhc1ByaWNlcyB8fCB7fVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHsgLi4ub3B0aW9ucywgZmV0Y2hlcjogdGhpcy5mZXRjaGVyIH1cbiAgICB0aGlzLmxlZ2FjeSA9IG5ldyBMZWdhY3lHYXNQcmljZU9yYWNsZSh7XG4gICAgICAuLi5wYXlsb2FkLFxuICAgICAgZmFsbGJhY2tHYXNQcmljZXM6IGdhc1ByaWNlcyxcbiAgICB9KVxuXG4gICAgdGhpcy5laXAxNTU5ID0gbmV3IEVpcDE1NTlHYXNQcmljZU9yYWNsZSh7XG4gICAgICAuLi5wYXlsb2FkLFxuICAgICAgZmFsbGJhY2tHYXNQcmljZXM6IGVzdGltYXRlZCxcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdhc1ByaWNlcyhwYXlsb2FkOiBHZXRHYXNQcmljZUlucHV0KTogUHJvbWlzZTxHYXNQcmljZSB8IEVzdGltYXRlZEdhc1ByaWNlPiB7XG4gICAgY29uc3QgeyBmYWxsYmFja0dhc1ByaWNlcywgc2hvdWxkR2V0TWVkaWFuLCBpc0xlZ2FjeSA9IGZhbHNlIH0gPSBwYXlsb2FkXG4gICAgaWYgKGlzTGVnYWN5KSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5sZWdhY3kuZ2FzUHJpY2VzKGZhbGxiYWNrR2FzUHJpY2VzPy5nYXNQcmljZXMsIHNob3VsZEdldE1lZGlhbilcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmVpcDE1NTkuZXN0aW1hdGVGZWVzKGZhbGxiYWNrR2FzUHJpY2VzPy5lc3RpbWF0ZWQpXG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5sZWdhY3kuZ2FzUHJpY2VzKGZhbGxiYWNrR2FzUHJpY2VzPy5nYXNQcmljZXMsIHNob3VsZEdldE1lZGlhbilcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VHhHYXNQYXJhbXMocGF5bG9hZDogR2V0VHhHYXNQYXJhbXNJbnB1dCk6IFByb21pc2U8R2V0VHhHYXNQYXJhbXNSZXM+IHtcbiAgICBjb25zdCB7IGZhbGxiYWNrR2FzUHJpY2VzLCBzaG91bGRHZXRNZWRpYW4sIGlzTGVnYWN5ID0gZmFsc2UsIGJ1bXBQZXJjZW50ID0gMCwgbGVnYWN5U3BlZWQgPSAnZmFzdCcgfSA9IHBheWxvYWRcblxuICAgIGlmIChpc0xlZ2FjeSkge1xuICAgICAgY29uc3QgbGVnYWN5R2FzUHJpY2UgPSBhd2FpdCB0aGlzLmxlZ2FjeS5nYXNQcmljZXMoZmFsbGJhY2tHYXNQcmljZXM/Lmdhc1ByaWNlcywgc2hvdWxkR2V0TWVkaWFuKVxuXG4gICAgICByZXR1cm4geyBnYXNQcmljZTogdG9XZWkoYnVtcE9uUGVyY2VudChsZWdhY3lHYXNQcmljZVtsZWdhY3lTcGVlZF0sIGJ1bXBQZXJjZW50KSkgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBlaXBQYXJhbXMgPSBhd2FpdCB0aGlzLmVpcDE1NTkuZXN0aW1hdGVGZWVzKGZhbGxiYWNrR2FzUHJpY2VzPy5lc3RpbWF0ZWQpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYXhGZWVQZXJHYXM6IHRvV2VpKGJ1bXBPblBlcmNlbnQoZWlwUGFyYW1zLm1heEZlZVBlckdhcywgYnVtcFBlcmNlbnQpKSxcbiAgICAgICAgbWF4UHJpb3JpdHlGZWVQZXJHYXM6IHRvV2VpKGJ1bXBPblBlcmNlbnQoZWlwUGFyYW1zLm1heFByaW9yaXR5RmVlUGVyR2FzLCBidW1wUGVyY2VudCkpLFxuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgY29uc3QgbGVnYWN5R2FzUHJpY2UgPSBhd2FpdCB0aGlzLmxlZ2FjeS5nYXNQcmljZXMoZmFsbGJhY2tHYXNQcmljZXM/Lmdhc1ByaWNlcywgc2hvdWxkR2V0TWVkaWFuKVxuXG4gICAgICByZXR1cm4geyBnYXNQcmljZTogdG9XZWkoYnVtcE9uUGVyY2VudChsZWdhY3lHYXNQcmljZVtsZWdhY3lTcGVlZF0sIGJ1bXBQZXJjZW50KSkgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnYXNQcmljZXNXaXRoRXN0aW1hdGUocGF5bG9hZDogR2FzUHJpY2VzV2l0aEVzdGltYXRlSW5wdXQpOiBQcm9taXNlPEdhc1ByaWNlV2l0aEVzdGltYXRlPiB7XG4gICAgY29uc3QgeyBmYWxsYmFja0dhc1ByaWNlcywgc2hvdWxkR2V0TWVkaWFuIH0gPSBwYXlsb2FkXG5cbiAgICBjb25zdCBlc3RpbWF0ZSA9IGF3YWl0IHRoaXMuZWlwMTU1OS5lc3RpbWF0ZUZlZXMoZmFsbGJhY2tHYXNQcmljZXM/LmVzdGltYXRlZClcbiAgICBjb25zdCBnYXNQcmljZXMgPSBhd2FpdCB0aGlzLmxlZ2FjeS5nYXNQcmljZXMoZmFsbGJhY2tHYXNQcmljZXM/Lmdhc1ByaWNlcywgc2hvdWxkR2V0TWVkaWFuKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGVzdGltYXRlLFxuICAgICAgZ2FzUHJpY2VzLFxuICAgIH1cbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFVQTs7QUFDQTs7QUFDQTs7QUFFQTs7K0NBYkEsb0o7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXVCYUEsYztFQUtYLHdCQUFtQkMsT0FBbkIsRUFBK0M7SUFBQTs7SUFBQTs7SUFBQTs7SUFBQTs7SUFBQTs7SUFBQTs7SUFDN0MsSUFBTUMsT0FBTyx1QkFBR0QsT0FBSCxhQUFHQSxPQUFILHVCQUFHQSxPQUFPLENBQUVDLE9BQVosK0RBQXVCQywwQkFBcEM7SUFDQSxLQUFLQyxPQUFMLEdBQWUsQ0FBQUgsT0FBTyxTQUFQLElBQUFBLE9BQU8sV0FBUCxZQUFBQSxPQUFPLENBQUVHLE9BQVQsS0FBb0JDLGVBQUEsQ0FBUUMsT0FBM0M7SUFDQSxJQUFNQyxVQUFVLEdBQUcsQ0FBQU4sT0FBTyxTQUFQLElBQUFBLE9BQU8sV0FBUCxZQUFBQSxPQUFPLENBQUVNLFVBQVQsS0FBdUJDLGdCQUFBLENBQVMsS0FBS0osT0FBZCxFQUF1QkssTUFBakU7SUFFQSxLQUFLQyxPQUFMLEdBQWUsSUFBSUMsWUFBSixDQUFlSixVQUFmLEVBQTJCTCxPQUEzQixDQUFmOztJQUVBLFdBQWlDLENBQUFELE9BQU8sU0FBUCxJQUFBQSxPQUFPLFdBQVAsWUFBQUEsT0FBTyxDQUFFVyxpQkFBVCxLQUE4QixFQUEvRDtJQUFBLElBQVFDLFNBQVIsUUFBUUEsU0FBUjtJQUFBLElBQW1CQyxTQUFuQixRQUFtQkEsU0FBbkI7O0lBRUEsSUFBTUMsT0FBTyxtQ0FBUWQsT0FBUjtNQUFpQlMsT0FBTyxFQUFFLEtBQUtBO0lBQS9CLEVBQWI7O0lBQ0EsS0FB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