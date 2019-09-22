import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import logoImg from '../img/logo.svg';

const Header = ({ location }) => (
  <StyledHeader>
    <StyledLink to="/">
      <StyledLogo src={logoImg} alt="Imagined San Francisco" />
    </StyledLink>
    <NavLinks>
      { [
        { pathname: '/bibliography', title: 'Bibliography' },
        { pathname: '/credits', title: 'Credits' },
        { pathname: '/feedback', title: 'Feedback' },
      ].map(({ pathname, title }) => (
        <StyledLink
          key={pathname}
          to={{ pathname, hash: location.hash }}
        >
          { title }
        </StyledLink>
      )) }
    </NavLinks>
  </StyledHeader>
);

Header.propTypes = {
  location: PropTypes.shape({ hash: PropTypes.string.isRequired }).isRequired,
};

export default withRouter(Header);

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

const NavLinks = styled.div`
  margin-bottom: 0.7em;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-transform: lowercase;

  ${StyledLink} {
    margin: 0 1em;
  }
`;
