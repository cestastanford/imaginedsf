/*
* Imports.
*/

import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import Control from './Control';
import MapListItem from '../MapListItem';

import basemapsIcon from '../../img/basemaps.png';
import { PROPOSAL_MAPS_ROUTE, NARRATIVES_ROUTE } from '../../constants';

const TAB_PATHS = [PROPOSAL_MAPS_ROUTE, NARRATIVES_ROUTE];

/*
* BasemapsControl component definition.
*/

export default function BasemapsControl() {
  const [collapsed, setCollapsed] = useState(false);
  const basemaps = useSelector((state) => state.mapContent.basemaps);
  const match = useRouteMatch(TAB_PATHS);
  const activeTabPath = useRef(null);

  //  If route is that of a different tab, expand/collapse appropriately
  useEffect(() => {
    if (match && match.path !== activeTabPath.current) {
      activeTabPath.current = match.path;
      setCollapsed(match.path === NARRATIVES_ROUTE);
    }
  }, [match]);

  return (
    <StyledBasemapsControl collapsed={collapsed}>
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
  padding: ${({ collapsed }) => (collapsed ? '0.3em 0.5em' : '0.5em 0.5em 0.5em 1em')};
  margin-top: auto;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: lowercase;
  cursor: pointer;
`;

const StyledIcon = styled.img`
  width: 1.2em;
  margin: -0.1em 0 0 0.75em;
`;

const StyledBasemapsList = styled.ul`
  margin-top: 0.5em;
  margin-bottom: 0.5em;

  & > li {
    margin: 0.15em 0;
  }
`;
