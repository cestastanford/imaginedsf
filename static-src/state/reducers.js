/*
* Imports.
*/

import { combineReducers } from 'redux';

import { GEOJSON_STATUS } from '../constants';
import {
  CONTENT_RECEIVED,
  GEOJSON_REQUESTED,
  GEOJSON_RECEIVED,
  SET_MAP_STATE,
  SET_ENABLED,
  SET_OPACITY,
  SET_POSITION,
} from './actions';


/*
* Reducers.
*/

const contentAreaContent = (state = {}, action) => {
  switch (action.type) {
    //  Saves content area content when received
    case CONTENT_RECEIVED:
      return action.contentAreaContent;

    default:
      return state;
  }
};

const mapState = (state = {}, action) => {
  switch (action.type) {
    //  Replaces the entire map state
    case SET_MAP_STATE:
      return action.mapState;

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
        zoom: action.zoom,
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
      return action.mapContent;

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
      return action.narratives;

    default:
      return state;
  }
};

export default combineReducers({
  contentAreaContent,
  mapState,
  mapContent,
  narratives,
});
