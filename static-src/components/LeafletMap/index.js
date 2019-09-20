/*
* Imports.
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import useLeafletMapFromState from './useLeafletMapFromState';


/*
* Defines the LeafletMap component, which renders the Leaflet map
* and updates it when Redux's mapState updates.
*/

export default function LeafletMap() {
  const mapContent = useSelector((state) => state.mapContent);
  const mapState = useSelector((state) => state.mapState);
  const dispatch = useDispatch();

  //  Creates Leaflet map, populates with mapContent and links to mapState
  const mapContainer = useLeafletMapFromState(mapContent, mapState, dispatch);

  return <StyledLeafletMap ref={mapContainer} />;
}

const StyledLeafletMap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.LeafletMap};
  width: 100%;
  height: 100%;
`;
