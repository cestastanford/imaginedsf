import styled from 'styled-components';

const StyledModalPanel = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 50em;
  max-height: 65%;
  padding: 4em;
  margin-left: calc(${({ theme }) => theme.widths.panel} + 0.75em);
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
`;

export default StyledModalPanel;
