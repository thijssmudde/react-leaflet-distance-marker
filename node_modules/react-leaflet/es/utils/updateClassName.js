import _forEach from 'lodash-es/forEach';
import { DomUtil } from 'leaflet';


var splitClassName = function splitClassName() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return className.split(' ').filter(Boolean);
};

export default (function (container, prevClassName, nextClassName) {
  if (container != null && nextClassName !== prevClassName) {
    if (prevClassName != null && prevClassName.length > 0) {
      _forEach(splitClassName(prevClassName), function (cls) {
        DomUtil.removeClass(container, cls);
      });
    }
    if (nextClassName != null && nextClassName.length > 0) {
      _forEach(splitClassName(nextClassName), function (cls) {
        DomUtil.addClass(container, cls);
      });
    }
  }
});