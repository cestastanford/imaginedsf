import React from 'react';
import styled from 'styled-components';

import logoImg from '../img/logo.svg';

import { StyledLink } from './reusable-components';

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <StyledLogo src={logoImg} alt="Imagined San Francisco" />
      </StyledLink>
      <NavLinks>
        <StyledLink to="/bibliography">Bibliography</StyledLink>
        <StyledLink to="/credits">Credits</StyledLink>
        <StyledLink to="/feedback">Feedback</StyledLink>
      </NavLinks>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.Header};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0.75em 0.75em 0.5em 0.75em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledLogo = styled.img`
  height: 3em;
`;

const NavLinks = styled.div`
  margin-bottom: 0.7em;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: lowercase;

  ${StyledLink} {
    margin: 0 1em;
  }
`;
