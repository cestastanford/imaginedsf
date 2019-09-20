/*
*   Import libraries.
*/

import React, { useRef } from 'react';
import { Link, navigate } from '@reach/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/*
* RoutedPanelTabHandler component definition.  Handles routing to
* the correct tab depending on the URL path.  If no tab matches,
* the last-matched tab is displayed.
*/

export default function RoutedPanelTabHandler(props) {
  const { '*': activePath, tabs } = props;

  const activeTab = useRef(tabs[0]);
  const previousPathTab = useRef(tabs[0]);

  const pathTab = tabs.filter((tab) => tab.props.tabPath === activePath)[0];
  if (pathTab) {
    if (previousPathTab.current) {
      activeTab.current = pathTab;
    } else if (pathTab !== activeTab.current) {
      navigate(`/${activeTab.current.props.tabPath}`);
    }
  }

  previousPathTab.current = pathTab;

  return (
    <StyledRoutedPanelTabHandler>
      <StyledTabs>
        {
          tabs.map((tab) => (
            <StyledTab
              to={`/${tab.props.tabPath}`}
              className={tab === activeTab.current ? 'active' : ''}
              key={tab.props.tabPath}
            >
              {tab.props.tabTitle}
            </StyledTab>
          ))
        }
      </StyledTabs>
      <StyledRoutedActiveTabContent>
        {activeTab.current}
      </StyledRoutedActiveTabContent>
    </StyledRoutedPanelTabHandler>
  );
}

RoutedPanelTabHandler.propTypes = {
  '*': PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.node).isRequired,
};

RoutedPanelTabHandler.defaultProps = {
  '*': '',
};


/*
* Styles for the RoutedPanelTabHandler component.
*/

const StyledRoutedPanelTabHandler = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTabs = styled.div`
  z-index: 1;
  display: flex;
  height: 2.75em;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const StyledTab = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.33%;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-decoration: none;
  text-transform: lowercase;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-top-left-radius: ${({ theme }) => theme.radii.standard};
  border-top-right-radius: ${({ theme }) => theme.radii.standard};
  transition: background-color ${({ theme }) => theme.transitionDurations.linkHover};

  &.active {
    font-weight: bolder;
    background-color: ${({ theme }) => theme.colors.panelBackground};

    &:hover {
      background-color: ${({ theme }) => theme.colors.panelBackground};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighterGrey};
    opacity: 1;
  }
`;

const StyledRoutedActiveTabContent = styled.div`
  flex-grow: 1;
`;
