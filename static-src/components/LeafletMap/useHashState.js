/*
* Imports.
*/

import { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMapState } from '../../state/actions';
import { latLngBoundsToArrays } from './leaflet';


/*
* Helper functions to convert between hash and state.
*/

const getMapStateFromHash = (hash) => {
  try {
    const hashObject = JSON.parse(decodeURIComponent(hash.substring(1)));
    const { enabled, opacity, bounds } = hashObject.mapState;

    return {
      enabled,
      opacity,
      bounds,
    };
  } catch (e) {
    return null;
  }
};


const getHashFromMapState = ({ enabled, opacity }, bounds) => {
  const hashObject = {
    mapState: {
      enabled,
      opacity,
      bounds: latLngBoundsToArrays(bounds),
    },
  };

  return encodeURIComponent(JSON.stringify(hashObject));
};

/*
* Encapsulates the logic that synchronizes the map state and the
* URL hash.
*/

export default function useHashState(visibleMapAreaProxy) {
  const currentHash = useRef();
  const mapState = useSelector((state) => state.mapState);
  const dispatch = useDispatch();

  //  Hash change handler
  const applyHashToMapState = useCallback(() => {
    const { hash } = window.location;

    //  Hash update is delayed, so this check makes sure the change
    //  isn't one that we initiated  below.
    if (hash !== currentHash.current) {
      const hashMapState = getMapStateFromHash(hash);

      if (hashMapState) {
        dispatch(setMapState(hashMapState));
      }
    }
  }, [dispatch]);

  //  Applies initial hash state, if present
  useEffect(() => {
    applyHashToMapState();
  }, [applyHashToMapState]);

  //  Updates map state on hash change
  useEffect(() => {
    window.addEventListener('hashchange', applyHashToMapState);
    return () => {
      window.removeEventListener('hashchange', applyHashToMapState);
    };
  }, [applyHashToMapState]);

  //  Updates hash on map state change
  useEffect(() => {
    const { current: map } = visibleMapAreaProxy;

    currentHash.current = `#${getHashFromMapState(mapState, map.getBounds())}`;
    window.location.hash = currentHash.current;
  }, [mapState, visibleMapAreaProxy]);
}
