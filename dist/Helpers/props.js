'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillAndStroke = exports.dataShape = undefined;

var _react = require('react');

var dataShape = exports.dataShape = _react.PropTypes.arrayOf(_react.PropTypes.shape({
  value: _react.PropTypes.number,
  label: _react.PropTypes.string,
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string
}));

var fillAndStroke = exports.fillAndStroke = _react.PropTypes.shape({
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string
});