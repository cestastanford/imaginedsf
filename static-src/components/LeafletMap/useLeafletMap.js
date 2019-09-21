/*
* Imports
*/

import { useRef, useEffect } from 'react';
import { Map } from 'leaflet';

import {
  INITIAL_CENTER,
  INITIAL_ZOOM,
  MIN_ZOOM,
  MAX_BOUNDS,
} from '../../constants';


/*
* Custom hook that creates the Leaflet map.
*/

export default function useLeafletMap(mapContainer) {
  const leafletMap = useRef();

  useEffect(() => {
    leafletMap.current = new Map(mapContainer.current, {
      zoomControl: false,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      minZoom: MIN_ZOOM,
      maxBounds: MAX_BOUNDS,
      zoomSnap: 0.25,
    });
  }, [mapContainer]);
  return leafletMap;
}
