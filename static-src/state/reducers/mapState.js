/*
* Imports
*/

import { combineReducers } from 'redux';

import {
  REPLACE_MAP_STATE,
  APPLY_MAP_STATE,
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
    case REPLACE_MAP_STATE:
      return action.mapState.enabled;

    case APPLY_MAP_STATE:
      if (action.mapState.enabled) {
        return {
          ...state,
          ...action.mapState.enabled,
        };
      }

      return state;

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
    case REPLACE_MAP_STATE:
      return action.mapState.opacity;

    case APPLY_MAP_STATE:
      if (action.mapState.opacity) {
        return {
          ...state,
          ...action.mapState.opacity,
        };
      }

      return state;

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
    case REPLACE_MAP_STATE:
      return action.mapState.bounds;

    case APPLY_MAP_STATE:
      if (action.mapState.bounds) {
        return action.mapState.bounds;
      }

      return state;

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
