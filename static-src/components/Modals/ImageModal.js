import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import Modal from './Modal';
import StyledModalPanel from './StyledModalPanel';


const StyledImageModalPanel = styled(StyledModalPanel)`
  width: 75%;
  height: 95%;
  max-height: none;
  padding: 2.5em 0 5em 0;
  margin-left: 0;
`;

export default function ImageModal({ imageUrl }) {
  return (
    <Modal ModalPanel={StyledImageModalPanel}>
      <StyledModalContent imageUrl={atob(imageUrl)} />
    </Modal>
  );
}

ImageModal.propTypes = {
  imageUrl: string.isRequired,
};

const StyledModalContent = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  background-image: url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
