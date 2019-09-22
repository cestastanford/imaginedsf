/*
* Imports.
*/

import React, { useCallback } from 'react';
import { Match, Link, navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';

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

  const handleSlug = useCallback((slug) => {
    //  If slug exists and matches narrative
    if (slug && narrativesBySlug[slug]) {
      //  If slug narrative is not the current one in Redux state,
      //  update Redux state narrative to slug narrative
      if (narrativesBySlug[slug].ID !== currentNarrative) {
        dispatch(setCurrentNarrative(narrativesBySlug[slug].ID));
      }

      //  If slug narrative is the current one, do nothing
      return;
    }

    //  If slug does not exist or doesn't match a narrative, redirect
    //  to the current narrative in Redux state
    navigate(`/narratives/${narrativesById[currentNarrative].post_name}`);
  }, [narrativesBySlug, narrativesById, currentNarrative, dispatch]);

  return (
    <Match path="narratives/*">
      {({ match }) => {
        if (match) {
          handleSlug(match['*']);
        }

        return narratives.map((id) => {
          const narrative = narrativesById[id];
          return (
            <Link
              key={id}
              to={`/narratives/${narrative.post_name}`}
            >
              { narrative.post_title }
            </Link>
          );
        });
      }}
    </Match>
  );
}
