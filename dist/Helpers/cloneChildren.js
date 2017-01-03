'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  This function clones the children and pass in the props
*/
exports.default = function (children, props) {
  return (
    // Clone the children and add props to components like data, width and heigth
    _react.Children.map(children, function (child) {
      // only pass data into Components not native browser elements
      var isComponent = typeof child.type !== 'string';
      if (isComponent) {
        var childProps = Object.assign({}, props, child.props);
        return _react2.default.cloneElement(child, childProps);
      }
      return _react2.default.cloneElement(child);
    })
  );
};