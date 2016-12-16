'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _cloneChildren = require('./cloneChildren');

var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Path = function (_Component) {
  _inherits(Path, _Component);

  function Path() {
    _classCallCheck(this, Path);

    return _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).apply(this, arguments));
  }

  _createClass(Path, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.animate) {
        this.animate();
        return;
      }
      this.draw();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.animate) {
        this.animate();
        return;
      }
      this.draw();
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this2 = this;

      var value = this.props.data.value > 100 ? 100 : this.props.data.value;
      var el = (0, _d3Selection.select)(this.container).select('path');

      var endCircle = (0, _d3Selection.select)(this.container).select('circle.solid-gauge-end');
      var easeFn = ease[this.props.ease] ? ease[this.props.ease] : ease.easeSinInOut;
      el.datum([value]).transition().ease(easeFn).duration(4000).attrTween('d', function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            d = _ref2[0];

        var thisArc = _this2.props.arc;

        var scale = (0, _d3Scale.scaleLinear)().domain([0, 100]).range([0, _this2.props.endAngle]);

        var interpolatePath = (0, _d3Interpolate.interpolate)(0, scale(value));
        if (el.empty()) {
          return function (t) {
            return thisArc.endAngle(interpolatePath(t))();
          };
        }
        return function (t) {
          var newArc = (0, _d3Shape.arc)().startAngle(thisArc.startAngle()() * 2).endAngle(thisArc.endAngle()() * 2).outerRadius(thisArc.outerRadius()()).innerRadius(thisArc.innerRadius()());

          endCircle.attr('transform', 'translate(' + newArc.centroid() + ')');
          return thisArc.endAngle(interpolatePath(t))();
        };
      });
      el.node().old = this.props.data.value;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var thisArc = this.props.arc;
      var el = (0, _d3Selection.select)(this.container).select('path');

      var endCircle = (0, _d3Selection.select)(this.container).select('circle.solid-gauge-end');
      var scale = (0, _d3Scale.scaleLinear)().domain([0, 100]).range([0, this.props.endAngle]);
      el.datum([this.props.data.value]).attr('d', thisArc.endAngle(scale(this.props.data.value)));
      if (!endCircle.empty()) {
        var newArc = (0, _d3Shape.arc)().startAngle(thisArc.startAngle()() * 2).endAngle(thisArc.endAngle()() * 2).outerRadius(thisArc.outerRadius()()).innerRadius(thisArc.innerRadius()());
        endCircle.attr('transform', 'translate(' + newArc.centroid() + ')');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          noChildren = _objectWithoutProperties(_props, ['children']);

      // Copy the props and the state to pass it down to the children


      var props = Object.assign({}, noChildren, {
        parentFill: this.props.data.fill,
        parentStroke: this.props.data.stroke
      });

      // Clone the children and pass in the props and state
      var cloneChildrenWithProps = (0, _cloneChildren2.default)(children, props);
      return _react2.default.createElement(
        'g',
        {
          ref: function ref(c) {
            _this3.container = c;
          }
        },
        _react2.default.createElement('path', {
          ref: function ref(c) {
            _this3.path = c;
          },
          fill: this.props.data.fill,
          stroke: this.props.data.stroke
        }),
        cloneChildrenWithProps
      );
    }
  }]);

  return Path;
}(_react.Component);

Path.propTypes = {
  data: _react.PropTypes.shape({
    value: _react.PropTypes.number,
    label: _react.PropTypes.string,
    stroke: _react.PropTypes.string,
    fill: _react.PropTypes.string
  }),
  animate: _react.PropTypes.bool,
  animateTime: _react.PropTypes.number,
  ease: _react.PropTypes.string,
  arc: _react.PropTypes.func,
  endAngle: _react.PropTypes.number,
  cY: _react.PropTypes.number,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node])
};
Path.defaultProps = {
  animate: true,
  animateTime: 2000,
  ease: 'easeSinInOut'
};
exports.default = Path;