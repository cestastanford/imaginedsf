import React from 'react';
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


const ROUTED_MODALS_BY_PATH = {
  '/introduction': IntroductionModal,
  '/bibliography': BibliographyModal,
  '/credits': CreditsModal,
  '/feedback': FeedbackModal,
  '/share': ShareModal,
};

export default function Modals() {
  const match = useRouteMatch(Object.keys(ROUTED_MODALS_BY_PATH));
  const location = useLocation();

  if (match) {
    const ModalComponent = ROUTED_MODALS_BY_PATH[match.path];
    return <ModalComponent />;
  }

  if (!location.hash) {
    return <Redirect to={{ ...location, pathname: '/introduction' }} />;
  }

  return null;
}
