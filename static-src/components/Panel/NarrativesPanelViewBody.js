/*
* Imports.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import HTMLContent from '../HTMLContent';
import useLinkAutoClick, { AUTO_CLICKED_CLASS } from './useLinkAutoClick';


/*
* NarrativesPanelViewBody component definition.
*/

export default function NarrativesPanelViewBody() {
  const currentNarrativeSlug = useSelector((state) => state.currentNarrative);
  const currentNarrative = useSelector((state) => state.narrativesBySlug[currentNarrativeSlug]);
  const containerProps = useLinkAutoClick();

  return (
    <StyledScrollingContainer {...containerProps}>
      { currentNarrative ? (
        <HTMLContent content={currentNarrative.post_content}>
          <h2>{currentNarrative.post_title}</h2>
        </HTMLContent>
      ) : (
        <em>Select a narrative from the Table of Contents above.</em>
      ) }
    </StyledScrollingContainer>
  );
}

const StyledScrollingContainer = styled.div`
  height: 100%;
  padding: 0.25em 0;
  overflow-y: scroll;

  a[href^="#"] {
    color: ${({ theme }) => theme.colors.darkAccent};

    &.${AUTO_CLICKED_CLASS} {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.brightAccent};
      letter-spacing: -0.025em;
    }
  }
`;
