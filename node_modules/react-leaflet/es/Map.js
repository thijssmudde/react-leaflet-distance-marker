import _omit from 'lodash-es/omit';
import _isUndefined from 'lodash-es/isUndefined';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

import { latLngBounds, Map as LeafletMap } from 'leaflet';

import PropTypes from 'prop-types';
import React from 'react';

import MapComponent from './MapComponent';
import bounds from './propTypes/bounds';
import children from './propTypes/children';
import latlng from './propTypes/latlng';
import layerContainer from './propTypes/layerContainer';
import map from './propTypes/map';
import viewport from './propTypes/viewport';
import updateClassName from './utils/updateClassName';


var OTHER_PROPS = ['children', 'className', 'id', 'style', 'useFlyTo', 'whenReady'];

var normalizeCenter = function normalizeCenter(pos) {
  return Array.isArray(pos) ? [pos[0], pos[1]] : [pos.lat, pos.lon ? pos.lon : pos.lng];
};

var Map = function (_MapComponent) {
  _inherits(Map, _MapComponent);

  function Map(props, context) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, _MapComponent.call(this, props, context));

    _this.viewport = {
      center: undefined,
      zoom: undefined
    };
    _this._updating = false;

    _this.onViewportChange = function () {
      var center = _this.leafletElement.getCenter();
      _this.viewport = {
        center: center ? [center.lat, center.lng] : undefined,
        zoom: _this.leafletElement.getZoom()
      };
      if (_this.props.onViewportChange && !_this._updating) {
        _this.props.onViewportChange(_this.viewport);
      }
    };

    _this.onViewportChanged = function () {
      if (_this.props.onViewportChanged && !_this._updating) {
        _this.props.onViewportChanged(_this.viewport);
      }
    };

    _this.bindContainer = function (container) {
      _this.container = container;
    };

    _this.className = props.className;
    return _this;
  }

  Map.prototype.getChildContext = function getChildContext() {
    return {
      layerContainer: this.leafletElement,
      map: this.leafletElement
    };
  };

  Map.prototype.createLeafletElement = function createLeafletElement(props) {
    var viewport = props.viewport,
        options = _objectWithoutProperties(props, ['viewport']);

    if (viewport) {
      if (viewport.center) {
        options.center = viewport.center;
      }
      if (typeof viewport.zoom === 'number') {
        options.zoom = viewport.zoom;
      }
    }
    return new LeafletMap(this.container, options);
  };

  Map.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    this._updating = true;

    var animate = toProps.animate,
        bounds = toProps.bounds,
        boundsOptions = toProps.boundsOptions,
        boxZoom = toProps.boxZoom,
        center = toProps.center,
        className = toProps.className,
        doubleClickZoom = toProps.doubleClickZoom,
        dragging = toProps.dragging,
        keyboard = toProps.keyboard,
        maxBounds = toProps.maxBounds,
        scrollWheelZoom = toProps.scrollWheelZoom,
        tap = toProps.tap,
        touchZoom = toProps.touchZoom,
        useFlyTo = toProps.useFlyTo,
        viewport = toProps.viewport,
        zoom = toProps.zoom;


    updateClassName(this.container, fromProps.className, className);

    if (viewport && viewport !== fromProps.viewport) {
      var c = viewport.center ? viewport.center : center;
      var z = viewport.zoom == null ? zoom : viewport.zoom;
      if (useFlyTo === true) {
        this.leafletElement.flyTo(c, z, { animate: animate });
      } else {
        this.leafletElement.setView(c, z, { animate: animate });
      }
    } else if (center && this.shouldUpdateCenter(center, fromProps.center)) {
      if (useFlyTo === true) {
        this.leafletElement.flyTo(center, zoom, { animate: animate });
      } else {
        this.leafletElement.setView(center, zoom, { animate: animate });
      }
    } else if (typeof zoom === 'number' && zoom !== fromProps.zoom) {
      if (fromProps.zoom == null) {
        this.leafletElement.setView(center, zoom);
      } else {
        this.leafletElement.setZoom(zoom);
      }
    }

    if (maxBounds && this.shouldUpdateBounds(maxBounds, fromProps.maxBounds)) {
      this.leafletElement.setMaxBounds(maxBounds);
    }

    if (bounds && (this.shouldUpdateBounds(bounds, fromProps.bounds) || boundsOptions !== fromProps.boundsOptions)) {
      if (useFlyTo === true) {
        this.leafletElement.flyToBounds(bounds, boundsOptions);
      } else {
        this.leafletElement.fitBounds(bounds, boundsOptions);
      }
    }

    if (boxZoom !== fromProps.boxZoom) {
      if (boxZoom === true) {
        this.leafletElement.boxZoom.enable();
      } else {
        this.leafletElement.boxZoom.disable();
      }
    }

    if (doubleClickZoom !== fromProps.doubleClickZoom) {
      if (doubleClickZoom === true) {
        this.leafletElement.doubleClickZoom.enable();
      } else {
        this.leafletElement.doubleClickZoom.disable();
      }
    }

    if (dragging !== fromProps.dragging) {
      if (dragging === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }

    if (keyboard !== fromProps.keyboard) {
      if (keyboard === true) {
        this.leafletElement.keyboard.enable();
      } else {
        this.leafletElement.keyboard.disable();
      }
    }

    if (scrollWheelZoom !== fromProps.scrollWheelZoom) {
      if (scrollWheelZoom === true || typeof scrollWheelZoom === 'string') {
        this.leafletElement.options.scrollWheelZoom = scrollWheelZoom;
        this.leafletElement.scrollWheelZoom.enable();
      } else {
        this.leafletElement.scrollWheelZoom.disable();
      }
    }

    if (tap !== fromProps.tap) {
      if (tap === true) {
        this.leafletElement.tap.enable();
      } else {
        this.leafletElement.tap.disable();
      }
    }

    if (touchZoom !== fromProps.touchZoom) {
      if (touchZoom === true || typeof touchZoom === 'string') {
        this.leafletElement.options.touchZoom = touchZoom;
        this.leafletElement.touchZoom.enable();
      } else {
        this.leafletElement.touchZoom.disable();
      }
    }

    this._updating = false;
  };

  Map.prototype.componentDidMount = function componentDidMount() {
    var props = _omit(this.props, OTHER_PROPS);
    this.leafletElement = this.createLeafletElement(props);

    this.leafletElement.on('move', this.onViewportChange);
    this.leafletElement.on('moveend', this.onViewportChanged);

    if (!_isUndefined(props.bounds)) {
      this.leafletElement.fitBounds(props.bounds, props.boundsOptions);
    }

    if (this.props.whenReady) {
      this.leafletElement.whenReady(this.props.whenReady);
    }

    _MapComponent.prototype.componentDidMount.call(this);
    this.forceUpdate(); // Re-render now that leafletElement is created
  };

  Map.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.updateLeafletElement(prevProps, this.props);
  };

  Map.prototype.componentWillUnmount = function componentWillUnmount() {
    _MapComponent.prototype.componentWillUnmount.call(this);

    this.leafletElement.off('move', this.onViewportChange);
    this.leafletElement.off('moveend', this.onViewportChanged);

    // The canvas renderer uses requestAnimationFrame, making a deferred call to a deleted object
    // When preferCanvas is set, use simpler teardown logic
    if (this.props.preferCanvas === true) {
      this.leafletElement._initEvents(true);
      this.leafletElement._stop();
    } else {
      this.leafletElement.remove();
    }
  };

  Map.prototype.shouldUpdateCenter = function shouldUpdateCenter(next, prev) {
    if (!prev) return true;
    next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  };

  Map.prototype.shouldUpdateBounds = function shouldUpdateBounds(next, prev) {
    return prev ? !latLngBounds(next).equals(latLngBounds(prev)) : true;
  };

  Map.prototype.render = function render() {
    var map = this.leafletElement;
    var children = map ? this.props.children : null;

    return React.createElement(
      'div',
      {
        className: this.className,
        id: this.props.id,
        ref: this.bindContainer,
        style: this.props.style },
      children
    );
  };

  return Map;
}(MapComponent);

Map.propTypes = {
  animate: PropTypes.bool,
  bounds: bounds,
  boundsOptions: PropTypes.object,
  center: latlng,
  children: children,
  className: PropTypes.string,
  id: PropTypes.string,
  maxBounds: bounds,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  style: PropTypes.object,
  useFlyTo: PropTypes.bool,
  viewport: viewport,
  whenReady: PropTypes.func,
  zoom: PropTypes.number
};
Map.childContextTypes = {
  layerContainer: layerContainer,
  map: map
};
export default Map;