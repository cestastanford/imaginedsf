/*
* Imports.
*/

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import PreviousLocationContext from './PreviousLocationContext';


/*
* Modal component definition.
*/

export default function Modal({
  title,
  children,
  footerContent,
  isSideModal,
}) {
  const previousLocation = useContext(PreviousLocationContext);
  const history = useHistory();

  const closeModal = () => history.push(previousLocation);

  return (
    <StyledModal>
      <StyledModalCloseBackground onClick={closeModal} />
      <StyledModalPanel isSideModal={isSideModal}>
        <StyledModalCloseLink onClick={closeModal}>×</StyledModalCloseLink>
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
  padding-top: 1.25em;
  padding-right: 1.25em;
  padding-bottom: 1.25em;
  padding-left: calc(${({ theme }) => theme.widths.panel} + 1.25em + 0.75em);
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
  margin-left: ${(props) => (props.isSideModal ? 'auto' : 'initial')};
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`;

const StyledModalCloseLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75em;
  height: 1.75em;
  font-size: 1em;
  font-weight: light;
  color: #888;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitionDurations.linkHover};

  &:hover {
    color: ${({ theme }) => theme.colors.darkerGrey};
  }
`;

const StyledModalTitle = styled.h1`
  font-size: 1.15em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  margin-top: 0.25em;
`;

const StyledModalFooter = styled.div`
  margin-top: 1em;
`;
