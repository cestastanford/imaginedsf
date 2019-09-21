/*
* Imports libraries.
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/*
* PanelView component definition.  Renders some scrolling content
* with an optional static header as a tab on a Panel.
*/

export default function PanelView({ headerContent, bodyContent }) {
  return (
    <StyledPanelView>
      { headerContent ? (
        <StyledPanelViewHeader>{ headerContent }</StyledPanelViewHeader>
      ) : null }
      <StyledPanelViewBody>{ bodyContent }</StyledPanelViewBody>
    </StyledPanelView>
  );
}

PanelView.propTypes = {
  headerContent: PropTypes.node,
  bodyContent: PropTypes.node,
};

PanelView.defaultProps = {
  headerContent: null,
  bodyContent: null,
};


/*
* Styles for PanelView component.
*/

const StyledPanelView = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPanelViewHeader = styled.div`
  padding: 1.25em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledPanelViewBody = styled.div`
  flex-grow: 1;
  padding: 1.25em;
  overflow-y: scroll;
`;
