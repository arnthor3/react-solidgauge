'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Shape = require('d3-shape');

var _d3Selection = require('d3-selection');

require('d3-transition');

var _cloneChildren = require('./cloneChildren');

var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var PathGroup = function (_Component) {
  _inherits(PathGroup, _Component);

  function PathGroup() {
    _classCallCheck(this, PathGroup);

    return _possibleConstructorReturn(this, (PathGroup.__proto__ || Object.getPrototypeOf(PathGroup)).apply(this, arguments));
  }

  _createClass(PathGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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
            _this2.container = c;
          }
        },
        this.props.values.map(function (d, i) {
          var marginAndWidth = width + margin;

          var cX = _this2.props.width / 2;
          var cY = height / 2 - i * marginAndWidth;
          var radius = Math.min(cX, cY);
          var outer = radius;
          var thisArc = (0, _d3Shape.arc)().outerRadius(outer).innerRadius(outer - width).startAngle(0).endAngle(_this2.props.endAngle);

          var _props = _this2.props,
              children = _props.children,
              noChildren = _objectWithoutProperties(_props, ['children']);

          // Copy the props and the state to pass it down to the children


          var props = Object.assign({}, noChildren, {
            arc: thisArc,
            data: d,
            pathWidth: width
          });

          // Clone the children and pass in the props and state
          var cloneChildrenWithProps = (0, _cloneChildren2.default)(_this2.props.children, props, _this2.childRules);

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
                d: thisArc(),
                fill: _this2.props.background.fill,
                stroke: _this2.props.background.stroke
              }),
              _react2.default.createElement(
                'g',
                { transform: 'translate(' + thisArc().split('A')[0].split('M')[1] + ')' },
                _react2.default.createElement(
                  'text',
                  {
                    style: {
                      pointerEvent: 'none'
                    },
                    fontSize: _this2.props.fontSize,
                    fill: d.fill,
                    stroke: d.stroke,
                    textAnchor: 'end',
                    dx: -15,
                    dy: _this2.props.fontSize / 2 + width / 4 || 0
                  },
                  d.label
                )
              ),
              cloneChildrenWithProps
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
  values: _react.PropTypes.arrayOf(shape),
  pathWidth: _react.PropTypes.number,
  pathMargin: _react.PropTypes.number,
  iter: _react.PropTypes.number,
  endAngle: _react.PropTypes.number,
  cornerRadius: _react.PropTypes.number,
  background: fillStroke,
  fontSize: _react.PropTypes.number,
  margin: _react.PropTypes.number,
  chartMargin: _react.PropTypes.number,
  data: shape,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  childRules: _react.PropTypes.bool
};
PathGroup.defaultProps = {
  ease: 'easeBounce',
  chartMargin: 50,
  childRules: true,
  background: {
    fill: '#ddd',
    stroke: '#aaa'
  }
};
exports.default = PathGroup;