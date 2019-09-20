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

export default function HTMLContent({ content, className }) {
  return (
    <StyledHTMLContent
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

HTMLContent.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

HTMLContent.defaultProps = {
  content: '',
  className: '',
};

const StyledHTMLContent = styled.div`
  font-size: 0.9em;
  line-height: 1.4;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.25em 0 0.25em 0;
    line-height: inherit;
  }

  h1 {
    font-size: 2em;
    font-weight: bolder;
  }

  h2 {
    font-size: 1.5em;
    font-weight: bolder;
    color: ${({ theme }) => theme.colors.darkGrey};
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

  p {
    margin: 0.5em 0 0.5em 0;
    font-size: 1em;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 1em 0;
  }
`;
