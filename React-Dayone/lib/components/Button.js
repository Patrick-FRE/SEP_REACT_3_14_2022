"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var test = 'ASDFG';

var Button = function Button() {
  return /*#__PURE__*/_react["default"].createElement("button", null, "My Button Changed ", test);
};

var _default = Button;
exports["default"] = _default;