/*
* Imports.
*/

import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledLink } from './reusable-components';


/*
* Modal component definition.
*/

export default function Modal({ title, content }) {
  return (
    <StyledModal>
      <StyledModalBackgroundCloseLink to="/" />
      <StyledModalPanel>
        <StyledModalCloseLink to="/">×</StyledModalCloseLink>
        { title ? <StyledModalTitle>{title}</StyledModalTitle> : null }
        { content }
      </StyledModalPanel>
    </StyledModal>
  );
}

Modal.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: '',
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

const StyledModalBackgroundCloseLink = styled(Link)`
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
  width: 40em;
  max-height: 65%;
  padding: 3.5em 7em;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`;

const StyledModalCloseLink = styled(StyledLink)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5em;
  height: 1.5em;
  font-size: 1.5em;
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const StyledModalTitle = styled.h1`
  font-size: 1.25em;
  font-weight: lighter;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: uppercase;
`;
