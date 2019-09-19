import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import logoImg from '../img/logo.svg';

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
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1em 1em 0.5em 1em;
  box-shadow: 0 0 10px #ddd;
`;

const StyledLogo = styled.img`
  height: 4em;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.transitionDurations.linkHover};

  &:hover {
    opacity: ${({ theme }) => theme.opacities.linkHover};
  }
`;

const NavLinks = styled.div`
  margin-bottom: 0.85em;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: lowercase;

  ${StyledLink} {
    margin: 0 1em;
  }
`;
