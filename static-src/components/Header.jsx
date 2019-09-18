import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import logoImg from '../img/logo.svg';

export default function Header() {
  return (
    <StyledHeader>
      <StyledLogo src={logoImg} alt="Imagined San Francisco" />
      <StyledLinks>
        <StyledLink to="/bibliography">Bibliography</StyledLink>
        <StyledLink to="/credits">Credits</StyledLink>
        <StyledLink to="/feedback">Feedback</StyledLink>
      </StyledLinks>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 3em;
`;

const StyledLogo = styled.img``;

const StyledLinks = styled.div``;

const StyledLink = styled(Link)`
  margin: 1em;
  font-weight: lighter;
`;
