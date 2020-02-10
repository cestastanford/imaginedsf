/*
* Imports.
*/

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Control from './Control';
import MapListItem from '../MapListItem';

import basemapsIcon from '../../img/basemaps.png';

/*
* BasemapsControl component definition.
*/

export default function BasemapsControl() {
  const [collapsed, setCollapsed] = useState(false);
  const basemaps = useSelector((state) => state.mapContent.basemaps);

  return (
    <StyledBasemapsControl>
      <StyledHeader onClick={() => setCollapsed(!collapsed)}>
        Basemaps
        <StyledIcon src={basemapsIcon} />
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

const StyledBasemapsControl = styled(Control)`
  align-self: flex-end;
  padding: 0.5em 1em;
  margin-top: auto;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
  font-weight: bold;
  text-transform: lowercase;
  cursor: pointer;
`;

const StyledIcon = styled.img`
  width: 1.5em;
  margin-left: 0.75em;
`;

const StyledBasemapsList = styled.ul`
  width: 17.5em;
  margin-top: 0.75em;

  & > li {
    margin: 0.25em 0;
  }
`;
