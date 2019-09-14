/*
*   Import libraries.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { Router } from '@reach/router';

/*
*   Imports components.
*/

import RoutedPanelTabHandler from './RoutedPanelTabHandler';
import PanelView from './PanelView';


/*
* Panel component definition.  Defines the panel views that will
* appear as tabs in the panel.
*/

export default function Panel() {
  const introductionContent = useSelector((state) => state.contentAreaContent.introduction);

  return (
    <Router>
      <RoutedPanelTabHandler
        path="/*"
        tabs={[

          <PanelView
            tabPath=""
            tabTitle="Introduction"
          >
            <div dangerouslySetInnerHTML={{ __html: introductionContent }} /> {/* eslint-disable-line */}
          </PanelView>,

          <PanelView
            tabPath="proposal-maps"
            tabTitle="Proposal Maps"
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
  );
}
