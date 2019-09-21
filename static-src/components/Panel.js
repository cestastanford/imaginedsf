/*
*   Import libraries.
*/

import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';

/*
*   Imports components.
*/

import RoutedPanelTabHandler from './RoutedPanelTabHandler';
import PanelView from './PanelView';
import IntroductionPanelViewBody from './IntroductionPanelViewBody';
import ProposalMapsPanelViewHeader from './ProposalMapsPanelViewHeader';
import ProposalMapsPanelViewBody from './ProposalMapsPanelViewBody';
import NarrativesPanelViewHeader from './NarrativesPanelViewHeader';
import NarrativersPanelViewBody from './NarrativersPanelViewBody';


/*
* Panel component definition.  Defines the panel views that will
* appear as tabs in the panel.
*/

export default function Panel() {
  return (
    <StyledPanel>
      <Router>
        <RoutedPanelTabHandler
          path="/*"
          tabs={[

            <PanelView
              tabPath=""
              tabTitle="Introduction"
              bodyContent={<IntroductionPanelViewBody />}
            />,

            <PanelView
              tabPath="proposal-maps"
              tabTitle="Proposal Maps"
              headerContent={<ProposalMapsPanelViewHeader />}
              bodyContent={<ProposalMapsPanelViewBody />}
            />,

            <PanelView
              tabPath="narratives"
              tabTitle="Narratives"
              headerContent={<NarrativesPanelViewHeader />}
              bodyContent={<NarrativersPanelViewBody />}
            />,

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
  margin-right: 0.75em;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: ${({ theme }) => theme.shadows.Panel};
`;
