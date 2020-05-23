/*
* Imports
*/

import {
  TileLayer,
  GridLayer,
  GeoJSON,
  CRS,
  Point,
  Marker,
  DivIcon,
} from 'leaflet';
import marked from 'marked';

import { MIN_ZOOM, MAX_ZOOM, IMAGE_ROUTE } from '../../constants';


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
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    minNativeZoom: map.tile_zoom.min_tile_zoom ? +map.tile_zoom.min_tile_zoom : undefined,
    maxNativeZoom: map.tile_zoom.max_tile_zoom ? +map.tile_zoom.max_tile_zoom : undefined,
    zIndex: index,
  },
);


/*
* Creates a GeoJSON layer.
*/

export const createGeoJsonLayer = ({
  points: {
    directional_pins: directional,
    pin_direction_property_key: directionKey,
    popup_images_property_key: imagesKey,
    popup_text_property_key: textKey,
  },
}, history) => new GeoJSON(null, {
  pointToLayer(point, latLng) {
    const images = (
      imagesKey
      && point.properties[imagesKey]
      && point.properties[imagesKey].split(/\s*,\s*/)
        .filter((imageUrl) => imageUrl)
        .map((imageUrl) => `<img class="vector-point-popup-image" src="${imageUrl}">`)
        .join('')
    ) || '';

    const text = marked((textKey && point.properties[textKey]) || '');
    const iconElement = document.createElement('div');
    iconElement.classList.add('vector-point-pin');
    if (directional) {
      iconElement.classList.add('vector-point-pin-directional');
      iconElement.style.transform = `rotate(${point.properties[directionKey]}deg)`;
    }

    const marker = new Marker(latLng, {
      icon: new DivIcon({
        iconSize: [28, 28],
        html: iconElement,
        className: (images || text) ? null : 'vector-point-pin-container-no-marker',
      }),
    });

    if (images || text) {
      const popupContent = document.createElement('div');
      popupContent.className = 'vector-point-popup-content content';
      popupContent.innerHTML = `${images}${text}`;
      popupContent.querySelectorAll('.vector-point-popup-image').forEach(
        (img) => img.addEventListener('click', ({ target: { src } }) => {
          history.push(
            `${IMAGE_ROUTE}/${btoa(src)}${history.location.hash}`,
          );
        }),
      );

      marker.bindPopup(popupContent, {
        offset: [0, -16],
        minWidth: images ? 500 : 250,
        maxWidth: 500,
        autoPanPaddingTopLeft: [592, 20],
        autoPanPaddingBottomRight: [20, 20],
        className: 'vector-point-popup-container',
      })
        .on('popupopen', () => iconElement.classList.add('vector-point-pin-selected'))
        .on('popupclose', () => iconElement.classList.remove('vector-point-pin-selected'));
    }

    return marker;
  },
});


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
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    minNativeZoom: map.tile_zoom.min_tile_zoom ? +map.tile_zoom.min_tile_zoom : undefined,
    maxNativeZoom: map.tile_zoom.max_tile_zoom ? +map.tile_zoom.max_tile_zoom : undefined,
  },
);
