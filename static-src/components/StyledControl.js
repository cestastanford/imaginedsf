import styled from 'styled-components';

const StyledControl = styled.div`
  padding: 0.25em;
  margin-bottom: 0.75em;
  pointer-events: all;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: ${({ theme }) => theme.shadows.Control};
`;

export default StyledControl;
