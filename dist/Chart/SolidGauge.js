'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _PathGroup = require('./PathGroup');

var _PathGroup2 = _interopRequireDefault(_PathGroup);

var _BackgroundPath = require('./BackgroundPath');

var _BackgroundPath2 = _interopRequireDefault(_BackgroundPath);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _Path = require('./Path');

var _Path2 = _interopRequireDefault(_Path);

var _MouseContainerOverlay = require('./MouseContainerOverlay');

var _MouseContainerOverlay2 = _interopRequireDefault(_MouseContainerOverlay);

var _ReactIf = require('./ReactIf');

var _ReactIf2 = _interopRequireDefault(_ReactIf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SolidGauge = function SolidGauge(props) {
  return _react2.default.createElement(
    _Chart2.default,
    _extends({
      childRules: false
    }, props),
    _react2.default.createElement(
      _PathGroup2.default,
      null,
      _react2.default.createElement(_BackgroundPath2.default, {
        fill: props.background.fill,
        stroke: props.background.stroke
      }),
      _react2.default.createElement(_Label2.default, null),
      _react2.default.createElement(_Path2.default, props)
    ),
    props.showMouse ? _react2.default.createElement(_MouseContainerOverlay2.default, null) : _react2.default.createElement('g', null)
  );
};

SolidGauge.propTypes = {
  background: _react.PropTypes.shape({
    fill: _react.PropTypes.string,
    stroke: _react.PropTypes.string
  }),
  showMouse: _react.PropTypes.bool
};

exports.default = SolidGauge;