/*
*   Import libraries.
*/

import React, { useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
  Redirect,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';

import ProposalMapsPanelViewHeader from './ProposalMapsPanelViewHeader';
import ProposalMapsPanelViewBody from './ProposalMapsPanelViewBody';
import NarrativesPanelViewHeader from './NarrativesPanelViewHeader';
import NarrativesPanelViewBody from './NarrativesPanelViewBody';
import useMapEnabled from './useMapEnabled';
import useProposalMapsInVisibleArea from './useProposalMapsInVisibleArea';


const PROPOSAL_MAPS_PATH = '/proposal-maps';
const NARRATIVES_PATH = '/narratives';
const TAB_PATHS = [PROPOSAL_MAPS_PATH, NARRATIVES_PATH];
const TABS_BY_PATH = {

  [PROPOSAL_MAPS_PATH]: {
    title: 'Proposal Maps',
    HeaderComponent: ProposalMapsPanelViewHeader,
    BodyComponent: ProposalMapsPanelViewBody,
  },

  [NARRATIVES_PATH]: {
    title: 'Narratives',
    HeaderComponent: NarrativesPanelViewHeader,
    BodyComponent: NarrativesPanelViewBody,
  },

};


/*
* Panel component definition.  Handles routing to
* the correct tab depending on the URL path.  If no tab matches,
* the last-matched tab is displayed.
*/

export default function Panel() {
  const activeTabPath = useRef(PROPOSAL_MAPS_PATH);
  const match = useRouteMatch(TAB_PATHS);
  const location = useLocation();

  //  If path matches a different tab, switch to that tab.
  if (match && match.path !== activeTabPath.current) {
    activeTabPath.current = match.path;
  }

  const { HeaderComponent, BodyComponent } = TABS_BY_PATH[activeTabPath.current];

  const onlyShowProposalMapsInVisibleArea = useSelector(
    (state) => state.onlyShowProposalMapsInVisibleArea,
  );

  const mapEnabled = useMapEnabled(false);
  const proposalMapsInVisibleArea = useProposalMapsInVisibleArea();
  const nActiveProposalMaps = useMemo(() => (
    Object.keys(mapEnabled())
      .filter((id) => (
        onlyShowProposalMapsInVisibleArea ? proposalMapsInVisibleArea[id] : true
      ))
      .length
  ), [mapEnabled, onlyShowProposalMapsInVisibleArea, proposalMapsInVisibleArea]);

  //  If route is '/', redirect to the active tab path
  if (location.pathname === '/') {
    return <Redirect to={{ ...location, pathname: activeTabPath.current }} />;
  }

  return (
    <StyledPanel>
      <StyledTabs>
        {TAB_PATHS.map((tabPath) => (
          <StyledTabLink
            to={{ ...location, pathname: tabPath }}
            className={tabPath === activeTabPath.current ? 'active' : ''}
            key={tabPath}
          >
            {TABS_BY_PATH[tabPath].title}
            {tabPath === PROPOSAL_MAPS_PATH
              ? <StyledTabBadge>{nActiveProposalMaps}</StyledTabBadge>
              : null}
          </StyledTabLink>
        ))}
      </StyledTabs>
      <StyledActiveTabContent>
        <StyledPanelView>
          <StyledPanelViewHeader>
            <HeaderComponent tabPath={activeTabPath.current} />
          </StyledPanelViewHeader>
          <StyledPanelViewBody>
            <BodyComponent />
          </StyledPanelViewBody>
        </StyledPanelView>
      </StyledActiveTabContent>
    </StyledPanel>
  );
}


/*
* Styles for the Panel component.
*/

const StyledPanel = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.Panel};
  display: flex;
  flex-direction: column;
  width: 35em;
  height: 100%;
  margin-right: 0.75em;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: ${({ theme }) => theme.shadows.Panel};
`;

const StyledTabs = styled.div`
  z-index: 1;
  display: flex;
  flex-shrink: 0;
  height: 3em;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.radii.standard};
`;

const StyledTabLink = styled(Link)`
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-decoration: none;
  text-transform: lowercase;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-top-left-radius: ${({ theme }) => theme.radii.standard};
  border-top-right-radius: ${({ theme }) => theme.radii.standard};
  transition: background-color ${({ theme }) => theme.transitionDurations.linkHover};

  &.active {
    z-index: 1;
    font-weight: bolder;
    background-color: ${({ theme }) => theme.colors.panelBackground};
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

    &:hover {
      background-color: ${({ theme }) => theme.colors.panelBackground};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighterGrey};
    opacity: 1;
  }
`;

const StyledTabBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.35em;
  margin: 0.5em;
  font-size: 0.75em;
  font-weight: bold;
  line-height: 1.25;
  color: white;
  letter-spacing: -0.1em;
  background-color: ${({ theme }) => theme.colors.brightAccent};
  border-radius: 1em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const StyledActiveTabContent = styled.div`
  position: relative;
  z-index: 1;
  flex-grow: 1;
  height: 0;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: 5px;
`;

const StyledPanelView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledPanelViewHeader = styled.div`
  padding: 1.25em;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
`;

const StyledPanelViewBody = styled.div`
  padding: 1.25em;
  overflow-y: scroll;
`;
