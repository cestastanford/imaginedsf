/*
*   Import libraries.
*/

import React, { useRef } from 'react';
import { Link, navigate } from '@reach/router';
import PropTypes from 'prop-types';


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
    <div>
      <div>
        {
          tabs.map((tab) => (
            <Link
              to={`/${tab.props.tabPath}`}
              style={{ color: tab === activeTab.current ? 'red' : 'inherit' }}
              key={tab.props.tabPath}
            >
              {tab.props.tabTitle}
            </Link>
          ))
        }
      </div>
      <div>{activeTab.current}</div>
    </div>
  );
}

RoutedPanelTabHandler.propTypes = {
  '*': PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.node).isRequired,
};

RoutedPanelTabHandler.defaultProps = {
  '*': '',
};
