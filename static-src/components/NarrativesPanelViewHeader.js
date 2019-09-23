/*
* Imports.
*/

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setCurrentNarrative } from '../state/actions';


/*
* NarrativesPanelViewHeader component definition.
*/

const NarrativesPanelViewHeader = ({ location, pathPrefix }) => {
  const narratives = useSelector((state) => state.narratives);
  const narrativesById = useSelector((state) => state.narrativesById);
  const currentNarrative = useSelector((state) => state.currentNarrative);
  const dispatch = useDispatch();
  const narrativesBySlug = Object.assign(
    {},
    ...Object.values(narrativesById).map((n) => ({ [n.post_name]: n })),
  );

  const routeNarratives = useCallback(
    (children) => (
      <Route path={`${pathPrefix}:slug?`}>
        {({ match }) => {
          if (match) {
            const narrative = narrativesBySlug[match.params.slug];
            if (narrative) {
              //  If slug in URL and matches narrative
              if (narrative.ID !== currentNarrative) {
                //  If slug narrative is not the current one in Redux state,
                //  update Redux state narrative to slug narrative
                dispatch(setCurrentNarrative(narrative.ID));
              }
            } else {
              //  If slug not in URL or doesn't match a narrative, redirect
              //  to the current narrative in Redux state
              return (
                <Redirect
                  to={{
                    pathname: `${pathPrefix}${narrativesById[currentNarrative].post_name}`,
                    hash: location.hash,
                  }}
                />
              );
            }
          }

          return children;
        }}
      </Route>
    ),
    [
      narrativesBySlug,
      narrativesById,
      currentNarrative,
      dispatch,
      location.hash,
      pathPrefix,
    ],
  );

  return routeNarratives((
    <>
      <StyledTitle>Table of Contents</StyledTitle>
      <StyledNarrativesList>
        { narratives.map((id) => (
          <StyledNarrativeLink
            key={id}
            className={currentNarrative === id ? 'current' : ''}
            to={{
              pathname: `${pathPrefix}${narrativesById[id].post_name}`,
              hash: location.hash,
            }}
          >
            { narrativesById[id].post_title }
          </StyledNarrativeLink>
        ))}
      </StyledNarrativesList>
    </>
  ));
};

NarrativesPanelViewHeader.propTypes = {
  location: PropTypes.shape({ hash: PropTypes.string.isRequired }).isRequired,
  pathPrefix: PropTypes.string.isRequired,
};

export default withRouter(NarrativesPanelViewHeader);


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
