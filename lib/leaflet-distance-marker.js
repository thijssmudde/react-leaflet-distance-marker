L.DistanceMarkers = L
  .LayerGroup
  .extend({
    initialize: function (line, map, options) {
      options = options || {}
      if (_.isEmpty(options)) {
        return
      }
      
      let offset = options.offset || 1000
      let showAll = Math.min(map.getMaxZoom(), options.showAll || 12)
      let cssClass = options.cssClass || 'dist-marker'
      let iconSize = options.iconSize !== undefined
        ? options.iconSize
        : [12, 12]

      let zoomLayers = {}
      // Get line coords as an array
      let coords = line
      if (typeof line.getLatLngs == 'function') {
        coords = line.getLatLngs()
      }
      // Get accumulated line lengths as well as overall length
      let accumulated = L
        .GeometryUtil
        .accumulatedLengths(line)
      let length = accumulated.length > 0
        ? accumulated[accumulated.length - 1]
        : 0
      // Position in accumulated line length array
      let j = 0
      // Number of distance markers to be added
      let count = Math.floor(length / offset)
      for (let i = 1; i <= count; ++i) {
        let distance = offset * i
        // Find the first accumulated distance that is greater than the distance of this
        // marker
        while (j < accumulated.length - 1 && accumulated[j] < distance) {
          ++j
        }
        // Now grab the two nearest points either side of distance marker position and
        // create a simple line to interpolate on
        let p1 = coords[j - 1]
        let p2 = coords[j]
        let m_line = L.polyline([p1, p2])
        let ratio = (distance - accumulated[j - 1]) / (accumulated[j] - accumulated[j - 1])

        let position = L
          .GeometryUtil
          .interpolateOnLine(map, m_line, ratio)
        let icon = L.divIcon({className: cssClass, html: i, iconSize: iconSize})
        let marker = L.marker(position.latLng, {
          title: i,
          icon: icon
        })

        // visible only starting at a specific zoom level
        let zoom = this._minimumZoomLevelForItem(i, showAll)
        if (zoomLayers[zoom] === undefined) {
          zoomLayers[zoom] = L.layerGroup()
        }
        zoomLayers[zoom].addLayer(marker)
      }

      let currentZoomLevel = 0
      let markerLayer = this
      let updateMarkerVisibility = function () {
        let oldZoom = currentZoomLevel
        let newZoom = currentZoomLevel = map.getZoom()

        if (newZoom > oldZoom) {
          for (let i = oldZoom + 1; i <= newZoom; ++i) {
            if (zoomLayers[i] !== undefined) {
              markerLayer.addLayer(zoomLayers[i])
            }
          }
        } else if (newZoom < oldZoom) {
          for (let i = oldZoom; i > newZoom; --i) {
            if (zoomLayers[i] !== undefined) {
              markerLayer.removeLayer(zoomLayers[i])
            }
          }
        }
      }
      map.on('zoomend', updateMarkerVisibility)

      this._layers = {} // need to initialize before adding markers to this LayerGroup
      updateMarkerVisibility()
    },

    _minimumZoomLevelForItem: function (item, showAllLevel) {
      let zoom = showAllLevel
      let i = item
      while (i > 0 && i % 2 === 0) {
        --zoom
        i = Math.floor(i / 2)
      }
      return zoom
    }
  })

L
  .Polyline
  .include({

    _originalOnAdd: L.Polyline.prototype.onAdd,
    _originalOnRemove: L.Polyline.prototype.onRemove,

    addDistanceMarkers: function () {
      if (this._map && this._distanceMarkers) {
        this
          ._map
          .addLayer(this._distanceMarkers)
      }
    },

    removeDistanceMarkers: function () {
      if (this._map && this._distanceMarkers) {
        this
          ._map
          .removeLayer(this._distanceMarkers)
      }
    },

    onAdd: function (map) {
      this._originalOnAdd(map)

      let opts = this.options.distanceMarkers || {}
      if (this._distanceMarkers === undefined) {
        this._distanceMarkers = new L.DistanceMarkers(this, map, opts)
      }
      if (opts.lazy === undefined || opts.lazy === false) {
        this.addDistanceMarkers()
      }
    },

    onRemove: function (map) {
      this.removeDistanceMarkers()
      this._originalOnRemove(map)
    }
  })