/*
* Imports.
*/

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  createTileLayer,
  createWmsLayer,
  createGeoJsonLayer,
} from './leaflet';

import {
  TILE_SOURCE_TYPE,
  WMS_SOURCE_TYPE,
  GEOJSON_SOURCE_TYPE,
} from '../../constants';


/*
* Custom hook that handles creating the Leaflet map and the Leaflet
* layers.
*/

export default function useMapContent() {
  const [leafletLayers, setLeafletLayers] = useState([]);
  const {
    mapItems,
    proposalEras,
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
      ...getDescendantMaps({ children: basemaps }),
      ...[].concat(...proposalEras.map(getDescendantMaps)),
    ];

    //  Creates a Leaflet layer for each map
    const layers = maps.map((map, index) => {
      switch (map.source_type) {
        //  Creates a TileLayer
        case TILE_SOURCE_TYPE:
          return { id: map.ID, layer: createTileLayer(map, index) };

        //  Creates a TileLayer.WMS
        case WMS_SOURCE_TYPE:
          return { id: map.ID, layer: createWmsLayer(map, index) };

        //  Creates a GeoJSON layer
        case GEOJSON_SOURCE_TYPE:
          return { id: map.ID, layer: createGeoJsonLayer(map) };

        default:
          throw new Error(`Unrecognized source type: ${map.source_type}`);
      }
    });

    setLeafletLayers(layers);
  }, [proposalEras, basemaps, mapItems]);

  return leafletLayers;
}
