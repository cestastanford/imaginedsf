/*
* WordPress custom post types.
*/

export const MAP_POST_TYPE = 'isf_map';
export const MAP_GROUP_POST_TYPE = 'isf_map_group';


/*
* Initial San Francisco bounds.
*/

export const INITIAL_BOUNDS = [[37.833996, -122.539439], [37.682302, -122.278852]];
export const PANNING_BOUNDS = [[37.933996, -122.639439], [37.582302, -122.178852]];


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
