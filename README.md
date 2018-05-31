# react-leaflet-distance-marker

Plugin for React-Leaflet to display markers along a route at equivalent distances.

Thanks to https://github.com/adoroszlai. This react plugin is 100% based on his work.

## Example

[Demo MyRoutes.io](http://myroutes.io/)

## Installation

```
yarn add react-leaflet-distance-marker
```

```javascript
// Set up options object
const showDistanceMarkers = true
const distanceMarkers = {
  showAll: 13,
  offset: 1000, // 1000 for kilometers, 1609.344 for miles
  cssClass: showDistanceMarkers === true
    ? 'dist-marker'
    : 'dist-marker-hidden',
  iconSize: [24, 24]
}

// Inside your <Map> component add
<DistanceMarkers 
  positions={positions}
  color={trackColor}
  opacity={1}
  weight={10}
  distanceMarkers={distanceMarkers}
  lazy={false}/>
```

## Options

 * **offset**: distance in meters between the markers (default: 1000 (= 1 km))
 * **showAll**: the zoom level at which all distance markers will be shown -- zooming out once from this level will remove approximately half of the markers (default: 12)
 * **lazy**: postpone adding the markers until Polyline.addDistanceMarkers is explicitly called (default: false)
 * **cssClass**: CSS class to set on marker icons
 * **iconSize**: size of the marker icon in pixels; type: [L.Point](http://leafletjs.com/reference.html#point) or array (default: `[12, 12]`); set to `null` to allow sizing via CSS class (see example on `icon-size` branch)

## Programatically adding and removing distance markers

If you want to edit the visibility you have two options.
1. Provide an hidden cssClass 'dist-marker-hidden' that you control yourself
2. Programatically call addDistanceMarkers or removeDistanceMarkers

```javascript
// In some function that you call later
this.distancemarkers.addDistanceMarkers()

// Create the reference
<DistanceMarkers {...otherProps} ref={(ref) => this.distancemarkers = ref}/>
```

## Dependencies

* [React-Leaflet](https://github.com/PaulLeCam/react-leaflet)
* [Leaflet](https://github.com/Leaflet/Leaflet)
* [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil)

This should be installed automagically
