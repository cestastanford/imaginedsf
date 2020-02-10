import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HTMLContent from '../HTMLContent';
import Modal from './Modal';
import PreviousLocationContext from './PreviousLocationContext';


export default function IntroductionModal() {
  const introduction = useSelector((state) => state.contentAreaContent.introduction);
  const previousLocation = useContext(PreviousLocationContext);

  return (
    <Modal
      title="Introduction"
      footerContent={(
        <StyledBeginButtonContainer>
          <StyledBeginButton to={previousLocation}>Begin</StyledBeginButton>
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
