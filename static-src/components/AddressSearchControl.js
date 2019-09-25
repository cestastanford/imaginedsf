/*
* Imports.
*/

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LatLng } from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';

import useZoomToLocation from './useZoomToLocation';
import Control, { useControlTooltip } from './Control';
import { SF_BOUNDS } from '../constants';


/*
* AddressSearchControl component definition.
*/

export default function AddressSearchControl() {
  const [searchValue, setSearchValue] = useState('');
  const [validating, setValidating] = useState(false);
  const [geocodedLocation, setGeocodedLocation] = useState(null);
  const locationGeocoded = useRef(false);

  //  Adds a tooltip on hover and enables showing a temporary tooltip
  //  message.
  const [showTooltipMessage, tooltip] = useControlTooltip(
    'Enter an address to zoom in to that location',
  );

  //  Handles zooming the map to a location and whether the map is
  //  currently zoomed to that location.
  const [zoomToLocation, isZoomedToLocation] = useZoomToLocation(geocodedLocation);

  //  Clear previously-geocoded address on input
  const updateSearchValue = (value) => {
    setGeocodedLocation(null);
    setSearchValue(value);
  };

  //  Zooms to geocoded location on next render
  useEffect(() => {
    if (locationGeocoded.current) {
      zoomToLocation();
      locationGeocoded.current = false;
    }
  }, [zoomToLocation]);

  //  Attempt to geocode entered address
  const geocodeSearchValue = async () => {
    setValidating(true);
    const response = await fetch(`/wp-json/imaginedsf/geocode?address=${encodeURIComponent(searchValue)}`);
    const parsedResponse = await response.json();
    if (parsedResponse.address) {
      const location = new LatLng(...parsedResponse.coordinates);
      if (SF_BOUNDS.contains(location)) {
        locationGeocoded.current = true;
        setSearchValue(parsedResponse.address);
        setGeocodedLocation(location);
      } else {
        showTooltipMessage('Address not found in San Francisco');
      }
    } else {
      showTooltipMessage('Address not found in San Francisco');
    }

    setValidating(false);
  };

  //  Attempt to geocode address
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchValue && !validating) {
      if (geocodedLocation) {
        zoomToLocation();
      } else {
        geocodeSearchValue();
      }
    }
  };

  return (
    <Control tooltip={tooltip}>
      <form className="field has-addons" onSubmit={handleSubmit}>
        <div className={`control has-icons-left has-icons-right ${validating ? 'is-loading' : ''}`}>
          <input
            className="input"
            placeholder="Type an address"
            value={searchValue}
            onChange={(e) => updateSearchValue(e.target.value)}
            disabled={validating}
          />
          <span className="icon is-small is-left">
            <StyledSearchIcon isZoomedToLocation={isZoomedToLocation}>
              <FontAwesomeIcon icon={faSearch} />
            </StyledSearchIcon>
          </span>
          { searchValue && !validating ? (
            <span className="icon is-small is-right">
              <button // eslint-disable-line
                type="button"
                className="delete is-small"
                onClick={() => updateSearchValue('')}
              />
            </span>
          ) : null }
        </div>
        <div className="control">
          <button
            type="submit"
            onClick={handleSubmit}
            className="button"
            disabled={!searchValue || validating}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </form>
    </Control>
  );
}


/*
* Styles
*/

const StyledSearchIcon = styled.span`
  color: ${({ theme, isZoomedToLocation }) => (isZoomedToLocation ? theme.colors.brightAccent : 'inherit')};
`;
