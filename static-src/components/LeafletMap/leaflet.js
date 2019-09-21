/*
* Imports
*/

import {
  Map,
  DivIcon,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  CRS,
  Point,
} from 'leaflet';


/*
* Converts at LatLng to an array: [lat, lng]
*/

export const latLngToArray = (latLng) => [latLng.lat, latLng.lng];


/*
* Converts a LatLngBounds to a two-dimensional array: [[lat1, lng1], [lat2, lng2]]
*/

export const latLngBoundsToArrays = (latLngBounds) => [
  latLngToArray(latLngBounds.getNorthEast()),
  latLngToArray(latLngBounds.getSouthWest()),
];


/*
* Creates a Leaflet Map.
*/

export const createMap = (mapContainer) => new Map(
  mapContainer,
  { zoomControl: false },
);


/*
* Extends DivIcon to define a custom marker icon.
*/

const MarkerIcon = DivIcon.extend({
  options: {
    html: '<i class="fa fa-map-marker custom-marker-icon"></i>',
    iconAnchor: [12, 48],
  },
});


/*
* Creates custom red and blue Marker subclasses from the custom
* DivIcon.
*/

export const BlueMarker = Marker.extend({
  options: { icon: new MarkerIcon({ className: 'blue-marker' }) },
});

export const RedMarker = Marker.extend({
  options: { icon: new MarkerIcon({ className: 'red-marker' }) },
});


/*
* Creates a popup for a vector feature marker.
*/

export const getFeaturePopup = (layer, feature) => {
  const popup = new Popup({

    offset: [0, -40],
    maxWidth: 200,

  });

  const popupContents = `
    <header>
      <h3>${layer.label}</h3>
      <h6>${layer.mapTitle}</h6>
    </header>
    <article>${JSON.stringify(feature.properties)}</article>
  `;

  return popup.setContent(popupContents);
};


/*
* Creates a WMS layer.
*/

export const createWmsLayer = (layer, index) => new TileLayer.WMS(
  layer.wms_base_url,
  {
    transparent: true,
    tiled: true,
    format: 'image/png',
    layers: layer.wms_layers,
    minNativeZoom: layer.wms_min_zoom ? +layer.wms_min_zoom : undefined,
    maxNativeZoom: layer.wms_max_zoom ? +layer.wms_max_zoom : undefined,
    zIndex: index,
  },
);


/*
* Creates a GeoJSON layer.
*/

export const createGeoJsonLayer = (layer) => new GeoJSON(
  null,
  {
    pointToLayer: (point, latLng) => {
      const marker = new RedMarker(latLng);
      const popup = getFeaturePopup(layer, point);
      return marker.bindPopup(popup);
    },
  },
);


/*
* Returns a `coordsToLatLng` function for the GeoJSON layer based
* on the projection defined in the GeoJSON.
*/

export const getCoordsToLatLngFn = (geoJson) => {
  let projection = CRS.EPSG3857;
  if (geoJson && geoJson.crs && geoJson.crs.properties && geoJson.crs.properties.name) {
    switch (geoJson.crs.properties.name) {
      case 'urn:ogc:def:crs:EPSG::4326':
        projection = CRS.EPSG4326;
        break;

      default:
        projection = CRS.EPSG3857;
    }
  }

  return (coords) => {
    const projectedCoordinate = new Point(coords[0], coords[1]);
    return projection.unproject(projectedCoordinate);
  };
};


/*
* Creates a Tile layer.
*/

export const createTileLayer = (layer, index) => new TileLayer(
  layer.tile_url,
  {
    zIndex: index,
    minNativeZoom: layer.min_tile_zoom ? +layer.min_tile_zoom : undefined,
    maxNativeZoom: layer.max_tile_zoom ? +layer.max_tile_zoom : undefined,
  },
);
