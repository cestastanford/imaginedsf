/*
* Imports
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/*
* Defines the HTMLContent component, which renders passed HTML content
* from WordPress.
*/

export default function HTMLContent({ content, className, children }) {
  return (
    <StyledHTMLContent className={className}>
      { children }
      <div dangerouslySetInnerHTML={{ __html: content }} /> {/* eslint-disable-line */}
    </StyledHTMLContent>
  );
}

HTMLContent.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

HTMLContent.defaultProps = {
  content: '',
  className: '',
  children: null,
};

const StyledHTMLContent = styled.div`
  font-size: 0.85em;
  line-height: 1.65;

  h1 {
    font-size: 2em;
    font-weight: bolder;
  }

  h2 {
    font-size: 1.5em;
    font-weight: bolder;
    color: ${({ theme }) => theme.colors.lightBlack};
  }

  h3 {
    font-size: 1.25em;
    font-weight: lighter;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  h4 {
    font-size: 1em;
    font-weight: bolder;
  }

  h5 {
    font-size: 0.9em;
    font-weight: bolder;
  }

  h6 {
    font-size: 0.8em;
    font-weight: bolder;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.25em 0 0.25em 0;
    line-height: inherit;

    &:first-child {
      margin-top: 0.25em;
    }
  }

  p {
    margin: 0.5em 0 0.5em 0;
    font-size: 1em;
    font-weight: lighter;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 1em 0;
  }

  strong {
    font-weight: bold;
  }
`;
