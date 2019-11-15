/*
* Imports.
*/

import {
  MAP_POST_TYPE,
  MAP_GROUP_POST_TYPE,
  SF_BOUNDS,
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
export const SET_BOUNDS = 'SET_BOUNDS';
export const UPDATE_VIEW = 'UPDATE_VIEW';
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
* era and ensures that no maps or map groups are referenced  more
* than once.
*/

const getNormalizedMapContent = ({
  maps,
  mapGroups,
  proposalEras,
  permanentBasemap,
  basemaps,
}) => {
  const mapItemsById = {
    ...mapIdsToObjectKeys(maps),
    ...mapIdsToObjectKeys(mapGroups),
  };

  const validatedMapItemsById = {};

  const validate = (id, mapsOnly) => {
    if (validatedMapItemsById[id]) {
      throw new Error(`Map or map group already used elsewhere: "${validatedMapItemsById[id].post_title}" [${id}]`);
    }

    const mapItem = mapItemsById[id];

    if (!mapItem) {
      throw new Error(`Can't find map or map group: [${id}]`);
    }

    if (mapsOnly && mapItem.post_type !== MAP_POST_TYPE) {
      throw new Error(`Map groups not allowed: "${mapItem.post_title}" [${id}]`);
    }

    if (mapItem.post_type === MAP_GROUP_POST_TYPE) {
      mapItem.children.forEach((childMapItem, index) => {
        try {
          validate(childMapItem, index);
        } catch (e) {
          throw new Error(`${e.message} (child #${index + 1} of map group "${mapItem.post_title}" [${id}])`);
        }
      });
    }

    delete mapItemsById[id];
    validatedMapItemsById[id] = mapItem;
  };

  if (permanentBasemap) {
    try {
      validate(permanentBasemap, true);
    } catch (e) {
      throw new Error(`${e.message} (permanent basemap)`);
    }
  }

  basemaps.forEach((id, index) => {
    try {
      validate(id, true);
    } catch (e) {
      throw new Error(`${e.message} (basemap #${index + 1})`);
    }
  });

  proposalEras.forEach((era, eraIndex) => {
    era.children.forEach((id, eraChildIndex) => {
      try {
        validate(id);
      } catch (e) {
        throw new Error(`${e.message} (item #${eraChildIndex + 1} in proposal era #${eraIndex + 1})`);
      }
    });
  });

  const sortedProposalEras = [...proposalEras];
  sortedProposalEras.sort((a, b) => a.start - b.start);

  const geoJson = {};
  Object.entries(validatedMapItemsById).forEach(([id, item]) => {
    if (item.source_type === GEOJSON_SOURCE_TYPE) {
      geoJson[id] = GEOJSON_STATUS.NOT_REQUESTED;
    }
  });

  return {
    mapItems: validatedMapItemsById,
    proposalEras: sortedProposalEras,
    permanentBasemap,
    basemaps,
    geoJson,
  };
};


/*
* Helper function to get initial map state from the defaults set
* in WordPress.
*/

const getDefaultMapStateFromMapContent = ({ mapItems }) => {
  const enabled = {};
  const opacity = {};

  Object.entries(mapItems).forEach(([id, item]) => {
    enabled[id] = item.metadata.enabled_by_default;
    if (
      item.post_type === MAP_POST_TYPE
      && item.source_type !== GEOJSON_SOURCE_TYPE
    ) {
      opacity[id] = 1;
    }
  });

  return {
    enabled,
    opacity,
    bounds: SF_BOUNDS,
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

export const setBounds = (bounds, center, zoom) => ({
  type: SET_BOUNDS,
  bounds,
  center,
  zoom,
});

export const updateView = (center, zoom) => ({
  type: UPDATE_VIEW,
  center,
  zoom,
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

  const { contentAreaContent } = parsedResponse;
  contentAreaContent.proposalMapsIntro = parsedResponse.proposalMapsIntro;
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
