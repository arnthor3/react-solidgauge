'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cloneChildren = require('./cloneChildren');

var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/*
  A template function that renders children if the condition is true
 */
var ReactIf = function ReactIf(props) {
  if (!props.condition) {
    return null;
  }

  var children = props.children,
      el = props.el,
      condition = props.condition,
      nochildren = _objectWithoutProperties(props, ['children', 'el', 'condition']);

  return _react2.default.cloneElement(props.el, { children: (0, _cloneChildren2.default)(children, nochildren) });
};

ReactIf.defaultProps = {
  el: _react2.default.createElement('span', null)
};

ReactIf.PropTypes = {
  // a boolean condition if true then render
  condition: _react.PropTypes.bool,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  // The user can pass in any element type
  // that will act as the parent node
  el: _react.PropTypes.node
};

exports.default = ReactIf;