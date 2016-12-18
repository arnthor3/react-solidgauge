'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Label = function Label(_ref) {
  var data = _ref.data,
      fontSize = _ref.fontSize,
      fontSizeAuto = _ref.fontSizeAuto,
      startPathCoordinates = _ref.startPathCoordinates,
      pathWidth = _ref.pathWidth;
  return _react2.default.createElement(
    'g',
    {
      transform: 'translate(' + startPathCoordinates + ')'
    },
    _react2.default.createElement(
      'text',
      {
        style: {
          pointerEvent: 'none'
        },
        fontSize: fontSize,
        fill: data.fill,
        stroke: data.stroke,
        textAnchor: 'end',
        dx: -15,
        dy: fontSize / 2 + pathWidth / 4 || 0
      },
      data.label
    )
  );
};

Label.propTypes = {
  data: _react.PropTypes.shape({
    fill: _react.PropTypes.string,
    stroke: _react.PropTypes.string,
    label: _react.PropTypes.string
  }),
  fontSize: _react.PropTypes.string,
  startPathCoordinates: _react.PropTypes.string,
  pathWidth: _react.PropTypes.number,
  fontSizeAuto: _react.PropTypes.bool
};

Label.defaultProps = {
  fill: '#ddd',
  stroke: '#aaa',
  fontSize: '18'
};

exports.default = Label;