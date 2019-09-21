
/*
*   Import libraries.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

/*
*   Imports components.
*/

import HTMLContent from './HTMLContent';


/*
* IntroductionPanelViewBody component definition.
*/

export default function IntroductionPanelViewBody() {
  const content = useSelector((state) => state.contentAreaContent.introduction);
  return <StyledIntroductionPanelViewBody content={content} />;
}


/*
* Styles for the Panel component.
*/

const StyledIntroductionPanelViewBody = styled(HTMLContent)`
  font-size: 0.85em;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.darkerGrey};

  h2 {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.lightBlack};
  }

  p {
    font-weight: lighter;
  }

  strong {
    font-weight: bold;
  }
`;
