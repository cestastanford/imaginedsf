import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Modal from './Modal';
import HTMLContent from '../HTMLContent';

export default function BibliographyModal() {
  const bibliography = useSelector((state) => state.contentAreaContent.bibliography);
  return (
    <Modal title="Bibliography">
      <StyledModalContent content={bibliography} />
    </Modal>
  );
}

const StyledModalContent = styled(HTMLContent)`
  overflow: scroll;
`;
