/*
* Imports
*/

import { combineReducers } from 'redux';

import {
  SET_MAP_STATE,
  SET_ENABLED,
  SET_OPACITY,
  SET_POSITION,
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

const center = (state = null, action) => {
  switch (action.type) {
    //  Setting initial map state using center/zoom not allowed...
    case SET_MAP_STATE:
      return state;

    //  ...only updating position.
    case SET_POSITION:
      return action.center;

    default:
      return state;
  }
};

const zoom = (state = null, action) => {
  switch (action.type) {
    //  Setting initial map state using center/zoom not allowed...
    case SET_MAP_STATE:
      return state;

    //  ...only updating position.
    case SET_POSITION:
      return action.zoom;

    default:
      return state;
  }
};

const bounds = (state = null, action) => {
  switch (action.type) {
    //  Setting initial map state using bounds is allowed
    case SET_MAP_STATE:
      return action.mapState.bounds;

    //  Saves bounds of position updates for other components' use,
    //  but Leaflet map won't update to these unless center/zoom
    //  are null
    case SET_POSITION:
      return action.bounds;

    default:
      return state;
  }
};

export default combineReducers({
  enabled,
  opacity,
  center,
  zoom,
  bounds,
});
