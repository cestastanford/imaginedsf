/*
* Imports.
*/

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useLeafletMap from './useLeafletMap';
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

const LeafletMap = React.forwardRef(({ visibleMapAreaElementRef }, ref) => {
  const mapContainer = useRef();

  //  Creates Leaflet map
  const leafletMap = useLeafletMap(mapContainer);

  //  Creates Leaflet map layers from downloaded map content
  const leafletLayers = useMapContent();

  //  Supports conversion between the visible map area and the full
  //  map canvas.
  const visibleMapAreaProxy = useVisibleMapArea(leafletMap, visibleMapAreaElementRef);

  //  Synchronizes Leaflet map with Redux mapState
  useMapState(leafletLayers, visibleMapAreaProxy);

  //  Handles downloading GeoJSON for vector layers
  useGeoJson(leafletLayers);

  //  Synchronizes hash state with Redux mapState
  useHashState();

  //  Exposes the map (via visibleMapAreaProxy) for other components that need
  //  imperative access to the Leaflet map
  useImperativeHandle(ref, () => visibleMapAreaProxy);

  return <StyledLeafletMap ref={mapContainer} />;
});

export default LeafletMap;

LeafletMap.propTypes = {
  visibleMapAreaElementRef: PropTypes.shape({
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
