/*
* Imports.
*/

import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPosition } from '../../state/actions';


/*
* Custom hook that keeps the Leaflet map in sync with state changes
* from Redux for layer enabled status, layer opacity and map position.
*/

export default function useMapState(leafletLayers, leafletMap, visibleMapArea) {
  const dispatch = useDispatch();
  const {
    enabled,
    opacity,
    center,
    zoomLevel,
    bounds,
  } = useSelector((state) => state.mapState);

  //  Sets the opacity of each Leaflet layer on state change
  useEffect(() => {
    leafletLayers.forEach(({ id, layer }) => {
      if (opacity[id]) { // Vector layers aren't in `opacity`
        layer.setOpacity(opacity[id]); // This would fail on a vector layer
      }
    });
  }, [leafletLayers, opacity]);

  //  Updates which layers are added to the map on state change
  useEffect(() => {
    leafletLayers.forEach(({ id, layer }) => {
      if (enabled[id]) {
        layer.addTo(leafletMap.current);
      } else {
        layer.removeFrom(leafletMap.current);
      }
    });
  }, [leafletLayers, leafletMap, enabled]);

  const updateMapStatePosition = useCallback(() => {
    dispatch(setPosition(
      visibleMapArea.getCenter(),
      visibleMapArea.getZoom(),
      null, // Sets `bounds` to null
    ));
  }, [dispatch, visibleMapArea]);

  //  Updates map position to reflect Redux mapState.  On first update
  //  after map state set from defaults or from hash, `center` and
  //  `zoomLevel` are `null` and map position is set based on `bounds`,
  //  with the resultant `center` and `zoomLevel` set immediately
  //  after and `bounds` set to `null`.  For all future updates until
  //  map state is set from defaults or hash again, `bounds` will
  //  be `null` and map position will be in sync with `center` and `zoomLevel`.
  useEffect(() => {
    if (bounds) {
      visibleMapArea.fitBounds(bounds);
      updateMapStatePosition();
    } else {
      visibleMapArea.setView(center, zoomLevel);
    }
  }, [bounds, visibleMapArea, updateMapStatePosition, center, zoomLevel]);

  //  Adds a listener to update the Redux mapState to reflect map
  //  position when moved.
  useEffect(() => {
    leafletMap.on('moveend zoomend', updateMapStatePosition);

    return () => {
      leafletMap.off('moveend zoomend', updateMapStatePosition);
    };
  }, [leafletMap, updateMapStatePosition]);
}
