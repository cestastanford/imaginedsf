/*
* Imports.
*/

import React from 'react';
import styled from 'styled-components';

import StyledControl from './StyledControl';

/*
* BasemapsControl component definition.
*/

export default function BasemapsControl() {
  return <StyledBasemapsControl>BasemapsControl</StyledBasemapsControl>;
}


/*
* Styles for BasemapsControl component.
*/

const StyledBasemapsControl = styled(StyledControl)`
  align-self: flex-end;
  margin-top: auto;
`;
