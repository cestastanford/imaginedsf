/*
* Imports
*/

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/*
* A container for control content that renders a tooltip when the
* tooltip prop is truthy.
*/

export default function Control({ tooltip, children, className }) {
  return (
    <StyledControl className={className}>
      { tooltip ? (
        <StyledTooltip alwaysVisible={tooltip.alwaysVisible}>
          { tooltip.message }
        </StyledTooltip>
      ) : null }
      { children }
    </StyledControl>
  );
}

Control.propTypes = {
  tooltip: PropTypes.shape({
    alwaysVisible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Control.defaultProps = {
  tooltip: null,
  className: '',
};


/*
* Custom hook that lets a control component set a default hover tooltip
* message and imperatively display other temporary tooltip messages.
*/

const TOOLTIP_MESSAGE_DURATION = 3000;
const TOOLTIP_TRANSITION_DURATION = 250;
export const useControlTooltip = (hoverMessage) => {
  const [alwaysVisible, setAlwaysVisible] = useState(false);
  const [message, setMessage] = useState(hoverMessage);
  const timeoutId = useRef();

  const showTooltipMessage = (alwaysVisibleMessage) => {
    clearTimeout(timeoutId.current);
    setMessage(alwaysVisibleMessage);
    setAlwaysVisible(true);
    timeoutId.current = setTimeout(() => {
      setAlwaysVisible(false);
      setTimeout(() => {
        setMessage(hoverMessage);
      }, TOOLTIP_TRANSITION_DURATION);
    }, TOOLTIP_MESSAGE_DURATION);
  };

  return [showTooltipMessage, { message, alwaysVisible }];
};


/*
* Styles
*/

const StyledTooltip = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  width: 15em;
  padding: 0.5em 0.75em;
  margin-left: 1em;
  font-size: 0.8em;
  font-weight: bold;
  line-height: 1.25;
  color: white;
  visibility: ${({ alwaysVisible }) => (alwaysVisible ? 'visible' : 'hidden')};
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  opacity: ${({ alwaysVisible }) => (alwaysVisible ? 1 : 0)};
  transition: visibility 0s ${TOOLTIP_TRANSITION_DURATION}ms, opacity ${TOOLTIP_TRANSITION_DURATION}ms;
  transform: translateY(-50%);
`;

const StyledControl = styled.div`
  position: relative;
  pointer-events: all;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: ${({ theme }) => theme.shadows.Control};

  &:not(:last-child) {
    margin-bottom: 0.75em;
  }

  &:hover ${StyledTooltip} {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity ${TOOLTIP_TRANSITION_DURATION}ms;
  }
`;
