'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  A very simple component
 */
var BackgroundPath = function BackgroundPath(_ref) {
  var arc = _ref.arc,
      fill = _ref.fill,
      stroke = _ref.stroke,
      filter = _ref.filter;
  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('path', {
      d: arc(),
      fill: fill,
      stroke: stroke,
      filter: filter
    })
  );
};

BackgroundPath.propTypes = {
  arc: _react.PropTypes.func,
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string,
  filter: _react.PropTypes.string
};

BackgroundPath.defaultProps = {
  fill: '#ddd',
  stroke: '#aaa'
};

exports.default = BackgroundPath;