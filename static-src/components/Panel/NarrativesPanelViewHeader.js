/*
* Imports.
*/

import React from 'react';
import {
  useRouteMatch,
  useLocation,
  Link,
  Redirect,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setCurrentNarrative } from '../../state/actions';
import { NARRATIVES_ROUTE } from '../../constants';


/*
* NarrativesPanelViewHeader component definition.
*/

export default function NarrativesPanelViewHeader() {
  const narratives = useSelector((state) => state.narratives);
  const narrativesBySlug = useSelector((state) => state.narrativesBySlug);
  const currentNarrative = useSelector((state) => state.currentNarrative);
  const dispatch = useDispatch();
  const match = useRouteMatch(`${NARRATIVES_ROUTE}/:slug?`);
  const location = useLocation();

  if (match && match.params.slug !== currentNarrative) {
    if (narrativesBySlug[match.params.slug]) {
      dispatch(setCurrentNarrative(match.params.slug));
    } else if (currentNarrative) {
      return <Redirect to={{ ...location, pathname: `${NARRATIVES_ROUTE}/${currentNarrative}` }} />;
    }
  }

  return (
    <StyledHeader>
      <StyledTitle>Table of Contents</StyledTitle>
      <StyledNarrativesList>
        { narratives.map((slug) => (
          <StyledNarrativeLink
            key={slug}
            className={currentNarrative === slug ? 'current' : ''}
            to={{ ...location, pathname: `${NARRATIVES_ROUTE}/${slug}` }}
          >
            { narrativesBySlug[slug].post_title }
          </StyledNarrativeLink>
        ))}
      </StyledNarrativesList>
    </StyledHeader>
  );
}


/*
* Styles.
*/

const StyledHeader = styled.div`
  padding: 1.25em;
  overflow-y: scroll;
`;

const StyledTitle = styled.div`
  margin-bottom: 0.25em;
  font-size: 1.1em;
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: uppercase;
`;

const StyledNarrativesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNarrativeLink = styled(Link)`
  margin-top: 0.5em;
  line-height: 1.25;
  color: inherit;
  transition: opacity ${({ theme }) => theme.transitionDurations.linkHover};

  &:hover {
    opacity: ${({ theme }) => theme.opacities.linkHover};
  }

  &.current,
  &.current:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.brightAccent};
    letter-spacing: -0.015em;
    opacity: 1;
  }
`;
