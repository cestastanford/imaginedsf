import React, { useRef } from 'react';
import {
  useRouteMatch,
  useLocation,
  Redirect,
} from 'react-router-dom';

import {
  INTRODUCTION_ROUTE,
  BIBLIOGRAPHY_ROUTE,
  CREDITS_ROUTE,
  FEEDBACK_ROUTE,
  SHARE_ROUTE,
  DESCRIPTION_ROUTE,
  IMAGE_ROUTE,
} from '../../constants';

import IntroductionModal from './IntroductionModal';
import BibliographyModal from './BibliographyModal';
import CreditsModal from './CreditsModal';
import FeedbackModal from './FeedbackModal';
import ShareModal from './ShareModal';
import DescriptionModal from './DescriptionModal';
import PreviousLocationContext from './PreviousLocationContext';
import ImageModal from './ImageModal';


const ROUTED_MODALS_BY_PATH = {
  [INTRODUCTION_ROUTE]: IntroductionModal,
  [BIBLIOGRAPHY_ROUTE]: BibliographyModal,
  [CREDITS_ROUTE]: CreditsModal,
  [FEEDBACK_ROUTE]: FeedbackModal,
  [SHARE_ROUTE]: ShareModal,
  [`${DESCRIPTION_ROUTE}/:mapId`]: DescriptionModal,
  [`${IMAGE_ROUTE}/:imageUrl`]: ImageModal,
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
        <ModalComponent {...match.params} />
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
