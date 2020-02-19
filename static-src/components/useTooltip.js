import React, { useState, useRef } from 'react';
import styled from 'styled-components';


/*
* Custom hook that lets a  component set a default hover tooltip
* message and imperatively display other temporary tooltip messages.
*/

const TOOLTIP_MESSAGE_DURATION = 3000;
const TOOLTIP_TRANSITION_DURATION = 250;

export default function useTooltip(hoverMessage) {
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

  const tooltip = (
    <StyledTooltip alwaysVisible={alwaysVisible}>
      { message }
    </StyledTooltip>
  );

  return [tooltip, showTooltipMessage];
}

export const StyledTooltip = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  padding: 0.35em 0.7em;
  margin-left: 0.5em;
  font-size: 0.75em;
  font-weight: bold;
  line-height: 1.25;
  color: white;
  white-space: nowrap;
  visibility: ${({ alwaysVisible }) => (alwaysVisible ? 'visible' : 'hidden')};
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  opacity: ${({ alwaysVisible }) => (alwaysVisible ? 1 : 0)};
  transition: visibility 0s ${TOOLTIP_TRANSITION_DURATION}ms, opacity ${TOOLTIP_TRANSITION_DURATION}ms;
  transform: translateY(-50%);
`;

export const TooltipParent = styled.div`
  position: relative;

  &:hover ${StyledTooltip} {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity ${TOOLTIP_TRANSITION_DURATION}ms;
  }
`;
