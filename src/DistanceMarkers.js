import L from 'leaflet'
import {Polyline} from 'react-leaflet'

// Converts leaflet-distance-marker to a React Component
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