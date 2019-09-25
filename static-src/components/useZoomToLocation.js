/*
* Imports
*/

import { useMemo, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';

import LeafletMapContext from './LeafletMapContext';
import {
  ZOOM_TO_LOCATION_PADDING,
  IS_ZOOMED_TO_LOCATION_TOLERANCE,
} from '../constants';


/*
* Custom hook that handles zooming the map to a specific location
* at a zoom level determined by the ZOOM_TO_LOCATION_PADDING constant
* and determining if the map is currently zoomed to that location.
*/

export default function useZoomToLocation(location) {
  const { current: visibleMapAreaProxy } = useContext(LeafletMapContext);
  const {
    center: mapCenter,
    zoom: mapZoom,
  } = useSelector((state) => state.mapState);

  const [locationBounds, locationZoom] = useMemo(() => {
    if (visibleMapAreaProxy && location) {
      const { current: map } = visibleMapAreaProxy;
      const bounds = location.toBounds(ZOOM_TO_LOCATION_PADDING);
      const zoom = map.getBoundsZoom(bounds);
      return [bounds, zoom];
    }
    return [null, null];
  }, [location, visibleMapAreaProxy]);

  const isZoomedToLocation = useMemo(() => (
    location
    && locationZoom
    && mapCenter.equals(location, IS_ZOOMED_TO_LOCATION_TOLERANCE)
    && mapZoom >= locationZoom
  ), [location, locationZoom, mapCenter, mapZoom]);

  const zoomToLocation = useCallback(() => {
    if (visibleMapAreaProxy && location) {
      const { current: map } = visibleMapAreaProxy;
      map.fitBounds(locationBounds);
    }
  }, [location, visibleMapAreaProxy, locationBounds]);

  return [zoomToLocation, isZoomedToLocation];
}
