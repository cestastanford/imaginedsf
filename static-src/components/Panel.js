/*
*   Import libraries.
*/

import React, { useRef, useCallback, useState } from 'react';
import {
  withRouter,
  Link,
  Route,
  Redirect,
} from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import PanelView from './PanelView';


/*
* Panel component definition.  Handles routing to
* the correct tab depending on the URL path.  If no tab matches,
* the last-matched tab is displayed.
*/

const Panel = ({ location, children }) => {
  const tabs = React.Children.toArray(children);
  const previousPathWasTab = useRef(null);
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
  children: PropTypes.arrayOf(PropTypes.shape({ type: PanelView })).isRequired,
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

const StyledActiveTabContent = styled.div`
  position: relative;
  z-index: 1;
  flex-grow: 1;
  height: 0;
  min-height: 0;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: 5px;
`;
