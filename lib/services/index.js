"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gasPriceOracle = require("./gas-price-oracle");

Object.keys(_gasPriceOracle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gasPriceOracle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gasPriceOracle[key];
    }
  });
});

var _gasEstimation = require("./gas-estimation");

Object.keys(_gasEstimation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gasEstimation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gasEstimation[key];
    }
  });
});

var _legacyGasPrice = require("./legacy-gas-price");

Object.keys(_legacyGasPrice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _legacyGasPrice[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _legacyGasPrice[key];
    }
  });
});

var _rpcFetcher = require("./rpcFetcher");

Object.keys(_rpcFetcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _rpcFetcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rpcFetcher[key];
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vZ2FzLXByaWNlLW9yYWNsZSdcblxuZXhwb3J0ICogZnJvbSAnLi9nYXMtZXN0aW1hdGlvbidcbmV4cG9ydCAqIGZyb20gJy4vbGVnYWN5LWdhcy1wcmljZSdcblxuZXhwb3J0ICogZnJvbSAnLi9ycGNGZXRjaGVyJ1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFBQTtFQUFBO0VBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQTs7QUFFQTs7QUFBQTtFQUFBO0VBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQTs7QUFDQTs7QUFBQTtFQUFBO0VBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQTs7QUFFQTs7QUFBQTtFQUFBO0VBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQSJ9