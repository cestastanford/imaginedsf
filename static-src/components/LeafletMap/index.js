/*
* Imports.
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useMapContent from './useMapContent';
import useMapState from './useMapState';
import useGeoJson from './useGeoJson';
import useHashState from './useHashState';
import useVisibleMapArea from './useVisibleMapArea';
import VisibleMapArea from '../VisibleMapArea';


/*
* Defines the LeafletMap component, which renders the Leaflet map
* and updates it when Redux's mapState updates.
*/

export default function LeafletMap({ visibleMapAreaRef }) {
  //  Creates Leaflet map and layers
  const [
    mapContainer,
    leafletMap,
    leafletLayers,
  ] = useMapContent();

  //  Supports conversion between the visible map area and the full
  //  map canvas.
  const visibleMapArea = useVisibleMapArea(leafletMap, visibleMapAreaRef);

  //  Synchronizes Leaflet map with Redux mapState
  useMapState(leafletLayers, leafletMap, visibleMapArea);

  //  Handles downloading GeoJSON for vector layers
  useGeoJson(leafletLayers);

  //  Synchronizes hash state with Redux mapState
  useHashState(visibleMapArea);

  return <StyledLeafletMap ref={mapContainer} />;
}

LeafletMap.propTypes = {
  visibleMapAreaRef: PropTypes.shape({
    current: PropTypes.instanceOf(VisibleMapArea),
  }).isRequired,
};

const StyledLeafletMap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.LeafletMap};
  width: 100%;
  height: 100%;
`;
