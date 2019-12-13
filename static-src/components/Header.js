import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

import logoImg from '../img/logo.svg';

const HEADER_LINKS = [
  { pathname: '/introduction', title: 'Introduction' },
  { pathname: '/bibliography', title: 'Bibliography' },
  { pathname: '/credits', title: 'Credits' },
  { pathname: '/feedback', title: 'Feedback' },
];

export default function Header() {
  const location = useLocation();

  return (
    <StyledHeader>
      <StyledHeaderLink to={{ pathname: '', hash: '' }}>
        <StyledLogo src={logoImg} alt="Imagined San Francisco" />
      </StyledHeaderLink>
      <NavLinks>
        {HEADER_LINKS.map(({ pathname, title }) => (
          <StyledLink key={pathname} to={{ ...location, pathname }}>
            { title }
          </StyledLink>
        )) }
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

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.transitionDurations.linkHover};

  &:hover {
    opacity: ${({ theme }) => theme.opacities.linkHover};
  }
`;

const StyledHeaderLink = styled(StyledLink)`
  display: flex;
  align-items: center;

  &::after {
    margin-left: 1em;
    color: #aaa;
    content: 'click to reset';
    opacity: 0;
    transition: opacity 0.25s;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const NavLinks = styled.div`
  margin-bottom: 0.7em;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: lowercase;

  ${StyledLink} {
    margin: 0 1em;
  }
`;
