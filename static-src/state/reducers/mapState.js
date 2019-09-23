/*
* Imports
*/

import { combineReducers } from 'redux';

import {
  SET_MAP_STATE,
  SET_ENABLED,
  SET_OPACITY,
  SET_BOUNDS,
} from '../actions';


/*
* Reducers for the mapState part of the Redux state.
*/

const enabled = (state = {}, action) => {
  switch (action.type) {
    //  Replaces state
    case SET_MAP_STATE:
      return action.mapState.enabled;

    //  Enables/disables single map
    case SET_ENABLED:
      return {
        ...state,
        [action.mapId]: action.enabled,
      };

    default:
      return state;
  }
};

const opacity = (state = {}, action) => {
  switch (action.type) {
    //  Replaces state
    case SET_MAP_STATE:
      return action.mapState.opacity;

    //  Enables/disables single map
    case SET_OPACITY:
      return {
        ...state,
        [action.mapId]: action.opacity,
      };

    default:
      return state;
  }
};

const bounds = (state = null, action) => {
  switch (action.type) {
    //  Replaces state
    case SET_MAP_STATE:
      return action.mapState.bounds;

    //  Updates bounds
    case SET_BOUNDS:
      return action.bounds;

    default:
      return state;
  }
};

export default combineReducers({
  enabled,
  opacity,
  bounds,
});
