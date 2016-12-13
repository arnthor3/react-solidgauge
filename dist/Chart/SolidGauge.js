'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Shape = require('d3-shape');

var _d3Ease = require('d3-ease');

var ease = _interopRequireWildcard(_d3Ease);

var _d3Selection = require('d3-selection');

var _d3Scale = require('d3-scale');

var _d3Interpolate = require('d3-interpolate');

require('d3-transition');

var _PathGroup = require('./PathGroup');

var _PathGroup2 = _interopRequireDefault(_PathGroup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SolidGauge = function (_Component) {
  _inherits(SolidGauge, _Component);

  function SolidGauge() {
    _classCallCheck(this, SolidGauge);

    return _possibleConstructorReturn(this, (SolidGauge.__proto__ || Object.getPrototypeOf(SolidGauge)).apply(this, arguments));
  }

  _createClass(SolidGauge, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var el = (0, _d3Selection.select)(this.container).selectAll('path.val');
      var thisEase = void 0;
      if (ease[this.props.ease]) {
        thisEase = ease[this.props.ease];
      } else {
        thisEase = ease.easeBounce;
      }

      el.transition().duration(2000).ease(ease.easeBounce).attrTween('d', function (_ref, i) {
        var _ref2 = _slicedToArray(_ref, 1),
            d = _ref2[0];

        var thisArc = el.nodes()[i].arc;

        var scale = (0, _d3Scale.scaleLinear)().domain([0, 100]).range([_this2.props.startAngle, _this2.props.endAngle]);

        var interpolatePath = (0, _d3Interpolate.interpolate)(0, scale(d));

        return function (t) {
          return thisArc.endAngle(interpolatePath(t))();
        };
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      var el = (0, _d3Selection.select)(this.container);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var radius = Math.min(this.props.height / 2, this.props.width / 2);

      var cX = this.props.width / 2;
      var cY = this.props.height / 2;

      return _react2.default.createElement(
        'g',
        {
          ref: function ref(c) {
            _this3.container = c;
          }
        },
        this.props.values.map(function (d, i) {
          return _react2.default.createElement(_PathGroup2.default, _extends({
            data: d,
            key: i,
            iter: i
          }, _this3.props));
        })
      );
    }
  }]);

  return SolidGauge;
}(_react.Component);

SolidGauge.propTypes = {
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  values: _react.PropTypes.arrayOf({}),
  startAngle: _react.PropTypes.number,
  endAngle: _react.PropTypes.number,
  ease: _react.PropTypes.string
};
SolidGauge.defaultProps = {
  ease: 'easeBounce'
};
exports.default = SolidGauge;