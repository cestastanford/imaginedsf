/*
* Imports
*/

import { combineReducers } from 'redux';

import {
  SET_MAP_STATE,
  SET_ENABLED,
  SET_OPACITY,
  SET_BOUNDS,
  UPDATE_VIEW,
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

//  LeafletMap will update this for other components to consume,
//  but doesn't update itself when this value is changed.
const center = (state = null, action) => {
  switch (action.type) {
    case SET_BOUNDS:
    case UPDATE_VIEW:
      return action.center;

    default:
      return state;
  }
};

//  LeafletMap will update this for other components to consume,
//  but doesn't update itself when this value is changed.
const zoom = (state = null, action) => {
  switch (action.type) {
    case SET_BOUNDS:
    case UPDATE_VIEW:
      return action.zoom;

    default:
      return state;
  }
};

export default combineReducers({
  enabled,
  opacity,
  bounds,
  center,
  zoom,
});
