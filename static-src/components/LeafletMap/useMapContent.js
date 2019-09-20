/*
* Imports.
*/

import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  createMap,
  createTileLayer,
  createWmsLayer,
  createGeoJsonLayer,
} from './leaflet';

import {
  MAP_GROUP_POST_TYPE,
  TILE_SOURCE_TYPE,
  WMS_SOURCE_TYPE,
  GEOJSON_SOURCE_TYPE,
} from '../../constants';


/*
* Custom hook that handles creating the Leaflet map and the Leaflet
* layers.
*/

export default function useMapContent() {
  const mapContainer = useRef();
  const leafletMap = useRef();
  const [leafletLayers, setLeafletLayers] = useState([]);
  const {
    mapsAndGroups,
    proposalRanges,
    basemaps,
  } = useSelector((state) => state.mapContent);

  //  Creates Leaflet map
  useEffect(() => {
    leafletMap.current = createMap(mapContainer.current);
  }, [mapContainer, leafletMap]);

  //  Creates Leaflet layers for each map
  useEffect(() => {
    //  Recursively traverses hierarchies and returns a flattened
    //  array of ordered maps.
    const getMaps = (id) => {
      const mapOrGroup = mapsAndGroups[id];

      //  If group
      if (mapOrGroup.post_type === MAP_GROUP_POST_TYPE) {
        return [].concat(...mapOrGroup.fields.contents.map(getMaps));
      }

      //  If not group
      return [mapOrGroup];
    };

    const maps = [].concat(
      ...proposalRanges.map(
        (range) => range.contents.map(getMaps),
      ),
      ...basemaps.map(getMaps),
    );

    maps.reverse();

    //  Creates a Leaflet layer for each map
    const layers = maps.map((map, index) => {
      switch (map.fields.source_type) {
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
          throw new Error(`Unrecognized source type: ${map.fields.source_type}`);
      }
    });

    setLeafletLayers(layers);
  }, [proposalRanges, basemaps, mapsAndGroups]);

  return [mapContainer, leafletMap, leafletLayers];
}
