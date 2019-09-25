/*
* Imports.
*/

import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import LeafletMapContext from './LeafletMapContext';
import Control from './Control';
import { MIN_ZOOM, MAX_ZOOM, ZOOM_SNAP } from '../constants';


/*
* ZoomControl component definition.
*/

export default function ZoomControl() {
  const { current: visibleMapAreaProxy } = useContext(LeafletMapContext);
  const zoom = useSelector((state) => state.mapState.zoom);

  const zoomIn = () => {
    if (visibleMapAreaProxy && zoom < MAX_ZOOM) {
      const { current: map } = visibleMapAreaProxy;
      map.setZoom(zoom + ZOOM_SNAP * 2);
    }
  };

  const zoomOut = () => {
    if (visibleMapAreaProxy && zoom > MIN_ZOOM) {
      const { current: map } = visibleMapAreaProxy;
      map.setZoom(zoom - ZOOM_SNAP * 2);
    }
  };

  return (
    <StyledZoomControl>
      <StyledZoomButton onClick={zoomIn} disabled={zoom >= MAX_ZOOM} className="button">
        <FontAwesomeIcon icon={faPlus} />
      </StyledZoomButton>
      <StyledZoomButton onClick={zoomOut} disabled={zoom <= MIN_ZOOM} className="button">
        <FontAwesomeIcon icon={faMinus} />
      </StyledZoomButton>
    </StyledZoomControl>
  );
}


/*
* Styles
*/

const StyledZoomControl = styled(Control)`
  display: flex;
  flex-direction: column;
`;

const StyledZoomButton = styled.button`
  width: 2.25em;
  height: 2.25em;
  color: #888;

  &:first-child {
    border-bottom: none;
    border-radius: 4px 4px 0  0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }
`;
