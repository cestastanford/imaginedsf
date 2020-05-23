/*
* Imports.
*/

import React, { useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useLeafletMap from './useLeafletMap';
import useMapContent from './useMapContent';
import useMapState from './useMapState';
import useGeoJson from './useGeoJson';
import useHashState from './useHashState';
import useVisibleMapArea from './useVisibleMapArea';
import VisibleMapArea from '../VisibleMapArea';
import pinIcon from '../../img/pin.png';
import selectedPinIcon from '../../img/pin-selected.png';
import directionalPinIcon from '../../img/pin-directional.png';
import selectedDirectionalPinIcon from '../../img/pin-directional-selected.png';


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

  & .vector-point-pin {
    width: 100%;
    height: 100%;
    background-image: url(${pinIcon});
    background-repeat: no-repeat;
    background-size: contain;

    &.vector-point-pin-selected {
      background-image: url(${selectedPinIcon});
    }

    &.vector-point-pin-directional {
      position: relative;
      top: -100%;
      height: 300%;
      background-image: url(${directionalPinIcon});

      &.vector-point-pin-selected {
        background-image: url(${selectedDirectionalPinIcon});
      }
    }
  }

  & .vector-point-popup-container {
    & .leaflet-popup-content-wrapper,
    & .leaflet-popup-tip {
      background-color: ${({ theme }) => theme.colors.panelBackground};
      border-radius: ${({ theme }) => theme.radii.standard};
      box-shadow: ${({ theme }) => theme.shadows.Control};
    }

    & .leaflet-popup-tip-container {
      transform: scaleY(2) translateY(25%);
    }
  }

  & .vector-point-popup-content {
    max-height: 500px;
    margin: -10px;
    overflow-y: scroll;
    font-family: 'Muli', sans-serif;
    font-size: 0.8rem;
  }
`;
