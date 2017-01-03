'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Group = require('./Group');

var _Group2 = _interopRequireDefault(_Group);

var _PathGroup = require('./PathGroup');

var _PathGroup2 = _interopRequireDefault(_PathGroup);

var _MouseContainerOverlay = require('./MouseContainerOverlay');

var _MouseContainerOverlay2 = _interopRequireDefault(_MouseContainerOverlay);

var _Shadows = require('./Shadows');

var _Shadows2 = _interopRequireDefault(_Shadows);

var _ReactIf = require('../Helpers/ReactIf');

var _ReactIf2 = _interopRequireDefault(_ReactIf);

var _props = require('../Helpers/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

var SolidGauge = function SolidGauge(props) {
  return _react2.default.createElement(
    _Chart2.default,
    {
      responsive: props.responsive,
      width: props.width,
      height: props.height
    },
    _react2.default.createElement(
      _Group2.default,
      {
        pathWidth: props.pathWidth,
        pathMargin: props.pathMargin,
        chartMargin: props.chartMargin,
        values: props.values,
        endAngle: props.endAngle
      },
      _react2.default.createElement(_PathGroup2.default, {
        background: props.background,
        fontSize: props.fontSize,
        enterAnimation: props.enterAnimation,
        animationEase: props.animationEase,
        animationTime: props.animationTime,
        circleRadius: props.circleRadius,
        endAngle: props.endAngle,
        shadow: !isEmpty(props.shadow)
      }),
      _react2.default.createElement(
        _ReactIf2.default,
        {
          el: _react2.default.createElement('g', null),
          condition: props.showTooltip
        },
        _react2.default.createElement(_MouseContainerOverlay2.default, {
          mouseFill: props.mouseFill,
          mouseStrokeWidth: props.mouseStrokeWidth
        })
      ),
      _react2.default.createElement(
        _ReactIf2.default,
        { el: _react2.default.createElement('g', null), condition: !isEmpty(props.shadow) },
        _react2.default.createElement(_Shadows2.default, {
          id: 'shadows',
          x: props.shadow.x,
          y: props.shadow.y,
          width: props.shadow.width,
          height: props.shadow.height,
          dx: props.shadow.dx,
          dy: props.shadow.dy
        })
      )
    )
  );
};

SolidGauge.propTypes = {
  enterAnimation: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  values: _props.dataShape,
  pathWidth: _react.PropTypes.number,
  pathMargin: _react.PropTypes.number,
  endAngle: _react.PropTypes.number,
  background: _props.fillAndStroke,
  fontSize: _react.PropTypes.number,
  chartMargin: _react.PropTypes.number,
  showTooltip: _react.PropTypes.bool,
  animationTime: _react.PropTypes.number,
  animationEase: _react.PropTypes.string,
  circleRadius: _react.PropTypes.number,
  mouseFill: _react.PropTypes.string,
  mouseStrokeWidth: _react.PropTypes.number,
  shadow: _react.PropTypes.shape({
    id: _react.PropTypes.string,
    y: _react.PropTypes.string,
    x: _react.PropTypes.string,
    height: _react.PropTypes.string,
    width: _react.PropTypes.string,
    stdDeviation: _react.PropTypes.number,
    dx: _react.PropTypes.number,
    dy: _react.PropTypes.number
  })
};

SolidGauge.defaultProps = {
  chartMargin: 50,
  shadow: {},
  background: {}
};

exports.default = SolidGauge;