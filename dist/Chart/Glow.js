"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Glow = function Glow(_ref) {
  var id = _ref.id,
      x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      color = _ref.color,
      opacity = _ref.opacity,
      radius = _ref.radius,
      dev = _ref.dev;
  return _react2.default.createElement(
    "defs",
    null,
    _react2.default.createElement(
      "filter",
      { id: id, x: x, y: y, width: width, height: height },
      _react2.default.createElement("feFlood", { result: "flood", floodColor: color, floodOpacity: opacity }),
      _react2.default.createElement("feComposite", { "in": "flood", result: "mask", in2: "SourceGraphic", operator: "in" }),
      _react2.default.createElement("feMorphology", { "in": "mask", result: "dilated", operator: "dilate", radius: radius }),
      _react2.default.createElement("feGaussianBlur", { "in": "dilated", result: "blurred", stdDeviation: dev }),
      _react2.default.createElement(
        "feMerge",
        null,
        _react2.default.createElement("feMergeNode", { "in": "blurred" }),
        _react2.default.createElement("feMergeNode", { "in": "SourceGraphic" })
      )
    )
  );
};

Glow.propTypes = {
  id: _react.PropTypes.string,
  color: _react.PropTypes.string,
  x: _react.PropTypes.number,
  y: _react.PropTypes.number,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  opacity: _react.PropTypes.number,
  radius: _react.PropTypes.number,
  dev: _react.PropTypes.number
};

exports.default = Glow;