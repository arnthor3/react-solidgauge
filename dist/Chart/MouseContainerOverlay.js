'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Shape = require('d3-shape');

var _d3Selection = require('d3-selection');

var _cloneChildren = require('./cloneChildren');

var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

var _ToolTip = require('./ToolTip');

var _ToolTip2 = _interopRequireDefault(_ToolTip);

var _ToolTipSvg = require('./ToolTipSvg');

var tip = _interopRequireWildcard(_ToolTipSvg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fillStroke = _react.PropTypes.shape({
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string
});

var PathGroup = function (_Component) {
  _inherits(PathGroup, _Component);

  function PathGroup() {
    _classCallCheck(this, PathGroup);

    return _possibleConstructorReturn(this, (PathGroup.__proto__ || Object.getPrototypeOf(PathGroup)).apply(this, arguments));
  }

  _createClass(PathGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.appendHover();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.appendHover();
    }
  }, {
    key: 'appendHover',
    value: function appendHover() {
      var _this2 = this;

      var el = (0, _d3Selection.select)(this.container);
      var tool = (0, _d3Selection.select)(el.node().querySelector('.toolTip'));
      var mw = 90;
      var mh = 60;
      el.selectAll('path.mouse-path').on('mousemove', function (d, i, p) {
        var pos = (0, _d3Selection.mouse)(el.node());
        var translateMouse = void 0;
        if (pos[1] < _this2.props.height / 4) {
          tool.select('path').attr('d', tip.bottom(mw, mh));
          translateMouse = 'translate(' + (pos[0] - mw / 2) + ',' + (pos[1] + mh * 0.25) + ')';
        } else {
          tool.select('path').attr('d', tip.top(mw, mh));
          translateMouse = 'translate(' + (pos[0] - mw / 2) + ',' + (pos[1] - mh * 1.1) + ')';
        }

        var _props$values$i = _this2.props.values[i],
            fill = _props$values$i.fill,
            value = _props$values$i.value,
            label = _props$values$i.label;


        tool.transition().duration(0).attr('opacity', 1);
        tool.select('path').attr('stroke', fill);
        tool.select('text').text(Math.floor(value) + '%').attr('dy', mh / 2).attr('dx', mw / 2);
        tool.attr('transform', translateMouse);
      });

      el.on('mouseleave', function () {
        tool.transition().duration(500).delay(250).attr('opacity', 0);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var chartMargin = this.props.chartMargin;
      var height = this.props.height - chartMargin;
      var fullRadius = Math.min(this.props.height / 2 - chartMargin / 2, this.props.width / 2);
      var width = this.props.pathWidth * fullRadius;
      var margin = this.props.pathMargin * fullRadius;
      return _react2.default.createElement(
        'g',
        {
          transform: 'translate(0,' + chartMargin / 2 + ')',
          ref: function ref(c) {
            _this3.container = c;
          }
        },
        _react2.default.createElement(_ToolTip2.default, null),
        _react2.default.createElement('g', {
          ref: function ref(c) {
            _this3.mouseoverlay = c;
          }
        }),
        this.props.values.map(function (d, i) {
          var marginAndWidth = width + margin;

          var cX = _this3.props.width / 2;
          var cY = height / 2 - i * marginAndWidth;
          var radius = Math.min(cX, cY);
          var outer = radius;
          var thisArc = (0, _d3Shape.arc)().outerRadius(outer).innerRadius(outer - marginAndWidth).startAngle(0).endAngle(_this3.props.endAngle);

          return _react2.default.createElement(
            'g',
            {
              key: i,
              transform: 'translate(0,' + i * marginAndWidth + ')'
            },
            _react2.default.createElement(
              'g',
              { transform: 'translate(' + cX + ',' + cY + ')' },
              _react2.default.createElement('path', {
                className: 'mouse-path',
                d: thisArc(),
                opacity: '0',
                fill: d.fill,
                stroke: d.stroke
              })
            )
          );
        })
      );
    }
  }]);

  return PathGroup;
}(_react.Component);

PathGroup.propTypes = {
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  values: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    value: _react.PropTypes.number,
    label: _react.PropTypes.string,
    fill: _react.PropTypes.string,
    stroke: _react.PropTypes.string
  })),
  pathWidth: _react.PropTypes.number,
  pathMargin: _react.PropTypes.number,
  endAngle: _react.PropTypes.number,
  chartMargin: _react.PropTypes.number
};
PathGroup.defaultProps = {
  ease: 'easeBounce',
  chartMargin: 20
};
exports.default = PathGroup;