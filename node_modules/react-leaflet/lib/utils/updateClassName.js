'use strict';

exports.__esModule = true;

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _leaflet = require('leaflet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitClassName = function splitClassName() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return className.split(' ').filter(Boolean);
};

exports.default = function (container, prevClassName, nextClassName) {
  if (container != null && nextClassName !== prevClassName) {
    if (prevClassName != null && prevClassName.length > 0) {
      (0, _forEach3.default)(splitClassName(prevClassName), function (cls) {
        _leaflet.DomUtil.removeClass(container, cls);
      });
    }
    if (nextClassName != null && nextClassName.length > 0) {
      (0, _forEach3.default)(splitClassName(nextClassName), function (cls) {
        _leaflet.DomUtil.addClass(container, cls);
      });
    }
  }
};