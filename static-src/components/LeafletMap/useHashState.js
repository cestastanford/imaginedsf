/*
* Imports.
*/

import { useCallback, useEffect } from 'react';
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

export default function useHashState(visibleMapArea) {
  const mapState = useSelector((state) => state.useSelector);
  const dispatch = useDispatch();

  //  Hash change handler
  const handleHashChange = useCallback(() => {
    const hashMapState = getMapStateFromHash(window.location.hash);
    if (hashMapState) {
      dispatch(setMapState(hashMapState));
    }
  }, [dispatch]);

  //  Adds hash change listener
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  //  Removes listener and updates hash on map state change
  useEffect(() => {
    window.removeEventListener('hashchange', handleHashChange);
    window.location.hash = getHashFromMapState(mapState, visibleMapArea.getBounds());
    window.addEventListener('hashchange', handleHashChange);
  }, [mapState, handleHashChange, visibleMapArea]);
}
