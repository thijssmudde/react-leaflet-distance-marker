'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DistanceMarkers = require('./DistanceMarkers');

var _DistanceMarkers2 = _interopRequireDefault(_DistanceMarkers);

require('./lib/leaflet-distance-marker.js');

require('./lib/leaflet-distance-marker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DistanceMarkers2.default;