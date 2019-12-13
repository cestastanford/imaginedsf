/*
* Imports.
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  useRouteMatch,
  useLocation,
  Link,
  Redirect,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setCurrentNarrative } from '../state/actions';


/*
* NarrativesPanelViewHeader component definition.
*/

export default function NarrativesPanelViewHeader({ tabPath }) {
  const narratives = useSelector((state) => state.narratives);
  const narrativesBySlug = useSelector((state) => state.narrativesBySlug);
  const currentNarrative = useSelector((state) => state.currentNarrative);
  const dispatch = useDispatch();
  const match = useRouteMatch(`${tabPath}/:slug?`);
  const location = useLocation();

  if (match && match.params.slug !== currentNarrative) {
    if (narrativesBySlug[match.params.slug]) {
      dispatch(setCurrentNarrative(match.params.slug));
    } else {
      return <Redirect to={{ ...location, pathname: `${tabPath}/${currentNarrative}` }} />;
    }
  }

  return (
    <>
      <StyledTitle>Table of Contents</StyledTitle>
      <StyledNarrativesList>
        { narratives.map((slug) => (
          <StyledNarrativeLink
            key={slug}
            className={currentNarrative === slug ? 'current' : ''}
            to={{ ...location, pathname: `${tabPath}/${slug}` }}
          >
            { narrativesBySlug[slug].post_title }
          </StyledNarrativeLink>
        ))}
      </StyledNarrativesList>
    </>
  );
}

NarrativesPanelViewHeader.propTypes = {
  tabPath: PropTypes.string.isRequired,
};


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
    color: ${({ theme }) => theme.colors.brightAccent};
    opacity: 1;
  }
`;
