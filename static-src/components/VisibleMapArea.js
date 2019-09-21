/*
* Imports.
*/

import React from 'react';
import styled from 'styled-components';
import AddressSearchControl from './AddressSearchControl';
import ZoomControl from './ZoomControl';
import ZoomToExtentsControl from './ZoomToExtentsControl';
import ZoomToLocationControl from './ZoomToLocationControl';
import BasemapsControl from './BasemapsControl';

/*
* Component definition for VisibleMapArea, which contains the map
* controls and is used in calculations for determining the bounds
* of the map area not hidden behind panels.
*/

const VisibleMapArea = React.forwardRef((props, ref) => (
  <StyledVisibleMapArea ref={ref}>
    <AddressSearchControl />
    <ZoomControl />
    <ZoomToExtentsControl />
    <ZoomToLocationControl />
    <BasemapsControl />
  </StyledVisibleMapArea>
));

export default VisibleMapArea;


/*
* Styles for the VisibleMapArea component.
*/

const StyledVisibleMapArea = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.VisibleMapArea};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  pointer-events: none;
`;
