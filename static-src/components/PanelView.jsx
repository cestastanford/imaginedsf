/*
* Imports libraries.
*/

import React from 'react';
import PropTypes from 'prop-types';


/*
* PanelView component definition.  Renders some scrolling content
* with an optional static header as a tab on a Panel.
*/

export default function PanelView({ headerContent, children }) {
  return (
    <div>
      { headerContent ? <div>{headerContent}</div> : null }
      { children }
    </div>
  );
}

PanelView.propTypes = {
  headerContent: PropTypes.node,
  children: PropTypes.node,
};

PanelView.defaultProps = {
  headerContent: null,
  children: null,
};
