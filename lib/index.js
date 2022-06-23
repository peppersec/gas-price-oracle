"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gasPriceOracle = require("./services/gas-price-oracle");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJ0Avc2VydmljZXMvZ2FzLXByaWNlLW9yYWNsZSdcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQUE7RUFBQTtFQUFBO0VBQUE7SUFBQTtJQUFBO01BQUE7SUFBQTtFQUFBO0FBQUEifQ==