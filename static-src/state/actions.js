/*
* Defines action type constants.
*/

export const CONTENT_RECEIVED = 'CONTENT_RECEIVED';
export const GEOJSON_RECEIVED = 'GEOJSON_RECEIVED';
export const SET_DEFAULT_MAP_STATE = 'SET_DEFAULT_MAP_STATE';
export const SET_MAP_STATE_FROM_HASH = 'SET_MAP_STATE_FROM_HASH';
export const SET_ENABLED = 'SET_ENABLED';
export const SET_OPACITY = 'SET_OPACITY';
export const SET_POSITION = 'SET_POSITION';


/*
* Defines synchronous action creators.
*/

export const contentReceived = (content) => ({
  type: CONTENT_RECEIVED,
  content,
});

export const geoJsonRequested = (id) => ({
  type: GEOJSON_REQUESTED,
  id,
});

export const geoJsonReceived = (id, geoJson) => ({
  type: GEOJSON_RECEIVED,
  id,
  geoJson,
});

export const setDefaultMapState = () => ({
  type: SET_DEFAULT_MAP_STATE,
});

export const setMapStateFromHash = (hash) => ({
  type: SET_MAP_STATE_FROM_HASH,
  hash,
});

export const setEnabled = (id, enabled) => ({
  type: SET_ENABLED,
  id,
  enabled,
});

export const setOpacity = (id, opacity) => ({
  type: SET_OPACITY,
  id,
  opacity,
});

export const setPosition = (center, zoomLevel, bounds) => ({
  type: SET_POSITION,
  center,
  zoomLevel,
  bounds,
});


/*
* Defines asynchronous action creators.
*/

//  Fetches site content
export const fetchContent = () => async (dispatch) => {
  const response = await fetch('/wp-json/imaginedsf/content');
  const parsedResponse = await response.json();
  dispatch(contentReceived(parsedResponse));
};

//  Fetches GeoJSON
export const fetchGeoJson = (id) => async (dispatch) => {
  dispatch(geoJsonRequested, id);
  const response = await fetch(`/wp-json/imaginedsf/geojson?layerId=${id}`);
  const parsedResponse = await response.json();
  dispatch(geoJsonReceived(id, parsedResponse));
};
