'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Shape = require('d3-shape');

var _d3Ease = require('d3-ease');

var ease = _interopRequireWildcard(_d3Ease);

var _d3Selection = require('d3-selection');

var _d3Interpolate = require('d3-interpolate');

require('d3-transition');

var _constants = require('../Helpers/constants');

var ch = _interopRequireWildcard(_constants);

var _dimensions = require('../Helpers/dimensions');

var dh = _interopRequireWildcard(_dimensions);

var _props = require('../Helpers/props');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.values === undefined || this.props.values.length === 0) {
        throw new Error(ch.NO_DATA);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderChart(750);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.renderChart();
    }
  }, {
    key: 'getAnimationVariables',
    value: function getAnimationVariables() {
      var aTime = this.props.animationTime;
      var aEase = ease[this.props.animationEase];

      if (aTime === undefined) {
        aTime = ch.animationTime;
      }

      if (typeof aEase !== 'function') {
        aEase = ease[ch.animationEase];
      }

      return {
        aTime: aTime,
        aEase: aEase
      };
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this2 = this;

      var enterDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var paths = (0, _d3Selection.select)(this.container).selectAll('path.' + ch.VALUE_PATH);
      var endCircle = (0, _d3Selection.select)(this.container).selectAll('circle');
      var scale = dh.getValueScale(this.props);
      var dim = dh.getDimensions(this.props);

      var _getAnimationVariable = this.getAnimationVariables(),
          aTime = _getAnimationVariable.aTime,
          aEase = _getAnimationVariable.aEase;

      paths.transition().duration(aTime).delay(enterDelay).ease(aEase).attrTween('d', function (d, i, path) {
        // Select the endcircle we will be animating
        var endC = (0, _d3Selection.select)(endCircle.nodes()[i]);

        // select the path that we are working with
        var p = (0, _d3Selection.select)(path[i]);

        // read the old data value from the path
        var old = p.node().old || 0;

        // fix value min, max 0, 100
        var value = _this2.props.values[i].value;
        value = value > 100 ? 100 : value;
        value = value < 0 ? 0 : value;

        // get the arc we are working with

        var _dh$getRadius = dh.getRadius(dim, i),
            thisArc = _dh$getRadius.thisArc;

        // create the interpolation between the old value and to the new value


        var inter = (0, _d3Interpolate.interpolate)(scale(old), scale(value));

        // store the old value on the node
        p.node().old = value;

        // if the endcircle is empty then just animate the path
        if (endCircle.empty()) {
          return function (t) {
            return thisArc.endAngle(inter(t))();
          };
        }
        endCircle.attr('opacity', '1');
        return function (t) {
          thisArc.endAngle(inter(t));
          var newArc = dh.doubleArc(thisArc);

          endC.attr('transform', 'translate(' + newArc.centroid() + ')');
          return thisArc();
        };
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this3 = this;

      var paths = (0, _d3Selection.select)(this.container).selectAll('path.' + ch.VALUE_PATH);
      var endCircle = (0, _d3Selection.select)(this.container).selectAll('circle');
      var scale = dh.getValueScale(this.props);
      var dim = dh.getDimensions(this.props);

      paths.attr('d', function (d, i) {
        var endC = (0, _d3Selection.select)(endCircle.nodes()[i]);
        var value = _this3.props.values[i].value;
        value = value > 100 ? 100 : value;
        value = value < 0 ? 0 : value;

        var _dh$getRadius2 = dh.getRadius(dim, i),
            thisArc = _dh$getRadius2.thisArc;

        thisArc.endAngle(scale(value));
        var newArc = dh.doubleArc(thisArc);
        endC.attr('transform', 'translate(' + newArc.centroid() + ')');
        return thisArc();
      });
    }
  }, {
    key: 'renderChart',
    value: function renderChart(enterDelay) {
      var shouldAnimate = this.props.animationTime || this.props.animationEase;
      if (shouldAnimate) {
        this.animate(enterDelay);
        return;
      }
      this.draw();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var dim = dh.getDimensions(this.props);
      return _react2.default.createElement(
        'g',
        {
          ref: function ref(c) {
            _this4.container = c;
          }
        },
        this.props.values.map(function (d, i) {
          var _dh$getRadius3 = dh.getRadius(dim, i, _this4.props.endAngle),
              r = _dh$getRadius3.r,
              cX = _dh$getRadius3.cX,
              cY = _dh$getRadius3.cY,
              outer = _dh$getRadius3.outer,
              thisArc = _dh$getRadius3.thisArc;

          var offset = i * dim.marginAndWidth;
          return _react2.default.createElement(
            'g',
            { key: i, transform: 'translate(' + offset + ',' + offset + ')' },
            _react2.default.createElement(
              'g',
              { transform: 'translate(' + cX + ',' + cY + ')' },
              _react2.default.createElement('path', {
                d: thisArc(),
                fill: _this4.props.background.fill,
                stroke: _this4.props.background.stroke,
                filter: _this4.props.shadow ? 'url(#shadows)' : ''
              }),
              _react2.default.createElement(
                'g',
                {
                  transform: 'translate(' + thisArc().split('A')[0].split('M')[1] + ')'
                },
                _react2.default.createElement(
                  'text',
                  {
                    style: { pointerEvent: 'none' },
                    fontSize: _this4.props.fontSize,
                    fill: d.fill,
                    stroke: d.stroke,
                    textAnchor: 'end',
                    dx: -15,
                    dy: dim.pathWidth / 2
                  },
                  d.label
                )
              ),
              _react2.default.createElement('path', {
                className: ch.VALUE_PATH,
                fill: d.fill,
                stroke: d.stroke
              }),
              _this4.props.circleRadius ? _react2.default.createElement('circle', { r: _this4.props.circleRadius, opacity: '0', fill: d.fill, stroke: d.stroke }) : null
            )
          );
        })
      );
    }
  }]);

  return Path;
}(_react.Component);

Path.propTypes = {
  animationTime: _react.PropTypes.number,
  animationEase: _react.PropTypes.string,
  values: _props.dataShape,
  background: _props.fillAndStroke,
  circleRadius: _react.PropTypes.number,
  fontSize: _react.PropTypes.number,
  endAngle: _react.PropTypes.number,
  shadow: _react.PropTypes.bool
};
Path.defaultProps = {
  background: {}
};
exports.default = Path;