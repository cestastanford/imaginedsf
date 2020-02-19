import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

import ShareButton from './ShareButton';
import {
  INTRODUCTION_ROUTE,
  BIBLIOGRAPHY_ROUTE,
  CREDITS_ROUTE,
  FEEDBACK_ROUTE,
  SHARE_ROUTE,
} from '../../constants';

import logoImg from '../../img/logo.svg';

const HEADER_LINKS = [
  { pathname: INTRODUCTION_ROUTE, content: 'Introduction' },
  { pathname: BIBLIOGRAPHY_ROUTE, content: 'Bibliography' },
  { pathname: CREDITS_ROUTE, content: 'Credits' },
  { pathname: FEEDBACK_ROUTE, content: 'Feedback' },
  { pathname: SHARE_ROUTE, content: <ShareButton /> },
];

const reset = () => {
  window.location = '/';
};

export default function Header() {
  const location = useLocation();

  return (
    <StyledHeader>
      <StyledLogoLink to={location} onClick={reset}>
        <StyledLogo src={logoImg} alt="Imagined San Francisco" />
      </StyledLogoLink>
      <NavLinks>
        {HEADER_LINKS.map(({ pathname, content }) => (
          <StyledLink key={pathname} to={{ ...location, pathname }}>
            { content }
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
  align-items: center;
  justify-content: space-between;
  padding: 0.75em;
  padding-bottom: 0.5em;
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

const StyledLogoLink = styled(StyledLink)`
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
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: lowercase;

  > a {
    margin: 0 0.75em;
  }
`;
