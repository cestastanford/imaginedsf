/*
* WordPress custom post types.
*/

export const MAP_POST_TYPE = 'isf_map';
export const MAP_GROUP_POST_TYPE = 'isf_map_group';


/*
* Initial San Francisco bounds.
*/

export const SAN_FRANCISCO_BOUNDS = [[37.833996, -122.539439], [37.682302, -122.278852]];
export const SAN_FRANCISCO_PANNING_BOUNDS = [[37.933996, -122.639439], [37.582302, -122.178852]];


/*
* Map types.
*/

export const TILE_MAP_TYPE = 'tiles';
export const WMS_MAP_TYPE = 'wms_png';
export const GEOJSON_MAP_TYPE = 'wfs_geojson';


/*
* Status enum for GeoJSON download.
*/

export const GEOJSON_STATUS = {
  NOT_REQUESTED: 'GEOJSON_NOT_REQUESTED',
  REQUESTED: 'GEOJSON_REQUESTED',
};
