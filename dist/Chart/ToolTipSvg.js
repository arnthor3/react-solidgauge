"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  ToolTip is on Top
*/
var top = exports.top = function top(w, h) {
  var wt = w * 0.1;
  var ht = h * 0.1;
  var b = h - ht;
  return "M0 0 L" + w + " 0 L" + w + " " + b + " L" + (w / 2 + wt) + " " + b + " L" + w / 2 + " " + h + " L" + (w / 2 - wt) + " " + b + " L0 " + b + " Z";
};

/*
  ToolTip is on Bottom
*/
var bottom = exports.bottom = function bottom(w, h) {
  var wt = w * 0.1;
  var ht = h * 0.1;
  var b = h - ht;
  return "M0 " + ht + " L" + (w / 2 - wt) + " " + ht + " L" + w / 2 + " " + 0 + " L" + (w / 2 + wt) + " " + ht + " L" + w + " " + ht + " L" + w + " " + h + " L0 " + h + " Z";
};