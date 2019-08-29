/*
* Imports libraries.
*/

import { combineReducers } from 'redux';


/*
* Imports action type constants.
*/

import {
  MAPS_REQUESTED,
  MAPS_RECEIVED,
  NARRATIVES_REQUESTED,
  NARRATIVES_RECEIVED,
  CONTENT_REQUESTED,
  CONTENT_RECEIVED,
} from './actions';


/*
* Sets state for map content requests.
*/

const mapsLoading = (state = false, action) => {
  switch (action.type) {
    case MAPS_REQUESTED:
      return true;
    case MAPS_RECEIVED:
      return false;
    default:
      return state;
  }
};

const maps = (state = {}, action) => {
  switch (action.type) {
    case MAPS_RECEIVED:
      return action.maps;
    default:
      return state;
  }
};

const proposalRanges = (state = [], action) => {
  switch (action.type) {
    case MAPS_RECEIVED:
      return action.proposalRanges;
    default:
      return state;
  }
};

const basemaps = (state = [], action) => {
  switch (action.type) {
    case MAPS_RECEIVED:
      return action.basemaps;
    default:
      return state;
  }
};


/*
* Sets state for narrative content requests.
*/

const narrativesLoading = (state = false, action) => {
  switch (action.type) {
    case NARRATIVES_REQUESTED:
      return true;
    case NARRATIVES_RECEIVED:
      return false;
    default:
      return state;
  }
};

const narratives = (state = [], action) => {
  switch (action.type) {
    case NARRATIVES_RECEIVED:
      return action.narratives;
    default:
      return state;
  }
};


/*
* Sets state for content area content requests.
*/

const contentAreaLoading = (state = false, action) => {
  switch (action.type) {
    case CONTENT_REQUESTED:
      return {
        ...state.contentAreaLoading,
        [action.contentArea]: true,
      };
    case CONTENT_RECEIVED:
      return false;
    default:
      return state;
  }
};

const contentAreaContent = (state = [], action) => {
  switch (action.type) {
    case CONTENT_RECEIVED:
      return {
        ...state.contentAreaContent,
        [action.contentArea]: action.content,
      };
    default:
      return state;
  }
};


export default combineReducers({
  mapsLoading,
  maps,
  proposalRanges,
  basemaps,
  narrativesLoading,
  narratives,
  contentAreaLoading,
  contentAreaContent,
});
