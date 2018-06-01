import React from 'react'
import {render} from 'react-dom'
import L from 'leaflet'

import DistanceMarkers from '../../src'
import './leaflet/leaflet.js'
import './leaflet/leaflet.css'

import {Map, TileLayer} from 'react-leaflet'

import {positions} from './positions.js'

const unit = 'metric'
const showDistanceMarkers = true

const distanceMarkers = {
  showAll: 13,
  offset: unit == 'metric'
    ? 1000
    : 1609.344, // 1000 for kilometers, 1609.344 for miles
  cssClass: showDistanceMarkers === true
    ? 'dist-marker'
    : 'dist-marker-hidden',
  iconSize: [
    24, 24
  ],
  lazy: false
}

const polyline = L.polyline(positions)
const bounds = polyline
  .getBounds()
  .pad(0)

const App = () => (
  <Map
    style={{
    height: '100vh'
  }}
    zoom={13}
    bounds={bounds}
    center={[51.505, -0.09]}>
    <TileLayer
      attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

    <DistanceMarkers
      color='#246dbf'
      weight={10}
      positions={positions}
      distanceMarkers={distanceMarkers}/>
  </Map>
)

render(
  <App/>, document.getElementById('root'))