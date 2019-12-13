import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import HTMLContent from './HTMLContent';
import Modal from './Modal';
import FeedbackForm from './FeedbackForm';


function IntroductionModal() {
  const introduction = useSelector((state) => state.contentAreaContent.introduction);
  return (
    <Modal title="Introduction">
      <HTMLContent content={introduction} />
    </Modal>
  );
}


function BibliographyModal() {
  const bibliography = useSelector((state) => state.contentAreaContent.bibliography);
  return (
    <Modal title="Bibliography">
      <HTMLContent content={bibliography} />
    </Modal>
  );
}


function CreditsModal() {
  const credits = useSelector((state) => state.contentAreaContent.credits);
  return (
    <Modal title="Credits">
      <HTMLContent content={credits} />
    </Modal>
  );
}


function FeedbackModal() {
  const feedback = useSelector((state) => state.contentAreaContent.feedback);
  return (
    <Modal title="Feedback">
      <HTMLContent content={feedback} />
      <FeedbackForm />
    </Modal>
  );
}


const MODALS_BY_PATH = {
  '/introduction': IntroductionModal,
  '/bibliography': BibliographyModal,
  '/credits': CreditsModal,
  '/feedback': FeedbackModal,
};


export default function Modals() {
  const match = useRouteMatch(Object.keys(MODALS_BY_PATH));
  if (match) {
    const ModalComponent = MODALS_BY_PATH[match.path];
    return <ModalComponent />;
  }

  return null;
}
