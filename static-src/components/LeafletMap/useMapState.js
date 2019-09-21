/*
* Imports.
*/

import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPosition } from '../../state/actions';
import useMapEnabled from './useMapEnabled';


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

  //  Sends a position update to Redux's mapState
  const updateMapStatePosition = useCallback(() => {
    const { current: map } = visibleMapAreaProxy;

    dispatch(setPosition(
      map.getCenter(),
      map.getZoom(),
      null, // Sets `bounds` to null
    ));
  }, [dispatch, visibleMapAreaProxy]);

  //  Adds a listener to update the Redux mapState to reflect map
  //  position when moved.
  useEffect(() => {
    const { current: map } = visibleMapAreaProxy;

    map.on('moveend zoomend', updateMapStatePosition);

    return () => {
      map.off('moveend zoomend', updateMapStatePosition);
    };
  }, [visibleMapAreaProxy, updateMapStatePosition]);

  //  Updates map position to reflect Redux mapState.  On first update
  //  after map state set from defaults or from hash, `center` and
  //  `zoomLevel` are `null` and map position is set based on `bounds`,
  //  with the resultant `center` and `zoomLevel` set immediately
  //  after and `bounds` set to `null`.  For all future updates until
  //  map state is set from defaults or hash again, `bounds` will
  //  be `null` and map position will reflect `center` and `zoomLevel`.
  useEffect(() => {
    const { current: map } = visibleMapAreaProxy;

    map.off('moveend zoomend', updateMapStatePosition);

    if (bounds) {
      map.fitBounds(bounds);
    } else {
      map.setView(center, zoomLevel);
    }

    map.on('moveend zoomend', updateMapStatePosition);
  }, [visibleMapAreaProxy, updateMapStatePosition, center, zoomLevel, bounds]);
}
