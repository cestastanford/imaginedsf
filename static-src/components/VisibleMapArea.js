/*
* Imports.
*/

import React from 'react';
import styled from 'styled-components';


/*
* Component definition for VisibleMapArea, which contains the map
* controls and is used in calculations for determining the bounds
* of the map area not hidden behind panels.
*/

const VisibleMapArea = React.forwardRef((props, ref) => (
  <StyledVisibleMapArea ref={ref}>
    VisibleMapArea Component
  </StyledVisibleMapArea>
));

export default VisibleMapArea;


/*
* Styles for the VisibleMapArea component.
*/

const StyledVisibleMapArea = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.VisibleMapArea};
  flex-grow: 1;
  border: 1px solid #fff;
`;
