'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var END_CIRCLE = 'solid-gauge-end';

var EndCircle = function EndCircle(_ref) {
  var stroke = _ref.stroke,
      fill = _ref.fill,
      parentFill = _ref.parentFill,
      parentStroke = _ref.parentStroke,
      r = _ref.r;
  return _react2.default.createElement('circle', {
    stroke: stroke || parentStroke,
    fill: fill || parentFill,
    r: r,
    className: 'solid-gauge-end'
  });
};

var propTypes = {
  stroke: _react.PropTypes.string,
  fill: _react.PropTypes.string,
  parentFill: _react.PropTypes.string,
  parentStroke: _react.PropTypes.string,
  r: _react.PropTypes.number
};

EndCircle.propTypes = propTypes;

exports.default = EndCircle;