/*
* Imports
*/

import { useMemo, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';

import LeafletMapContext from '../LeafletMapContext';
import { IS_ZOOMED_TO_LOCATION_TOLERANCE } from '../../constants';


/*
* Custom hook that handles zooming the map to a specific bounds
* and determining if the map is currently zoomed to those bounds.
*/

export default function useZoomToBounds(bounds) {
  const { current: visibleMapAreaProxy } = useContext(LeafletMapContext);
  const {
    center: mapCenter,
    zoom: mapZoom,
  } = useSelector((state) => state.mapState);

  const boundsCenter = bounds && bounds.isValid() && bounds.getCenter();
  const boundsZoom = useMemo(() => {
    if (visibleMapAreaProxy && bounds && bounds.isValid()) {
      const { current: map } = visibleMapAreaProxy;
      const zoom = map.getBoundsZoom(bounds);
      return zoom;
    }
    return null;
  }, [bounds, visibleMapAreaProxy]);

  const isZoomedToBounds = useMemo(() => (
    boundsCenter
    && boundsZoom
    && mapCenter.equals(boundsCenter, IS_ZOOMED_TO_LOCATION_TOLERANCE)
    && mapZoom === boundsZoom
  ), [boundsCenter, boundsZoom, mapCenter, mapZoom]);

  const zoomToBounds = useCallback(() => {
    if (visibleMapAreaProxy && bounds && bounds.isValid()) {
      const { current: map } = visibleMapAreaProxy;
      map.fitBounds(bounds);
    }
  }, [bounds, visibleMapAreaProxy]);

  return [zoomToBounds, isZoomedToBounds];
}
