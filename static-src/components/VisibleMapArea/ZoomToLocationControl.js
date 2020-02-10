/*
* Imports.
*/

import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import useZoomToLocation from './useZoomToLocation';
import LeafletMapContext from '../LeafletMapContext';
import Control, { useControlTooltip } from './Control';
import { SF_BOUNDS } from '../../constants';


/*
* ZoomToLocationControl component definition.
*/

export default function ZoomToLocationControl() {
  const { current: visibleMapAreaProxy } = useContext(LeafletMapContext);
  const [currentLocation, setCurrentLocation] = useState();
  const [locating, setLocating] = useState(false);
  const currentLocationFound = useRef(false);

  //  Adds a tooltip on hover and enables showing a temporary tooltip
  //  message.
  const [showTooltipMessage, tooltip] = useControlTooltip(
    'Zoom to your current location',
  );

  //  Handles zooming the map to a location and whether the map is
  //  currently zoomed to that location.
  const [zoomToLocation, isZoomedToLocation] = useZoomToLocation(currentLocation);

  const locate = async () => {
    if (visibleMapAreaProxy) {
      setLocating(true);
      const { current: map } = visibleMapAreaProxy;

      map.once('locationfound locationerror', (e) => {
        const foundLocation = e.latlng;
        if (!foundLocation) {
          showTooltipMessage('Unable to find current location');
        } else if (SF_BOUNDS.contains(foundLocation)) {
          currentLocationFound.current = true;
          setCurrentLocation(foundLocation);
        } else {
          showTooltipMessage('Current location not in San Francisco');
        }

        setLocating(false);
      });

      map.locate();
    }
  };

  //  Zooms to the current location after geolocation.
  useEffect(() => {
    if (currentLocationFound.current) {
      currentLocationFound.current = false;
      zoomToLocation();
    }
  }, [zoomToLocation]);

  return (
    <Control tooltip={tooltip}>
      <StyledButton
        className={`button ${locating ? ' is-loading' : ''}`}
        onClick={locating ? null : locate}
        isZoomedToLocation={isZoomedToLocation}
        disabled={locating}
      >
        { locating ? null : <FontAwesomeIcon icon={faLocationArrow} /> }
      </StyledButton>
    </Control>
  );
}


/*
* Styles
*/

const StyledButton = styled.button`
  width: 2.25em;
  height: 2.25em;
  padding: 0.25em;
  color: ${({ theme, isZoomedToLocation }) => (isZoomedToLocation ? theme.colors.brightAccent : '#888')};
`;
