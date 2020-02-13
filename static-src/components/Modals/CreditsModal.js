import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Modal from './Modal';
import HTMLContent from '../HTMLContent';

export default function CreditsModal() {
  const credits = useSelector((state) => state.contentAreaContent.credits);
  return (
    <Modal title="Credits">
      <StyledModalContent content={credits} />
    </Modal>
  );
}

const StyledModalContent = styled(HTMLContent)`
  overflow: scroll;
`;
