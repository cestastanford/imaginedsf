/*
* Imports.
*/

import { combineReducers } from 'redux';

import mapContent from './mapContent';
import mapState from './mapState';

import {
  CONTENT_RECEIVED,
  SET_ONLY_SHOW_PROPOSAL_MAPS_IN_VISIBLE_AREA,
  SET_CURRENT_NARRATIVE,
} from '../actions';


/*
* Reducers
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


const narratives = (state = [], action) => {
  switch (action.type) {
    //  Saves ordered narrative IDs when received
    case CONTENT_RECEIVED:
      return action.narratives;

    default:
      return state;
  }
};


const narrativesBySlug = (state = {}, action) => {
  switch (action.type) {
    //  Saves narrative content when received
    case CONTENT_RECEIVED:
      return action.narrativesBySlug;

    default:
      return state;
  }
};


const onlyShowProposalMapsInVisibleArea = (state = false, action) => {
  switch (action.type) {
    case SET_ONLY_SHOW_PROPOSAL_MAPS_IN_VISIBLE_AREA:
      return action.onlyShowProposalMapsInVisibleArea;

    default:
      return state;
  }
};


const currentNarrative = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_NARRATIVE:
      return action.narrativeId;

    default:
      return state;
  }
};


export default combineReducers({
  contentAreaContent,
  mapContent,
  narratives,
  narrativesBySlug,
  mapState,
  onlyShowProposalMapsInVisibleArea,
  currentNarrative,
});
