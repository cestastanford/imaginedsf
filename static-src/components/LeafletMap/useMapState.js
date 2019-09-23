/*
* Imports.
*/

import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setBounds } from '../../state/actions';
import useMapEnabled from './useMapEnabled';
import { latLngBoundsToArrays } from './leaflet';


/*
* Custom hook that keeps the Leaflet map in sync with state changes
* from Redux for layer enabled status, layer opacity and map position.
*/

export default function useMapState(leafletLayers, visibleMapAreaProxy) {
  const getMapEnabled = useMapEnabled();
  const dispatch = useDispatch();
  const {
    opacity,
    center,
    zoom,
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
    const { current: map } = visibleMapAreaProxy;
    const mapEnabled = getMapEnabled();

    leafletLayers.forEach(({ id, layer }) => {
      if (mapEnabled[id]) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    });
  }, [leafletLayers, visibleMapAreaProxy, getMapEnabled]);

  //  Sends a bounds update to Redux's mapState
  const updateMapStatePosition = useCallback(() => {
    const { current: map } = visibleMapAreaProxy;
    const currentBounds = map.getBounds();
    if (!currentBounds.equals(bounds)) {
      dispatch(setBounds(latLngBoundsToArrays(currentBounds)));
    }
  }, [dispatch, visibleMapAreaProxy, bounds]);

  //  Adds a listener to update the Redux mapState to reflect map
  //  position when moved.
  useEffect(() => {
    const { current: map } = visibleMapAreaProxy;
    map.on('moveend zoomend', updateMapStatePosition);
    return () => {
      map.off('moveend zoomend', updateMapStatePosition);
    };
  }, [visibleMapAreaProxy, updateMapStatePosition]);

  //  Updates the map with new bounds from Redux
  useEffect(() => {
    const { current: map } = visibleMapAreaProxy;
    map.fitBounds(bounds);
  }, [visibleMapAreaProxy, updateMapStatePosition, center, zoom, bounds]);
}