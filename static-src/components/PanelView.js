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
      <div>
        <StyledPanelViewBody>
          { bodyContent }
        </StyledPanelViewBody>
      </div>
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
  height: 100%;
`;

const StyledPanelViewHeader = styled.div`
  padding: 1.25em;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
`;

const StyledPanelViewBody = styled.div`
  height: 100%;
  padding: 1.25em;
  overflow-y: scroll;
`;
