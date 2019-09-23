/*
* Imports
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/*
* A checkbox whose background is the accent color.
*/

export default function AccentCheckbox(props) {
  const { checked: isChecked, className } = props;
  return (
    <StyledAccentCheckbox isChecked={isChecked} className={className}>
      <input type="checkbox" {...props} /> {/* eslint-disable-line */}
    </StyledAccentCheckbox>
  );
}

AccentCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

AccentCheckbox.defaultProps = {
  className: '',
};

const StyledAccentCheckbox = styled.span`
  position: relative;
  top: 2px;
  display: inline-block;
  user-select: none;

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.01;
  }

  &::before {
    display: inline-block;
    width: 11px;
    height: 11px;
    padding-left: 1px;
    content: '';
    background-color: ${({ isChecked, theme }) => (isChecked ? theme.colors.brightAccent : '#fff')};
    border-radius: 2px;
    box-shadow:
      0 1px 1px ${({ isChecked }) => (isChecked ? 'transparent' : 'rgba(0, 0, 0, 0.25)')} inset,
      0 0 0 0.5px ${({ isChecked, theme }) => (isChecked ? theme.colors.brightAccent : 'rgba(0, 0, 0, 0.25)')};
  }

  &:active::before {
    background-color: ${({ isChecked, theme }) => (isChecked ? theme.colors.darkAccent : '#eee')};
  }

  &::after {
    position: absolute;
    top: -0.5px;
    left: 0.5px;
    font-size: 12px;
    color: white;
    content: '${({ isChecked }) => (isChecked ? '✓' : '')}';
  }
`;
