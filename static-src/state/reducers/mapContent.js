/*
* Imports.
*/

import { combineReducers } from 'redux';

import { GEOJSON_STATUS } from '../../constants';
import {
  CONTENT_RECEIVED,
  GEOJSON_REQUESTED,
  GEOJSON_RECEIVED,
} from '../actions';


/*
* Reducers for the mapContent part of the Redux state.
*/

const mapsAndGroups = (state = {}, action) => {
  switch (action.type) {
    //  Saves to state when received.
    case CONTENT_RECEIVED:
      return action.mapContent.mapsAndGroups;

    default:
      return state;
  }
};


const proposalRanges = (state = [], action) => {
  switch (action.type) {
    //  Saves to state when received.
    case CONTENT_RECEIVED:
      return action.mapContent.proposalRanges;

    default:
      return state;
  }
};


const basemaps = (state = [], action) => {
  switch (action.type) {
    //  Saves to state when received.
    case CONTENT_RECEIVED:
      return action.mapContent.basemaps;

    default:
      return state;
  }
};


const geoJson = (state = {}, action) => {
  switch (action.type) {
    //  Records that a GeoJSON download was started
    case GEOJSON_REQUESTED:
      return {
        ...state,
        [action.mapId]: GEOJSON_STATUS.REQUESTED,
      };

    //  Saves downloaded GeoJSON for vector layers
    case GEOJSON_RECEIVED:
      return {
        ...state,
        [action.mapId]: action.geoJson,
      };

    default:
      return state;
  }
};

export default combineReducers({
  mapsAndGroups,
  proposalRanges,
  basemaps,
  geoJson,
});
