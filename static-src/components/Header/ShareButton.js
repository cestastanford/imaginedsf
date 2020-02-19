import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import useTooltip, { TooltipParent, StyledTooltip } from '../useTooltip';
import { SHARE_ROUTE } from '../../constants';

import shareImg from '../../img/share.svg';


export default function ShareButton() {
  const match = useRouteMatch(SHARE_ROUTE);
  const [tooltip] = useTooltip('Share');

  return (
    <StyledShareButton>
      <StyledShareIcon src={shareImg} alt="share" />
      { match ? null : tooltip }
    </StyledShareButton>
  );
}

const StyledShareButton = styled(TooltipParent)`
  ${StyledTooltip} {
    top: 4.5em;
    right: auto;
    bottom: auto;
    left: 50%;
    margin: 0;
    transform: translateX(-50%);
  }
`;

const StyledShareIcon = styled.img`
  position: relative;
  top: -0.15em;
  height: 1.75em;
`;
