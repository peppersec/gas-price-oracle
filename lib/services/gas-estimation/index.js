"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eip = require("./eip1559");

Object.keys(_eip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eip[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eip[key];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2dhcy1lc3RpbWF0aW9uL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vZWlwMTU1OSdcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUFBO0VBQUE7RUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBO0lBQUE7RUFBQTtBQUFBOztBQUNBOztBQUFBO0VBQUE7RUFBQTtFQUFBO0lBQUE7SUFBQTtNQUFBO0lBQUE7RUFBQTtBQUFBIn0=