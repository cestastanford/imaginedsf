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

import PanelTabRouter from './PanelTabRouter';
import PanelView from './PanelView';
import HTMLContent from './HTMLContent';
import ProposalMapsPanelViewHeader from './ProposalMapsPanelViewHeader';
import ProposalMapsPanelViewBody from './ProposalMapsPanelViewBody';
import NarrativesPanelViewHeader from './NarrativesPanelViewHeader';
import NarrativesPanelViewBody from './NarrativesPanelViewBody';


/*
* Panel component definition.  Defines the panel views that will
* appear as tabs in the panel.
*/

export default function Panel() {
  const introductionContent = useSelector((state) => state.contentAreaContent.introduction);

  return (
    <StyledPanel>
      <Router>
        <PanelTabRouter
          path="/*"
          tabs={[

            <PanelView
              tabMatch="^$"
              tabLink="/"
              tabTitle="Introduction"
              bodyContent={<HTMLContent content={introductionContent} />}
            />,

            <PanelView
              tabMatch="proposal-maps"
              tabLink="/proposal-maps"
              tabTitle="Proposal Maps"
              headerContent={<ProposalMapsPanelViewHeader />}
              bodyContent={<ProposalMapsPanelViewBody />}
            />,

            <PanelView
              tabMatch="narratives"
              tabLink="/narratives"
              tabTitle="Narratives"
              headerContent={<NarrativesPanelViewHeader />}
              bodyContent={<NarrativesPanelViewBody />}
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
