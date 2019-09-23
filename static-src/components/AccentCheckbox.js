/*
* Imports
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


/*
* A checkbox whose background is the accent color.
*/

export default function AccentCheckbox({ checked, onChange, className }) {
  return (
    <StyledAccentCheckbox isChecked={checked} className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      /> {/* eslint-disable-line */}
    </StyledAccentCheckbox>
  );
}

AccentCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

AccentCheckbox.defaultProps = {
  className: '',
};

const StyledAccentCheckbox = styled.span`
  position: relative;
  top: 2px;
  left: -1px;
  display: inline-block;
  width: 11px;
  height: 11px;
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
  line-height: 1.25;
  user-select: none;

  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0.01;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
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
    top: -2px;
    right: 0;
    bottom: 0;
    left: 0.5px;
    display: block;
    font-size: 12px;
    color: white;
    content: '${({ isChecked }) => (isChecked ? '✓' : '')}';
  }
`;
