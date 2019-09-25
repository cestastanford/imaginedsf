/*
* Imports.
*/

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LatLngBounds } from 'leaflet';

import useMapEnabled from './useMapEnabled';
import useZoomToBounds from './useZoomToBounds';
import Control, { useControlTooltip } from './Control';
import extentsImg from '../img/extents.png';
import extentsActiveImg from '../img/extents-active.png';

/*
* ZoomToExtentsControl component definition.
*/

export default function ZoomToExtentsControl() {
  //  Retrieves IDs of enabled maps.
  const getMapEnabled = useMapEnabled();
  const mapItems = useSelector((state) => state.mapContent.mapItems);

  const allEnabledMapBoundingPoints = useMemo(() => {
    const mapEnabled = getMapEnabled();
    return [].concat(...Object.keys(mapEnabled)
      .filter((id) => mapItems[id].metadata.has_bounds)
      .map((id) => mapItems[id].metadata.bounds));
  }, [getMapEnabled, mapItems]);

  const bounds = new LatLngBounds(allEnabledMapBoundingPoints);
  const [zoomToBounds, isZoomedToBounds] = useZoomToBounds(bounds);

  const tooltip = useControlTooltip(
    'Zoom to full extents of active maps',
  )[1];

  return (
    <Control tooltip={tooltip}>
      <StyledButton
        className="button"
        onClick={zoomToBounds}
        disabled={!bounds.isValid()}
      >
        <img src={isZoomedToBounds ? extentsActiveImg : extentsImg} alt="Zoom to full extents of active maps" />
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
`;
