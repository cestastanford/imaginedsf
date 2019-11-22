/*
* Imports
*/

import {
  TileLayer,
  GridLayer,
  GeoJSON,
  CRS,
  Point,
} from 'leaflet';


/*
* Fixes lines lines between tiles (https://github.com/Leaflet/Leaflet/issues/3575#issuecomment-543138318).
*/

const originalInitTile = GridLayer.prototype._initTile; // eslint-disable-line no-underscore-dangle
GridLayer.include({
  _initTile(tile) { // eslint-disable-line no-underscore-dangle
    originalInitTile.call(this, tile);

    const tileSize = this.getTileSize();

    tile.style.width = `${tileSize.x + 1}px`; // eslint-disable-line no-param-reassign
    tile.style.height = `${tileSize.y + 1}px`; // eslint-disable-line no-param-reassign
  },
});


/*
* Converts at LatLng to an array: [lat, lng]
*/

export const latLngToArray = (latLng) => [latLng.lat, latLng.lng];


/*
* Converts a LatLngBounds to a two-dimensional array: [[lat1, lng1], [lat2, lng2]]
*/

export const latLngBoundsToArrays = (latLngBounds) => [
  latLngToArray(latLngBounds.getNorthWest()),
  latLngToArray(latLngBounds.getSouthEast()),
];


/*
* Creates a WMS layer.
*/

export const createWmsLayer = (map, index) => new TileLayer.WMS(
  map.wms.url,
  {
    transparent: true,
    tiled: true,
    format: 'image/png',
    layers: map.wms.layers,
    minNativeZoom: map.tile_zoom.min_zoom ? +map.tile_zoom.min_zoom : undefined,
    maxNativeZoom: map.tile_zoom.max_zoom ? +map.tile_zoom.max_zoom : undefined,
    zIndex: index,
  },
);


/*
* Creates a GeoJSON layer.
*/

export const createGeoJsonLayer = () => new GeoJSON(null);


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

export const createTileLayer = (map, index) => new TileLayer(
  map.tile.url,
  {
    zIndex: index,
    minNativeZoom: map.tile_zoom.min_tile_zoom ? +map.tile_zoom.min_tile_zoom : undefined,
    maxNativeZoom: map.tile_zoom.max_tile_zoom ? +map.tile_zoom.max_tile_zoom : undefined,
  },
);
