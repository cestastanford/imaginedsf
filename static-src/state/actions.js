/*
* Imports.
*/

import {
  MAP_POST_TYPE,
  MAP_GROUP_POST_TYPE,
  INITIAL_BOUNDS,
  GEOJSON_SOURCE_TYPE,
  GEOJSON_STATUS,
} from '../constants';


/*
* Defines action type constants.
*/

export const CONTENT_RECEIVED = 'CONTENT_RECEIVED';
export const GEOJSON_REQUESTED = 'GEOJSON_REQUESTED';
export const GEOJSON_RECEIVED = 'GEOJSON_RECEIVED';
export const SET_MAP_STATE = 'SET_MAP_STATE';
export const SET_ENABLED = 'SET_ENABLED';
export const SET_OPACITY = 'SET_OPACITY';
export const SET_POSITION = 'SET_POSITION';


/*
* Helper function to convert an array of ID'd objects into an object
* mapping from ID to object.
*/

const mapIdsToObjectKeys = (arr) => {
  const obj = {};
  arr.forEach((item) => { obj[item.ID] = item; });
  return obj;
};


/*
* Helper function to normalize and verify map content.  Excludes
* maps and map groups that are not a basemap or part of a proposal
* range and ensures that no maps or map groups are referenced  more
* than once.
*/

const getNormalizedMapContent = ({
  maps,
  map_groups: mapGroups,
  proposal_ranges: proposalRanges,
  basemaps,
}) => {
  const mapsAndGroupsById = {
    ...mapIdsToObjectKeys(maps),
    ...mapIdsToObjectKeys(mapGroups),
  };

  const validatedMapsAndGroupsById = {};

  const validate = (id, POST_TYPE) => {
    const mapOrGroup = mapsAndGroupsById[id];

    if (!mapOrGroup) {
      throw new Error(`Map or map group not found: ${id}`);
    }

    if (validatedMapsAndGroupsById[id]) {
      throw new Error(`Map or map group referenced multiple times: ${id}`);
    }

    if (POST_TYPE && mapOrGroup.post_type !== POST_TYPE) {
      throw new Error(`Map or map group referenced where not allowed: ${id}`);
    }

    if (mapOrGroup.post_type === MAP_GROUP_POST_TYPE) {
      try {
        mapOrGroup.fields.contents.forEach(
          (childMapOrGroup) => validate(childMapOrGroup),
        );
      } catch (e) {
        throw new Error(`${e.message} (child of map group ${id})`);
      }
    }

    delete mapsAndGroupsById[id];
    validatedMapsAndGroupsById[id] = mapOrGroup;
  };

  try {
    basemaps.forEach((id) => validate(id, MAP_POST_TYPE));
  } catch (e) {
    throw new Error(`${e.message} (basemap)`);
  }

  proposalRanges.forEach((range, index) => {
    try {
      range.contents.forEach((id) => validate(id));
    } catch (e) {
      throw new Error(`${e.message} (proposal range ${index})`);
    }
  });

  const geoJson = {};
  Object.entries(validatedMapsAndGroupsById).forEach(([id, item]) => {
    if (item.source_type === GEOJSON_SOURCE_TYPE) {
      geoJson[id] = GEOJSON_STATUS.NOT_REQUESTED;
    }
  });

  return {
    mapsAndGroups: validatedMapsAndGroupsById,
    proposalRanges,
    basemaps,
    geoJson,
  };
};


/*
* Helper function to get initial map state from the defaults set
* in WordPress.
*/

const getDefaultMapState = ({ mapsAndGroups }) => {
  const enabled = {};
  const opacity = {};

  Object.entries(mapsAndGroups).forEach(([id, item]) => {
    enabled[id] = item.fields.enabled_by_default;
    if (item.fields.source_type !== GEOJSON_SOURCE_TYPE) {
      opacity[id] = 1;
    }
  });

  return {
    enabled,
    opacity,

    //  center and zoomLevel left blank; map will use
    //  bounds to set center and zoomLevel on update.
    center: null,
    zoomLevel: null,
    bounds: INITIAL_BOUNDS,
  };
};


/*
* Defines synchronous action creators.
*/

export const contentReceived = (contentAreaContent, mapContent, narratives) => ({
  type: CONTENT_RECEIVED,
  contentAreaContent,
  mapContent,
  narratives,
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

export const setMapState = (mapState) => ({
  type: SET_MAP_STATE,
  mapState,
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
* Defines async action creators.
*/

//  Fetches site content
export const fetchContent = () => async (dispatch) => {
  const response = await fetch('/wp-json/imaginedsf/content');
  const parsedResponse = await response.json();

  const contentAreaContent = parsedResponse.content_area_content;
  const mapContent = getNormalizedMapContent(parsedResponse);
  const narratives = mapIdsToObjectKeys(parsedResponse.narratives);

  dispatch(contentReceived(contentAreaContent, mapContent, narratives));
  dispatch(setMapState(getDefaultMapState(mapContent)));
};


//  Fetches GeoJSON
export const fetchGeoJson = (id) => async (dispatch) => {
  dispatch(geoJsonRequested, id);
  const response = await fetch(`/wp-json/imaginedsf/geojson?layerId=${id}`);
  const parsedResponse = await response.json();
  dispatch(geoJsonReceived(id, parsedResponse));
};
