import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.35em 0.85em;
  font: inherit;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #bbb;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 4px inset rgba(0, 0, 0, 0.25);
  transition: background-color 0.15s, opacity 0.15s;

  &:disabled {
    cursor: not-allowed;
    background-color: #ccc;
    opacity: 0.8;
  }

  &:not(:disabled):hover {
    color: #fff;
    background-color: #aaa;
  }

  &:not(:disabled):active {
    background-color: #999;
    transition: none;
  }
`;

export default StyledButton;
