import L from 'leaflet'
import {Polyline} from 'react-leaflet'

import './lib/leaflet-distance-marker.js'
import './lib/leaflet-distance-marker.css'

// Converts the leaflet-distance-marker to React Component
export default class DistanceMarkers extends Polyline {
  createLeafletElement(props) {
    const {positions, ...otherProps} = props
    const {map} = this.context

    this.polyline = new L.Polyline(positions, {
     ...otherProps
    }).addTo(map)
    
    return this.polyline
  }

  updateLeafletElement(fromProps, toProps) {
    const {map} = this.context

    this.polyline.removeFrom(map) // Resets
    this.createLeafletElement(toProps) // To redraw Distance Markers
  }

  addDistanceMarkers = () => {
    this.polyline.addDistanceMarkers()
  }

  removeDistanceMarkers = () => {
    this.polyline.removeDistanceMarkers()
  }
}

import PropTypes from 'prop-types'

DistanceMarkers.propTypes = {
  positions: PropTypes.array
}