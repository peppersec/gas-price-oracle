"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _legacy = require("./legacy");

Object.keys(_legacy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _legacy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _legacy[key];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2xlZ2FjeS1nYXMtcHJpY2UvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9sZWdhY3knXG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJ1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFBQTtFQUFBO0VBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQTs7QUFDQTs7QUFBQTtFQUFBO0VBQUE7RUFBQTtJQUFBO0lBQUE7TUFBQTtJQUFBO0VBQUE7QUFBQSJ9