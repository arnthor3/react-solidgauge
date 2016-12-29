'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _PathGroup = require('./PathGroup');

var _PathGroup2 = _interopRequireDefault(_PathGroup);

var _Path = require('./Path');

var _Path2 = _interopRequireDefault(_Path);

var _MouseContainerOverlay = require('./MouseContainerOverlay');

var _MouseContainerOverlay2 = _interopRequireDefault(_MouseContainerOverlay);

var _Shadows = require('./Shadows');

var _Shadows2 = _interopRequireDefault(_Shadows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataShape = _react.PropTypes.shape({
  value: _react.PropTypes.number,
  label: _react.PropTypes.string,
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string
});

var SolidGauge = function SolidGauge(props) {
  return _react2.default.createElement(
    _Chart2.default,
    {
      responsive: props.responsive,
      width: props.width,
      height: props.height
    },
    _react2.default.createElement(
      _PathGroup2.default,
      {
        background: props.background,
        pathWidth: props.pathWidth,
        pathMargin: props.pathMargin,
        chartMargin: props.chartMargin,
        values: props.values,
        endAngle: props.endAngle,
        fontSize: props.fontSize,
        enterAnimation: props.enterAnimation
      },
      _react2.default.createElement(_Path2.default, {
        ease: props.ease,
        animate: props.animate,
        animateTime: props.animateTime,
        circleRadius: props.circleRadius,
        endAngle: props.endAngle
      })
    ),
    props.showTooltip ? _react2.default.createElement(_MouseContainerOverlay2.default, {
      chartMargin: props.chartMargin,
      endAngle: props.endAngle,
      pathWidth: props.pathWidth,
      pathMargin: props.pathMargin,
      values: props.values,
      mouseFill: props.mouseFill,
      mouseStrokeWidth: props.mouseStrokeWidth
    }) : _react2.default.createElement('g', null)
  );
};

var fillStroke = _react.PropTypes.shape({
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string
});

var shape = _react.PropTypes.shape({
  value: _react.PropTypes.number,
  label: _react.PropTypes.string,
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string
});

SolidGauge.propTypes = {
  enterAnimation: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  values: _react.PropTypes.arrayOf(shape),
  pathWidth: _react.PropTypes.number,
  pathMargin: _react.PropTypes.number,
  endAngle: _react.PropTypes.number,
  background: fillStroke,
  fontSize: _react.PropTypes.number,
  chartMargin: _react.PropTypes.number,
  showTooltip: _react.PropTypes.bool,
  animate: _react.PropTypes.bool,
  animateTime: _react.PropTypes.number,
  ease: _react.PropTypes.string,
  circleRadius: _react.PropTypes.number,
  mouseFill: _react.PropTypes.string,
  mouseStrokeWidth: _react.PropTypes.number
};

SolidGauge.defaultProps = {
  chartMargin: 50
};

exports.default = SolidGauge;