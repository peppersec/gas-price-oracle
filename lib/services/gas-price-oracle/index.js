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

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2dhcy1wcmljZS1vcmFjbGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9nYXMtcHJpY2Utb3JhY2xlJ1xuZXhwb3J0ICogZnJvbSAnLi90eXBlcydcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQUE7RUFBQTtFQUFBO0VBQUE7SUFBQTtJQUFBO01BQUE7SUFBQTtFQUFBO0FBQUE7O0FBQ0E7O0FBQUE7RUFBQTtFQUFBO0VBQUE7SUFBQTtJQUFBO01BQUE7SUFBQTtFQUFBO0FBQUEifQ==