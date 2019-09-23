/*
* Imports.
*/

import { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMapState } from '../../state/actions';


/*
* Helper functions to convert between hash and state.
*/

const getMapStateFromHash = (hash) => {
  try {
    const hashObject = JSON.parse(atob(decodeURI(hash.substring(1))));
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


//  Saves bounds instead of center/zoom to ensure that if link is
//  opened with a different browser window size, area will be fully
//  within visible map area.
const getHashFromMapState = ({ enabled, opacity, bounds }) => {
  const hashObject = {
    mapState: {
      enabled,
      opacity,
      bounds,
    },
  };

  return encodeURI(btoa(JSON.stringify(hashObject)));
};

/*
* Encapsulates the logic that synchronizes the map state and the
* URL hash.
*/

export default function useHashState() {
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
    currentHash.current = `#${getHashFromMapState(mapState)}`;
    window.location.hash = currentHash.current;
  }, [mapState]);
}
