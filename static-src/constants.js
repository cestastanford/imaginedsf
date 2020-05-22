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

export const SF_BOUNDS = new LatLngBounds([
  [37.8224, -122.5386], // NW
  [37.6888, -122.3486], // SE
]);

export const MAX_BOUNDS = new LatLngBounds([
  [
    SF_BOUNDS.getNorth() - (SF_BOUNDS.getSouth() - SF_BOUNDS.getNorth()) * 1, // North
    SF_BOUNDS.getWest() - (SF_BOUNDS.getEast() - SF_BOUNDS.getWest()) * 1.5, // West
  ],
  [
    SF_BOUNDS.getSouth() - (SF_BOUNDS.getNorth() - SF_BOUNDS.getSouth()) * 1.25, // South
    SF_BOUNDS.getEast() - (SF_BOUNDS.getWest() - SF_BOUNDS.getEast()) * 1.25, // East
  ],
]);

export const MIN_ZOOM = 12;
export const MAX_ZOOM = 18;
export const ZOOM_SNAP = 0.25;


/*
* Map types.
*/

export const RASTER_WMS_SOURCE_TYPE = 'wms';
export const RASTER_TILE_SOURCE_TYPE = 'tile';
export const VECTOR_WFS_SOURCE_TYPE = 'wfs';
export const VECTOR_GEOJSON_SOURCE_TYPE = 'geojson';


/*
* Status enum for GeoJSON download.
*/

export const GEOJSON_STATUS = {
  NOT_REQUESTED: 'not_requested',
  REQUESTED: 'requested',
};


/*
* Coordinate locations of bounds of img/sf-outline.png.
*/

export const SF_OUTLINE_BOUNDS = new LatLngBounds([
  [37.859997, -122.605627], // NW
  [37.646911, -122.287359], // SE
]);


/*
* When zooming into a location, this is the amount of padding on
* each size (in meters) that determines the zoom level.
*/

export const ZOOM_TO_LOCATION_PADDING = 500;


/*
* When determining if the map is zoomed into a location, this is
* the tolerance in degrees of latitude/longitude.
*/

export const IS_ZOOMED_TO_LOCATION_TOLERANCE = 0.0001;


/*
* Routes used in the app.
*/

export const INTRODUCTION_ROUTE = '/introduction';
export const BIBLIOGRAPHY_ROUTE = '/bibliography';
export const CREDITS_ROUTE = '/credits';
export const FEEDBACK_ROUTE = '/feedback';
export const SHARE_ROUTE = '/share';
export const DESCRIPTION_ROUTE = '/description';
export const PROPOSAL_MAPS_ROUTE = '/proposal-maps';
export const NARRATIVES_ROUTE = '/narratives';
