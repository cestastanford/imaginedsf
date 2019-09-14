/*
* Imports libraries.
*/

import { combineReducers } from 'redux';


/*
* Imports action type constants.
*/

import { CONTENT_RECEIVED } from './actions';


/*
* Helper function to convert an array of ID'd objects into an object
* mapping from ID to object.
*/

const mapIDsToObjectKeys = (arr) => {
  const obj = {};
  arr.forEach((item) => { obj[item.ID] = item; });
  return obj;
};


/*
* Sets state for content types.
*/

const contentLoaded = (state = false, action) => {
  switch (action.type) {
    case CONTENT_RECEIVED:
      return true;
    default:
      return state;
  }
};

const contentAreaContent = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_RECEIVED:
      return action.content.content_area_content;
    default:
      return state;
  }
};

const maps = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_RECEIVED:
      return mapIDsToObjectKeys(action.content.maps);
    default:
      return state;
  }
};

const mapGroups = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_RECEIVED:
      return mapIDsToObjectKeys(action.content.map_groups);
    default:
      return state;
  }
};

const narratives = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_RECEIVED:
      return mapIDsToObjectKeys(action.content.narratives);
    default:
      return state;
  }
};

const proposalRanges = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_RECEIVED:
      return action.content.proposal_ranges;
    default:
      return state;
  }
};

const basemaps = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_RECEIVED:
      return action.content.basemaps;
    default:
      return state;
  }
};

export default combineReducers({
  contentLoaded,
  contentAreaContent,
  maps,
  mapGroups,
  narratives,
  proposalRanges,
  basemaps,
});
