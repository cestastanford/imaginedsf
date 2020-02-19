/*
* Imports
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TooltipParent } from '../useTooltip';


/*
* A container for control content that renders a tooltip when the
* tooltip prop is truthy.
*/

export default function Control({ tooltip, children, className }) {
  return (
    <StyledControl className={className}>
      { tooltip }
      { children }
    </StyledControl>
  );
}

Control.propTypes = {
  tooltip: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Control.defaultProps = {
  tooltip: null,
  className: '',
};


/*
* Styles
*/

const StyledControl = styled(TooltipParent)`
  pointer-events: all;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: ${({ theme }) => theme.shadows.Control};

  &:not(:last-child) {
    margin-bottom: 0.75em;
  }
`;
