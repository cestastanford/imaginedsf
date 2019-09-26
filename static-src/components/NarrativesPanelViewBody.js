/*
* Imports.
*/

import React from 'react';
import { useSelector } from 'react-redux';

import HTMLContent from './HTMLContent';


/*
* NarrativesPanelViewBody component definition.
*/

export default function NarrativesPanelViewBody() {
  const currentNarrativeId = useSelector((state) => state.currentNarrative);
  const currentNarrative = useSelector((state) => state.narrativesById[currentNarrativeId]);

  return (
    <HTMLContent content={currentNarrative.post_content}>
      <h2>{currentNarrative.post_title}</h2>
    </HTMLContent>
  );
}
