/*
* Imports.
*/

import React, { useCallback } from 'react';
import { Match, Link, navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setCurrentNarrative } from '../state/actions';


/*
* NarrativesPanelViewHeader component definition.
*/

export default function NarrativesPanelViewHeader() {
  const narratives = useSelector((state) => state.narratives);
  const narrativesById = useSelector((state) => state.narrativesById);
  const currentNarrative = useSelector((state) => state.currentNarrative);
  const dispatch = useDispatch();
  const narrativesBySlug = Object.assign(
    ...Object.values(narrativesById).map((n) => ({ [n.post_name]: n })),
  );

  const routeNarratives = useCallback((children) => (
    <Match path="narratives/*">
      {/* Receives { match } on every location change */}
      {({ match }) => {
        if (match) {
          const slug = match['*'];
          if (slug && narrativesBySlug[slug]) {
            //  If slug in URL and matches narrative
            if (narrativesBySlug[slug].ID !== currentNarrative) {
              //  If slug narrative is not the current one in Redux state,
              //  update Redux state narrative to slug narrative
              dispatch(setCurrentNarrative(narrativesBySlug[slug].ID));
            }
          } else {
            //  If slug not in URL or doesn't match a narrative, redirect
            //  to the current narrative in Redux state
            navigate(`/narratives/${narrativesById[currentNarrative].post_name}`);
          }
        }

        return children;
      }}
    </Match>
  ), [narrativesBySlug, narrativesById, currentNarrative, dispatch]);

  return routeNarratives((
    <>
      <StyledTitle>Table of Contents</StyledTitle>
      <StyledNarrativesList>
        { narratives.map((id) => (
          <StyledNarrativeLink
            key={id}
            to={`/narratives/${narrativesById[id].post_name}`}
            className={currentNarrative === id ? 'current' : ''}
          >
            { narrativesById[id].post_title }
          </StyledNarrativeLink>
        ))}
      </StyledNarrativesList>
    </>
  ));
}


/*
* Styles.
*/

const StyledTitle = styled.div`
  margin-bottom: 0.25em;
  font-size: 1.15em;
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: uppercase;
`;

const StyledNarrativesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNarrativeLink = styled(Link)`
  margin-top: 0.25em;
  color: inherit;
  transition: opacity ${({ theme }) => theme.transitionDurations.linkHover};

  &:hover {
    opacity: ${({ theme }) => theme.opacities.linkHover};
  }

  &.current,
  &.current:hover {
    font-weight: bolder;
    color: ${({ theme }) => theme.colors.brightRed};
    opacity: 1;
  }
`;
