'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextLength = exports.doubleArc = exports.getValueScale = exports.getRadius = exports.getDimensions = undefined;

var _d3Shape = require('d3-shape');

var _d3Scale = require('d3-scale');

var getDimensions = exports.getDimensions = function getDimensions(_ref) {
  var width = _ref.width,
      height = _ref.height,
      chartMargin = _ref.chartMargin,
      pathWidth = _ref.pathWidth,
      pathMargin = _ref.pathMargin;

  var groupHeight = height - chartMargin;
  var groupWidth = width - chartMargin;
  var fullRadius = Math.min(groupHeight / 2, groupWidth / 2);
  var pWidth = fullRadius * pathWidth;
  var pMargin = fullRadius * pathMargin;
  return {
    groupHeight: groupHeight,
    groupWidth: groupWidth,
    marginAndWidth: pWidth + pMargin,
    pathMargin: pMargin,
    pathWidth: pWidth
  };
};

var getRadius = exports.getRadius = function getRadius(_ref2, iter, endAngle) {
  var groupWidth = _ref2.groupWidth,
      groupHeight = _ref2.groupHeight,
      pathWidth = _ref2.pathWidth,
      pathMargin = _ref2.pathMargin,
      marginAndWidth = _ref2.marginAndWidth;

  var cX = groupWidth / 2 - iter * marginAndWidth;
  var cY = groupHeight / 2 - iter * marginAndWidth;
  var r = Math.min(cX, cY);
  var thisArc = (0, _d3Shape.arc)().outerRadius(r).innerRadius(r - pathWidth).startAngle(0).endAngle(endAngle);

  return {
    thisArc: thisArc,
    cX: cX,
    cY: cY,
    r: r
  };
};

var getValueScale = exports.getValueScale = function getValueScale(_ref3) {
  var values = _ref3.values,
      endAngle = _ref3.endAngle;
  return (0, _d3Scale.scaleLinear)().range([0, endAngle]).domain([0, 100]);
};

var doubleArc = exports.doubleArc = function doubleArc(thisArc) {
  return (0, _d3Shape.arc)().outerRadius(thisArc.outerRadius()()).innerRadius(thisArc.innerRadius()()).startAngle(thisArc.startAngle()()).endAngle(thisArc.endAngle()() * 2);
};

var getTextLength = exports.getTextLength = function getTextLength(node) {
  return node.getComputedTextLength() * 1.1;
};