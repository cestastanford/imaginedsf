/*
* Imports.
*/

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGeoJson } from '../../state/actions';
import { GEOJSON_STATUS } from '../../constants';


/*
* Custom hook that creates a Leaflet map and keeps it synchronized
* with the Redux state.
*/

export default function useGeoJson(leafletLayers) {
  const { geoJson } = useSelector((state) => state.mapContent);
  const { enabled } = useSelector((state) => state.mapState);
  const dispatch = useDispatch();

  //  Requests a vector layer's GeoJSON when enabled
  useEffect(() => {
    leafletLayers.forEach(({ id }) => {
      if (
        enabled[id]
        && geoJson[id] === GEOJSON_STATUS.NOT_REQUESTED
      ) {
        dispatch(fetchGeoJson(id));
      }
    });
  }, [leafletLayers, enabled, geoJson, dispatch]);

  //  Updates a vector layer with received GeoJSON data
  useEffect(() => {
    leafletLayers.forEach(({ id, layer }) => {
      if (
        geoJson[id]
        && geoJson[id] !== GEOJSON_STATUS.NOT_REQUESTED
        && geoJson[id] !== GEOJSON_STATUS.REQUESTED
      ) {
        // layer.options.coordsToLatLng = getCoordsToLatLngFn(geoJson[id]);
        layer.clearLayers();
        layer.addData(geoJson[id]);
      }
    });
  }, [leafletLayers, geoJson]);
}
