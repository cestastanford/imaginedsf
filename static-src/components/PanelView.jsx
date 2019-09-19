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

export default function PanelView({ headerContent, children }) {
  return (
    <StyledPanelView>
      { headerContent ? (
        <StyledPanelViewHeader>{headerContent}</StyledPanelViewHeader>
      ) : null }
      <StyledPanelViewContent>{ children }</StyledPanelViewContent>
    </StyledPanelView>
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

const StyledPanelViewContent = styled.div`
  flex-grow: 1;
  padding: 1.25em;
  overflow-y: scroll;
`;
