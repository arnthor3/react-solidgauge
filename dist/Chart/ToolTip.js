'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var left = 'M8 24 L0 32 L8 42 L8 64 L64 64 L64 0 L8 0 Z';

var ToolTip = function ToolTip() {
  return _react2.default.createElement(
    'g',
    { className: 'toolTip', opacity: '0' },
    _react2.default.createElement('path', { d: 'M0 48 L26 48 L32 54 L38 48 L64 48 L64 0 L0 0 Z', fill: 'rgba(254,254,254,.95)', strokeWidth: '4', stroke: 'red' }),
    _react2.default.createElement(
      'text',
      {
        dy: '30',
        dx: '20',
        textAnchor: 'start'
      },
      '64%'
    )
  );
};

exports.default = ToolTip;