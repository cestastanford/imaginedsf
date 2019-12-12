/*
*   Import libraries.
*/

import React, {
  useRef,
  useCallback,
  useState,
  useMemo,
} from 'react';

import { useSelector } from 'react-redux';
import {
  withRouter,
  Link,
  Route,
  Redirect,
} from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import PanelView from './PanelView';
import HTMLContent from './HTMLContent';
import ProposalMapsPanelViewHeader from './ProposalMapsPanelViewHeader';
import ProposalMapsPanelViewBody from './ProposalMapsPanelViewBody';
import NarrativesPanelViewHeader from './NarrativesPanelViewHeader';
import NarrativesPanelViewBody from './NarrativesPanelViewBody';
import useMapEnabled from './useMapEnabled';
import useProposalMapsInVisibleArea from './useProposalMapsInVisibleArea';


/*
* Panel component definition.  Handles routing to
* the correct tab depending on the URL path.  If no tab matches,
* the last-matched tab is displayed.
*/

const Panel = ({ location }) => {
  const previousPathWasTab = useRef(null);
  const { introduction } = useSelector((state) => state.contentAreaContent);
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

  //  Tabs
  const tabs = [
    <PanelView
      path="/introduction"
      title="Introduction"
      bodyContent={<HTMLContent content={introduction} />}
      key="introduction"
    />,

    <PanelView
      path="/proposal-maps"
      title="Proposal Maps"
      badge={nActiveProposalMaps}
      headerContent={<ProposalMapsPanelViewHeader />}
      bodyContent={<ProposalMapsPanelViewBody />}
      key="proposal-maps"
    />,

    <PanelView
      path="/narratives"
      title="Narratives"
      headerContent={<NarrativesPanelViewHeader pathPrefix="/narratives/" />}
      bodyContent={<NarrativesPanelViewBody />}
      key="narratives"
    />,
  ];

  const [activeTabPath, setActiveTabPath] = useState(tabs[0].props.path);
  const tabsByPath = Object.assign({}, ...tabs.map((tab) => ({ [tab.props.path]: tab })));
  const routePanelTabs = useCallback((childrenToRender) => (
    <Route path={Object.keys(tabsByPath)}>
      {({ match }) => {
        if (match) { // True if the current path matches a tab
          const activePath = match.path;
          if (activePath !== activeTabPath) {
            if (previousPathWasTab.current || previousPathWasTab.current === null) {
              //  If the previous path matched a tab and the current
              //  path also matches a tab, user is switching tabs;
              //  set active tab to the one matching the current
              //  path if not already.
              setActiveTabPath(activePath);
            } else {
              //  If the previous path didn't match a tab and the
              //  current path does match a tab, and the current
              //  path matches a different tab than the active one,
              //  user is closing a modal; do not update active tab.
              //  Instead, update route to the active tab's route.
              return (
                <Redirect
                  to={{
                    pathname: activeTabPath,
                    hash: location.hash,
                  }}
                />
              );
            }
          }

          previousPathWasTab.current = true;
        } else {
          previousPathWasTab.current = false;
        }

        return childrenToRender;
      }}
    </Route>
  ), [tabsByPath, activeTabPath, location.hash]);

  return routePanelTabs((
    <StyledPanel>
      <StyledTabs>
        {
          tabs.map((tab) => (
            <StyledTabLink
              to={{ pathname: tab.props.path, hash: location.hash }}
              className={tab.props.path === activeTabPath ? 'active' : ''}
              key={tab.props.path}
            >
              {tab.props.title}
              {tab.props.badge ? <StyledTabBadge>{tab.props.badge}</StyledTabBadge> : null}
            </StyledTabLink>
          ))
        }
      </StyledTabs>
      <StyledActiveTabContent>
        {tabsByPath[activeTabPath]}
      </StyledActiveTabContent>
    </StyledPanel>
  ));
};

Panel.propTypes = {
  location: PropTypes.shape({ hash: PropTypes.string.isRequired }).isRequired,
};

export default withRouter(Panel);


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
  align-items: center;
  justify-content: center;
  width: 33.33%;
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
  margin: 0.25em;
  font-size: 0.65em;
  font-weight: bold;
  line-height: 1.25;
  color: white;
  letter-spacing: -0.1em;
  background-color: red;
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
