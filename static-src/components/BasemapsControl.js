/*
* Imports.
*/

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import StyledControl from './StyledControl';
import MapListItem from './MapListItem';

import basemapsIcon from '../img/basemaps.png';
import closeIcon from '../img/close.png';

/*
* BasemapsControl component definition.
*/

export default function BasemapsControl() {
  const [collapsed, setCollapsed] = useState(false);
  const basemaps = useSelector((state) => state.mapContent.basemaps);

  return (
    <StyledBasemapsControl>
      <StyledHeader onClick={() => setCollapsed(!collapsed)}>
        <StyledHeaderText>
          Basemaps
          <StyledIcon src={basemapsIcon} />
        </StyledHeaderText>
        { collapsed ? null : <StyledIcon src={closeIcon} /> }
      </StyledHeader>
      { collapsed ? null : (
        <StyledBasemapsList>
          { basemaps.map((id) => <MapListItem key={id} id={id} />) }
        </StyledBasemapsList>
      ) }
    </StyledBasemapsControl>
  );
}


/*
* Styles for BasemapsControl component.
*/

const StyledBasemapsControl = styled(StyledControl)`
  align-self: flex-end;
  padding: 0.5em 1em;
  margin-top: auto;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: lowercase;
  cursor: pointer;
`;

const StyledHeaderText = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const StyledIcon = styled.img`
  width: 1.5em;
  margin-left: 0.75em;
`;

const StyledBasemapsList = styled.ul`
  width: 17.5em;
  margin-top: 0.5em;

  & > li {
    margin: 0.25em 0;
  }
`;
