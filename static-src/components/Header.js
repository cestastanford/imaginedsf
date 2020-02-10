import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

import logoImg from '../img/logo.svg';
import shareImg from '../img/share.svg';


const StyledShareIcon = styled.img`
  position: relative;
  top: -0.15em;
  height: 1.75em;
`;

const HEADER_LINKS = [
  { pathname: '/introduction', content: 'Introduction' },
  { pathname: '/bibliography', content: 'Bibliography' },
  { pathname: '/credits', content: 'Credits' },
  { pathname: '/feedback', content: 'Feedback' },
  { pathname: '/share', content: <StyledShareIcon src={shareImg} alt="share" /> },
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
