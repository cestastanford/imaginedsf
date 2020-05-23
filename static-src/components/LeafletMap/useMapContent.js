/*
* Imports.
*/

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  createTileLayer,
  createWmsLayer,
  createGeoJsonLayer,
} from './leaflet';

import {
  RASTER_WMS_SOURCE_TYPE,
  RASTER_TILE_SOURCE_TYPE,
  VECTOR_WFS_SOURCE_TYPE,
  VECTOR_GEOJSON_SOURCE_TYPE,
} from '../../constants';


/*
* Custom hook that handles creating the Leaflet map and the Leaflet
* layers.
*/

export default function useMapContent() {
  const history = useHistory();
  const [leafletLayers, setLeafletLayers] = useState([]);
  const {
    mapItems,
    proposalEras,
    permanentBasemap,
    basemaps,
  } = useSelector((state) => state.mapContent);

  //  Creates Leaflet layers for each map
  useEffect(() => {
    //  Returns a flattened array of all descendant maps
    const getDescendantMaps = (parent) => [].concat(...parent.children.map((id) => {
      //  If group
      if (mapItems[id].children) {
        return getDescendantMaps(mapItems[id]);
      }

      //  If not group
      return [mapItems[id]];
    }));

    const maps = [
      ...[].concat(...proposalEras.map(getDescendantMaps)),
      ...getDescendantMaps({ children: basemaps }),
      ...(permanentBasemap ? [mapItems[permanentBasemap]] : []),
    ];

    maps.reverse();

    //  Creates a Leaflet layer for each map
    const layers = maps.map((map, index) => {
      switch (map.source_type) {
        //  Creates a TileLayer.WMS
        case RASTER_WMS_SOURCE_TYPE:
          return { id: map.ID, layer: createWmsLayer(map, index) };

        //  Creates a TileLayer
        case RASTER_TILE_SOURCE_TYPE:
          return { id: map.ID, layer: createTileLayer(map, index) };

        //  Creates a WFS-sourced GeoJSON layer
        case VECTOR_WFS_SOURCE_TYPE:
          return { id: map.ID, layer: createGeoJsonLayer(map, history) };

        //  Creates a GeoJSON-upload-sourced GeoJSON layer
        case VECTOR_GEOJSON_SOURCE_TYPE:
          return { id: map.ID, layer: createGeoJsonLayer(map, history) };

        default:
          throw new Error(`Unrecognized source type: ${map.source_type}`);
      }
    });

    setLeafletLayers(layers);
  }, [proposalEras, basemaps, mapItems, permanentBasemap, history]);

  return leafletLayers;
}
