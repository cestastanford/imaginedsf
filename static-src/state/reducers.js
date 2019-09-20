/*
* Imports action type constants.
*/

import {
  MAP_POST_TYPE,
  MAP_GROUP_POST_TYPE,
  SAN_FRANCISCO_BOUNDS,
  GEOJSON_MAP_TYPE,
  GEOJSON_STATUS,
} from '../constants';

import {
  CONTENT_RECEIVED,
  GEOJSON_REQUESTED,
  GEOJSON_RECEIVED,
  SET_DEFAULT_MAP_STATE,
  SET_MAP_STATE_FROM_HASH,
  SET_ENABLED,
  SET_OPACITY,
  SET_POSITION,
} from './actions';


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

const normalizeMapContent = ({
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
    if (item.source_type === GEOJSON_MAP_TYPE) {
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
    if (item.fields.source_type !== GEOJSON_MAP_TYPE) {
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
    bounds: SAN_FRANCISCO_BOUNDS,
  };
};


/*
* Helper function to get initial map state from the URL hash.
*/

const getHashMapState = (hash) => {
  let hashMapState;

  try {
    const hashObject = JSON.parse(decodeURIComponent(hash.substring(1)));
    hashMapState = hashObject.mapState;
  } catch (e) {
    return null;
  }

  if (!hashMapState) {
    return null;
  }

  return {
    enabled: hashMapState.enabled,
    opacity: hashMapState.opacity,

    //  center and zoomLevel left blank; map will use
    //  bounds to set center and zoomLevel on update.
    center: null,
    zoomLevel: null,
    bounds: hashMapState.visibleMapBounds || SAN_FRANCISCO_BOUNDS,
  };
};


/*
*


/*
* Reducers.
*/

const contentAreaContent = (state = {}, action) => {
  switch (action.type) {
    //  Saves content area content when received
    case CONTENT_RECEIVED:
      return action.content.content_area_content;

    default:
      return state;
  }
};

const mapState = ({ mapState: state = {}, mapContent }, action) => {
  switch (action.type) {
    //  Sets map state based on WP defaults
    case SET_DEFAULT_MAP_STATE:
      return getDefaultMapState(mapContent);

    //  Sets map state based on URL hash
    case SET_MAP_STATE_FROM_HASH:
      return getHashMapState(action.hash) || state;

    //  Enables/disables a map or map group
    case SET_ENABLED:
      return {
        ...state,
        enabled: {
          ...state.enabled,
          [action.id]: action.enabled,
        },
      };

    //  Sets the opacity of a map
    case SET_OPACITY:
      return {
        ...state,
        opacity: {
          ...state.opacity,
          [action.id]: action.opacity,
        },
      };

    //  Sets the position of the map canvas. NOTE: center is relative
    //  to the visible map area, not the full map canvas.
    case SET_POSITION:
      return {
        ...state,
        center: action.center,
        zoomLevel: action.zoomLevel,
        bounds: action.bounds,
      };

    default:
      return state;
  }
};

const mapContent = (state = {}, action) => {
  switch (action.type) {
    //  Normalizes and saves map content when received
    case CONTENT_RECEIVED:
      return normalizeMapContent(action.content);

    //  Records that a GeoJSON download was started
    case GEOJSON_REQUESTED:
      return {
        ...state,
        geoJson: {
          ...state.geoJson,
          [action.id]: GEOJSON_STATUS.REQUESTED,
        },
      };

    //  Saves downloaded GeoJSON for vector layers
    case GEOJSON_RECEIVED:
      return {
        ...state,
        geoJson: {
          ...state.geoJson,
          [action.id]: action.geoJson,
        },
      };

    default:
      return state;
  }
};

const narratives = (state = {}, action) => {
  switch (action.type) {
    //  Saves narrative content when received
    case CONTENT_RECEIVED:
      return mapIdsToObjectKeys(action.content.narratives);

    default:
      return state;
  }
};

const rootReducer = (rootState = {}, action) => ({
  contentAreaContent: contentAreaContent(rootState.contentAreaContent, action),
  mapState: mapState(rootState, action), // Needs root state to set.
  mapContent: mapContent(rootState.mapContent, action),
  narratives: narratives(rootState.narratives, action),
});

export default rootReducer;
