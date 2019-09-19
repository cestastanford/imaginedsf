/*
*   Import libraries.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { Router } from '@reach/router';
import styled from 'styled-components';

/*
*   Imports components.
*/

import RoutedPanelTabHandler from './RoutedPanelTabHandler';
import PanelView from './PanelView';
import { HTMLContent } from './reusable-components';


/*
* Panel component definition.  Defines the panel views that will
* appear as tabs in the panel.
*/

export default function Panel() {
  const introductionContent = useSelector((state) => state.contentAreaContent.introduction);

  return (
    <StyledPanel>
      <Router>
        <RoutedPanelTabHandler
          path="/*"
          tabs={[

            <PanelView
              tabPath=""
              tabTitle="Introduction"
            >
              <IntroductionContent content={introductionContent} />
            </PanelView>,

            <PanelView
              tabPath="proposal-maps"
              tabTitle="Proposal Maps"
              headerContent="Here is some header content."
            >
              Proposal Maps panel view content.
            </PanelView>,

            <PanelView
              tabPath="narratives"
              tabTitle="Narratives"
            >
              Narratives panel view content.
            </PanelView>,

          ]}
        />
      </Router>
    </StyledPanel>
  );
}


/*
* Styles for the Panel component.
*/

const StyledPanel = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.Panel};
  width: 35em;
  margin-right: 1.25em;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: ${({ theme }) => theme.shadows.Panel};
`;

const IntroductionContent = styled(HTMLContent)`
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
