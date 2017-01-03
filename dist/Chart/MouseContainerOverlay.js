'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Shape = require('d3-shape');

var _d3Selection = require('d3-selection');

var _cloneChildren = require('../Helpers/cloneChildren');

var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

var _ToolTip = require('./ToolTip');

var _ToolTip2 = _interopRequireDefault(_ToolTip);

var _props = require('../Helpers/props');

var _toolTipSvg = require('../Helpers/toolTipSvg');

var tip = _interopRequireWildcard(_toolTipSvg);

var _dimensions = require('../Helpers/dimensions');

var dh = _interopRequireWildcard(_dimensions);

var _constants = require('../Helpers/constants');

var ch = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      var elV = el.node().parentElement.querySelector('canvas');
      var tool = (0, _d3Selection.select)(el.node().querySelector('.toolTip'));
      var mw = 180;
      var mh = 60;
      var top = tip.top(mw, mh);
      var bottom = tip.bottom(mw, mh);
      el.selectAll('path.' + ch.MOUSE_PATH).on('mousemove', function (d, i, p) {
        var pos = (0, _d3Selection.mouse)(el.node());
        var translateMouse = void 0;
        var isBottom = pos[1] < _this2.props.height / 4;
        var _props$values$i = _this2.props.values[i],
            fill = _props$values$i.fill,
            value = _props$values$i.value,
            label = _props$values$i.label;

        var mouseText = tool.select('text');
        var textLength = dh.getTextLength(mouseText.node());
        mw = textLength;
        top = tip.top(textLength, mh);
        bottom = tip.bottom(textLength, mh);
        if (isBottom) {
          tool.select('path').attr('d', bottom);
          translateMouse = 'translate(' + (pos[0] - mw / 2) + ',' + (pos[1] + mh * 0.25) + ')';
        } else {
          tool.select('path').attr('d', top);
          translateMouse = 'translate(' + (pos[0] - mw / 2) + ',' + (pos[1] - mh * 1.1) + ')';
        }
        mouseText.attr('dy', isBottom ? mh / 1.5 : mh / 2).attr('dx', 5);

        mouseText.select('tspan.label').text(label);

        mouseText.select('tspan.value').text(Math.floor(value) + '%');
        tool.select('path').attr('stroke', fill);
        tool.attr('transform', translateMouse);
        tool.transition().duration(0).attr('opacity', 1);
      });

      el.on('mouseleave', function () {
        tool.transition().duration(500).delay(250).attr('opacity', 0);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var dim = dh.getDimensions(this.props);
      return _react2.default.createElement(
        'g',
        {
          ref: function ref(c) {
            _this3.container = c;
          }
        },
        _react2.default.createElement(_ToolTip2.default, null),
        this.props.values.map(function (d, i) {
          var _dh$getRadius = dh.getRadius(dim, i),
              cX = _dh$getRadius.cX,
              cY = _dh$getRadius.cY,
              r = _dh$getRadius.r;

          var thisArc = (0, _d3Shape.arc)().outerRadius(r).innerRadius(r - dim.marginAndWidth).startAngle(0).endAngle(_this3.props.endAngle);
          var offset = i * dim.marginAndWidth;
          return _react2.default.createElement(
            'g',
            { key: i, transform: 'translate(' + offset + ',' + offset + ')' },
            _react2.default.createElement(
              'g',
              { transform: 'translate(' + cX + ',' + cY + ')' },
              _react2.default.createElement('path', {
                className: ch.MOUSE_PATH,
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
  height: _react.PropTypes.number,
  values: _props.dataShape,
  endAngle: _react.PropTypes.number
};
exports.default = PathGroup;