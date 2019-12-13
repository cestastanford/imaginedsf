import React from 'react';
import { useSelector } from 'react-redux';
import {
  useRouteMatch,
  useLocation,
  Redirect,
  Link,
} from 'react-router-dom';

import styled from 'styled-components';

import HTMLContent from './HTMLContent';
import Modal from './Modal';
import FeedbackForm from './FeedbackForm';


function IntroductionModal() {
  const introduction = useSelector((state) => state.contentAreaContent.introduction);
  const location = useLocation();

  return (
    <Modal
      title="Introduction"
      footerContent={(
        <StyledBeginButtonContainer>
          <StyledBeginButton to={{ ...location, pathname: '/' }}>Begin</StyledBeginButton>
        </StyledBeginButtonContainer>
      )}
    >
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
  const location = useLocation();

  if (match) {
    const ModalComponent = MODALS_BY_PATH[match.path];
    return <ModalComponent />;
  }

  if (!location.hash) {
    return <Redirect to={{ ...location, pathname: '/introduction' }} />;
  }

  return null;
}


const StyledBeginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
`;


const StyledBeginButton = styled(Link)`
  display: block;
  padding: 0.35em 0.75em;
  font-size: 1.4em;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.lightBlack};
  border-radius: 2px;
  transition: opacity 0.2s;

  :hover {
    color: white;
    opacity: 0.9;
  }
`;
