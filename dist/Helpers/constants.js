'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var R = 'react-funnelchart';

var NO_DATA = exports.NO_DATA = 'React-Solidgauge needs the values prop to be set to render,\nplease set the property and try again,\nif you dont know how to set the property please check out https://github.com/arnthor3/react-solidgauge';

var UNEXPECTED_ERROR = exports.UNEXPECTED_ERROR = 'An Unexpected error occured please file open an\nissue on github containing description of the error';

var GROUP_ARC_CLASS = exports.GROUP_ARC_CLASS = R + '-arc';

var GROUP_ARC = exports.GROUP_ARC = 'g.' + GROUP_ARC_CLASS;

var BACKGROUND_PATH = exports.BACKGROUND_PATH = R + '-background';

var VALUE_PATH = exports.VALUE_PATH = R + '-value';

var MOUSE_PATH = exports.MOUSE_PATH = R + '-mouse';

var TEXT_LABEL = exports.TEXT_LABEL = R + '-label';

var animationTime = exports.animationTime = 1500;

var animationEase = exports.animationEase = 'easeBounce';