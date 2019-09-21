/*
* Imports
*/

import { LatLngBounds } from 'leaflet';


/*
* WordPress custom post types.
*/

export const MAP_POST_TYPE = 'isf_map';
export const MAP_GROUP_POST_TYPE = 'isf_map_group';


/*
* Initial map bounds.
*/

export const INITIAL_BOUNDS = [
  [37.6888, -122.5386], // NW
  [37.8224, -122.3486], // SE
];

export const MAX_BOUNDS = [
  [
    INITIAL_BOUNDS[0][0] - (INITIAL_BOUNDS[1][0] - INITIAL_BOUNDS[0][0]) * 1.25, // North
    INITIAL_BOUNDS[0][1] - (INITIAL_BOUNDS[1][1] - INITIAL_BOUNDS[0][1]) * 1.5, // West
  ],
  [
    INITIAL_BOUNDS[1][0] - (INITIAL_BOUNDS[0][0] - INITIAL_BOUNDS[1][0]) * 1, // South
    INITIAL_BOUNDS[1][1] - (INITIAL_BOUNDS[0][1] - INITIAL_BOUNDS[1][1]) * 1.25, // East
  ],
];

export const INITIAL_CENTER = new LatLngBounds(INITIAL_BOUNDS).getCenter();
export const INITIAL_ZOOM = 13;
export const MIN_ZOOM = 12;


/*
* Map types.
*/

export const TILE_SOURCE_TYPE = 'tiles';
export const WMS_SOURCE_TYPE = 'wms_png';
export const GEOJSON_SOURCE_TYPE = 'wfs_geojson';


/*
* Status enum for GeoJSON download.
*/

export const GEOJSON_STATUS = {
  NOT_REQUESTED: 'not_requested',
  REQUESTED: 'requested',
};
