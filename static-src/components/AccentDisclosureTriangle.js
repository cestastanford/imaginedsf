/*
* Imports
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/*
* A disclosure triangle that's the accent color when expanded.
*/

export default function AccentDisclosureTriangle({ expanded, onChange, className }) {
  return (
    <StyledAccentDisclosureTriangle isExpanded={expanded} className={className}>
      <input
        type="checkbox"
        checked={expanded}
        onChange={onChange}
      /> {/* eslint-disable-line */}
    </StyledAccentDisclosureTriangle>
  );
}

AccentDisclosureTriangle.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

AccentDisclosureTriangle.defaultProps = {
  className: '',
};

const StyledAccentDisclosureTriangle = styled.span`
  position: relative;
  top: 2px;
  display: inline-block;
  width: 11px;
  height: 11px;
  user-select: none;

  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0.01;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-right: 2px;
    padding-bottom: 2px;
    color: ${({ isExpanded, theme }) => (isExpanded ? theme.colors.brightAccent : '#444')};
    content: '▸';
    transition: transform 0.15s;
    transform: ${({ isExpanded }) => (isExpanded ? 'rotate(90deg)' : 'rotate(0deg)')};
  }

  &:active::before {
    color: ${({ isExpanded, theme }) => (isExpanded ? theme.colors.darkAccent : '#000')};
  }
`;
