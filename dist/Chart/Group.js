'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cloneChildren = require('../Helpers/cloneChildren');

var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Group = function Group(props) {
  var children = props.children,
      noChildren = _objectWithoutProperties(props, ['children']);
  // Clone the children and pass in the props and state


  var clonedChildren = (0, _cloneChildren2.default)(props.children, props);

  return _react2.default.createElement(
    'g',
    { transform: 'translate(0, ' + props.chartMargin / 2 + ')' },
    clonedChildren
  );
};

Group.propTypes = {
  chartMargin: _react.PropTypes.number,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node])
};

exports.default = Group;