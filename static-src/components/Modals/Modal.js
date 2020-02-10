/*
* Imports.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';


/*
* Modal component definition.
*/

export default function Modal({
  title,
  children,
  footerContent,
  isSideModal,
}) {
  const location = useLocation();
  const history = useHistory();

  const closeModal = () => history.push({ ...location, pathname: '/' });

  return (
    <StyledModal>
      <StyledModalCloseBackground onClick={closeModal} />
      <StyledModalPanel isSideModal={isSideModal}>
        {title ? <StyledModalTitle>{title}</StyledModalTitle> : null}
        <StyledModalContent>
          {children}
        </StyledModalContent>
        {footerContent ? <StyledModalFooter>{ footerContent }</StyledModalFooter> : null}
      </StyledModalPanel>
    </StyledModal>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footerContent: PropTypes.node,
  isSideModal: PropTypes.bool,
};

Modal.defaultProps = {
  title: null,
  footerContent: null,
  isSideModal: false,
};


/*
* Styles for Modal component.
*/

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.Modal};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledModalCloseBackground = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModalPanel = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.isSideModal ? 'flex-start' : 'initial')};
  width: ${(props) => (props.isSideModal ? '18em' : '50em')};
  max-height: 65%;
  padding: ${(props) => (props.isSideModal ? '1.25em 1.5em' : '4em')};
  margin: ${(props) => (props.isSideModal ? '1em' : 'initial')};
  margin-left: ${(props) => (props.isSideModal ? 'auto' : 'initial')};
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`;

const StyledModalTitle = styled.h1`
  font-size: 1.15em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const StyledModalContent = styled.div`
  flex-grow: 1;
  margin-top: 1em;
  overflow-y: scroll;
`;

const StyledModalFooter = styled.div`
  margin-top: 1em;
`;
