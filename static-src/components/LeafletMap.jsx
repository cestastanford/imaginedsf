import React from 'react';
import styled from 'styled-components';

export default function LeafletMap() {
  return (<StyledLeafletMap>LeafletMap</StyledLeafletMap>);
}

const StyledLeafletMap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.LeafletMap};
  width: 100%;
  height: 100%;
  background-color: peachpuff;
`;
