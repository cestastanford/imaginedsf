/*
* Imports.
*/

import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import LeafletMapContext from '../LeafletMapContext';
import Control from './Control';
import useTooltip from '../useTooltip';
import { MIN_ZOOM, MAX_ZOOM, ZOOM_SNAP } from '../../constants';


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

  const [zoomInTooltip] = useTooltip('Zoom in');

  const zoomOut = () => {
    if (visibleMapAreaProxy && zoom > MIN_ZOOM) {
      const { current: map } = visibleMapAreaProxy;
      map.setZoom(zoom - ZOOM_SNAP * 2);
    }
  };

  const [zoomOutTooltip] = useTooltip('Zoom out');

  return (
    <>
      <StyledZoomInControl tooltip={zoomInTooltip}>
        <StyledZoomButton onClick={zoomIn} disabled={zoom >= MAX_ZOOM} className="button">
          <FontAwesomeIcon icon={faPlus} />
        </StyledZoomButton>
      </StyledZoomInControl>
      <StyledZoomOutControl tooltip={zoomOutTooltip}>
        <StyledZoomButton onClick={zoomOut} disabled={zoom <= MIN_ZOOM} className="button">
          <FontAwesomeIcon icon={faMinus} />
        </StyledZoomButton>
      </StyledZoomOutControl>
    </>
  );
}


/*
* Styles
*/

const StyledZoomButton = styled.button`
  width: 2.25em;
  height: 2.25em;
  color: #888;
`;

const StyledZoomInControl = styled(Control)`
  border-bottom: none;
  border-radius: 4px 4px 0 0;

  && {
    margin-bottom: 0;
  }

  ${StyledZoomButton} {
    border-radius: 4px 4px 0  0;
  }
`;

const StyledZoomOutControl = styled(Control)`
  border-radius: 0 0 4px 4px;

  ${StyledZoomButton} {
    border-radius: 0 0 4px 4px;
  }
`;
