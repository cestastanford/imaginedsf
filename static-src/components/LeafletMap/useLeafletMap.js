/*
* Imports
*/

import { useRef, useEffect } from 'react';
import { Map } from 'leaflet';

import {
  MIN_ZOOM,
  MAX_ZOOM,
  MAX_BOUNDS,
  ZOOM_SNAP,
} from '../../constants';


/*
* Custom hook that creates the Leaflet map.
*/

export default function useLeafletMap(mapContainer) {
  const leafletMap = useRef();

  useEffect(() => {
    leafletMap.current = new Map(mapContainer.current, {
      zoomControl: false,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      maxBounds: MAX_BOUNDS,
      zoomSnap: ZOOM_SNAP,
    });
  }, [mapContainer]);
  return leafletMap;
}
