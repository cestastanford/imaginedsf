import React, { useRef } from 'react';
import {
  useRouteMatch,
  useLocation,
  Redirect,
} from 'react-router-dom';

import IntroductionModal from './IntroductionModal';
import BibliographyModal from './BibliographyModal';
import CreditsModal from './CreditsModal';
import FeedbackModal from './FeedbackModal';
import ShareModal from './ShareModal';
import PreviousLocationContext from './PreviousLocationContext';


const ROUTED_MODALS_BY_PATH = {
  '/introduction': IntroductionModal,
  '/bibliography': BibliographyModal,
  '/credits': CreditsModal,
  '/feedback': FeedbackModal,
  '/share': ShareModal,
};

export default function Modals() {
  const location = useLocation();
  const previousLocationRef = useRef({ ...location, pathname: '/' });
  const match = useRouteMatch(Object.keys(ROUTED_MODALS_BY_PATH));

  if (!previousLocationRef.current.hash && location.hash) {
    previousLocationRef.current = { ...previousLocationRef.current, hash: location.hash };
  }

  if (match) {
    const ModalComponent = ROUTED_MODALS_BY_PATH[match.path];
    return (
      <PreviousLocationContext.Provider value={previousLocationRef.current}>
        <ModalComponent />
      </PreviousLocationContext.Provider>
    );
  }

  //  Saves the last non-modal route location
  previousLocationRef.current = location;

  if (!location.hash) {
    return <Redirect to={{ ...location, pathname: '/introduction' }} />;
  }

  return null;
}
