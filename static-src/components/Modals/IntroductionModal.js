import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import HTMLContent from '../HTMLContent';
import Modal from './Modal';


export default function IntroductionModal() {
  const introduction = useSelector((state) => state.contentAreaContent.introduction);
  const location = useLocation();
  const history = useHistory();

  const closeModal = () => history.push({ ...location, pathname: '/' });

  return (
    <Modal
      title="Introduction"
      footerContent={(
        <StyledBeginButtonContainer>
          <StyledBeginButton onClick={closeModal}>Begin</StyledBeginButton>
        </StyledBeginButtonContainer>
      )}
    >
      <HTMLContent content={introduction} />
    </Modal>
  );
}

const StyledBeginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
`;


const StyledBeginButton = styled.a`
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
