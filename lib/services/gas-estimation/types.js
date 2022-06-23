"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EstimateOracle = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EstimateOracle = /*#__PURE__*/_createClass(function EstimateOracle() {
  _classCallCheck(this, EstimateOracle);

  _defineProperty(this, "configuration", void 0);
});

exports.EstimateOracle = EstimateOracle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFc3RpbWF0ZU9yYWNsZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9nYXMtZXN0aW1hdGlvbi90eXBlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmlnTnVtYmVyIGZyb20gJ2JpZ251bWJlci5qcydcblxuaW1wb3J0IHsgRmVlSGlzdG9yeSB9IGZyb20gJ0AvdHlwZXMnXG5pbXBvcnQgeyBScGNGZXRjaGVyIH0gZnJvbSAnQC9zZXJ2aWNlcydcblxuZXhwb3J0IHR5cGUgRXN0aW1hdGVkR2FzUHJpY2UgPSB7XG4gIG1heEZlZVBlckdhczogbnVtYmVyXG4gIGJhc2VGZWU6IG51bWJlciB8IHVuZGVmaW5lZFxuICBtYXhQcmlvcml0eUZlZVBlckdhczogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIEVzdGltYXRlRmVlc1BhcmFtcyA9IHtcbiAgYmxvY2tzQ291bnQ6IG51bWJlclxuICBwZXJjZW50aWxlOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ2FsY3VsYXRlRmVlc1BhcmFtcyA9IHtcbiAgYmFzZUZlZTogQmlnTnVtYmVyXG4gIGZlZUhpc3Rvcnk/OiBGZWVIaXN0b3J5XG59XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnMgPSB7XG4gIGNoYWluSWQ/OiBudW1iZXJcbiAgYmxvY2tzQ291bnQ/OiBudW1iZXJcbiAgcGVyY2VudGlsZT86IG51bWJlclxuICBmYWxsYmFja0dhc1ByaWNlczogRXN0aW1hdGVkR2FzUHJpY2UgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IHR5cGUgR2FzRXN0aW1hdGlvbk9wdGlvbnNQYXlsb2FkID0gT3B0aW9ucyAmIHtcbiAgZmV0Y2hlcjogUnBjRmV0Y2hlclxufVxuXG5leHBvcnQgdHlwZSBDb25maWcgPSBSZXF1aXJlZDxPcHRpb25zPiAmIHsgZmFsbGJhY2tHYXNQcmljZXM/OiBFc3RpbWF0ZWRHYXNQcmljZSB9XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXN0aW1hdGVPcmFjbGUge1xuICBwdWJsaWMgY29uZmlndXJhdGlvbjogQ29uZmlnXG4gIHB1YmxpYyBhYnN0cmFjdCBlc3RpbWF0ZUZlZXMoZmFsbGJhY2tHYXNQcmljZXM/OiBFc3RpbWF0ZWRHYXNQcmljZSk6IFByb21pc2U8RXN0aW1hdGVkR2FzUHJpY2U+XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQWlDc0JBLGMifQ==