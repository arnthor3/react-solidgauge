"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shadows = function shadows(props) {
  return _react2.default.createElement(
    "defs",
    null,
    _react2.default.createElement(
      "filter",
      {
        id: props.id,
        y: props.y,
        x: props.x,
        height: props.height,
        width: props.width
      },
      _react2.default.createElement("feGaussianBlur", {
        "in": "SourceAlpha",
        stdDeviation: props.stdDeviation,
        result: "blur"
      }),
      _react2.default.createElement("feOffset", {
        "in": "blur",
        dx: props.dx,
        dy: props.dy,
        result: "offsetBlur"
      }),
      _react2.default.createElement(
        "feMerge",
        null,
        _react2.default.createElement("feMergeNode", { "in": "offsetBlur" }),
        _react2.default.createElement("feMergeNode", { "in": "SourceGraphic" })
      )
    )
  );
};

shadows.propTypes = {
  id: _react.PropTypes.string,
  y: _react.PropTypes.string,
  x: _react.PropTypes.string,
  height: _react.PropTypes.string,
  width: _react.PropTypes.string,
  stdDeviation: _react.PropTypes.number,
  dx: _react.PropTypes.number,
  dy: _react.PropTypes.number
};

shadows.defaultProps = {
  id: 'shadow',
  y: '-10%',
  x: '-10%',
  height: '130%',
  width: '130%',
  stdDeviation: 2,
  dx: 2,
  dy: 2
};

exports.default = shadows;