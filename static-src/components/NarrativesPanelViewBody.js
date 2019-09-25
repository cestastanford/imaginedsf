/*
* Imports.
*/

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import HTMLContent from './HTMLContent';


/*
* NarrativesPanelViewBody component definition.
*/

export default function NarrativesPanelViewBody() {
  const narrativeContentRef = useRef();
  const currentNarrativeId = useSelector((state) => state.currentNarrative);
  const currentNarrative = useSelector((state) => state.narrativesById[currentNarrativeId]);

  useEffect(() => {
    const handleScroll = (event) => {
      console.log('hello');
      console.log(event);
      console.log(narrativeContentRef.current);
    };

    window.addEventListener('scroll', handleScroll);
    return window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={narrativeContentRef}>
      <HTMLContent content={currentNarrative.post_content}>
        <h2>{currentNarrative.post_title}</h2>
      </HTMLContent>
    </div>
  );
}
