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
export const SET_ONLY_SHOW_PROPOSAL_MAPS_IN_VISIBLE_AREA = 'SET_ONLY_SHOW_PROPOSAL_MAPS_IN_VISIBLE_AREA';
export const SET_CURRENT_NARRATIVE = 'SET_CURRENT_NARRATIVE';
export const SET_NARRATIVE_SCROLL_POSITION = 'SET_NARRATIVE_SCROLL_POSITION';


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
    if (validatedMapsAndGroupsById[id]) {
      throw new Error(`Map or map group referenced multiple times: ${id}`);
    }

    const mapOrGroup = mapsAndGroupsById[id];

    if (!mapOrGroup) {
      throw new Error(`Map or map group not found: ${id}`);
    }

    if (POST_TYPE && mapOrGroup.post_type !== POST_TYPE) {
      throw new Error(`Map or map group referenced where not allowed: ${id}`);
    }

    if (mapOrGroup.post_type === MAP_GROUP_POST_TYPE) {
      try {
        mapOrGroup.children.forEach(
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
      range.children.forEach((id) => validate(id));
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

const getDefaultMapStateFromMapContent = ({ mapsAndGroups }) => {
  const enabled = {};
  const opacity = {};

  Object.entries(mapsAndGroups).forEach(([id, item]) => {
    enabled[id] = item.enabled_by_default;
    if (item.source_type !== GEOJSON_SOURCE_TYPE) {
      opacity[id] = 1;
    }
  });

  return {
    enabled,
    opacity,
    bounds: INITIAL_BOUNDS,
  };
};


/*
* Defines synchronous action creators.
*/

export const contentReceived = (content) => ({
  type: CONTENT_RECEIVED,
  ...content,
});

export const geoJsonRequested = (mapId) => ({
  type: GEOJSON_REQUESTED,
  mapId,
});

export const geoJsonReceived = (mapId, geoJson) => ({
  type: GEOJSON_RECEIVED,
  mapId,
  geoJson,
});

export const setMapState = (mapState) => ({
  type: SET_MAP_STATE,
  mapState,
});

export const setEnabled = (mapId, enabled) => ({
  type: SET_ENABLED,
  mapId,
  enabled,
});

export const setOpacity = (mapId, opacity) => ({
  type: SET_OPACITY,
  mapId,
  opacity,
});

export const setPosition = (center, zoom, bounds) => ({
  type: SET_POSITION,
  center,
  zoom,
  bounds,
});

export const setOnlyShowProposalMapsInVisibleArea = (onlyShowProposalMapsInVisibleArea) => ({
  type: SET_ONLY_SHOW_PROPOSAL_MAPS_IN_VISIBLE_AREA,
  onlyShowProposalMapsInVisibleArea,
});

export const setCurrentNarrative = (narrativeId) => ({
  type: SET_CURRENT_NARRATIVE,
  narrativeId,
});

export const setNarrativeScrollPosition = (narrativeScrollPosition) => ({
  type: SET_NARRATIVE_SCROLL_POSITION,
  narrativeScrollPosition,
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
  const narratives = parsedResponse.narratives.map((n) => n.ID);
  const narrativesById = mapIdsToObjectKeys(parsedResponse.narratives);

  dispatch(contentReceived({
    contentAreaContent,
    mapContent,
    narratives,
    narrativesById,
  }));

  dispatch(setMapState(getDefaultMapStateFromMapContent(mapContent)));
};


//  Fetches GeoJSON
export const fetchGeoJson = (id) => async (dispatch) => {
  dispatch(geoJsonRequested(id));
  const response = await fetch(`/wp-json/imaginedsf/geojson?layerId=${id}`);
  const parsedResponse = await response.json();
  dispatch(geoJsonReceived(id, parsedResponse));
};
