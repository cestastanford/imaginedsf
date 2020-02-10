/*
* Imports.
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setOnlyShowProposalMapsInVisibleArea } from '../../state/actions';
import AccentCheckbox from '../AccentCheckbox';
import MiniMap from '../MiniMap';


/*
* ProposalMapsPanelViewHeader component definition.
*/

export default function ProposalMapsPanelViewHeader() {
  const introContent = useSelector((state) => state.contentAreaContent.proposalMapsIntro);
  const checkboxValue = useSelector((state) => state.onlyShowProposalMapsInVisibleArea);
  const dispatch = useDispatch();

  const handleCheckboxUpdate = (checked) => {
    dispatch(setOnlyShowProposalMapsInVisibleArea(checked));
  };

  return (
    <StyledHeader>
      <StyledIntroContent>{introContent}</StyledIntroContent>
      <StyledCheckboxLabel isChecked={checkboxValue}>
        <StyledAccentCheckbox
          type="checkbox"
          checked={checkboxValue}
          onChange={(e) => handleCheckboxUpdate(e.target.checked)}
        />
        Only show plans affecting visible area
      </StyledCheckboxLabel>
      <StyledMiniMap>
        <MiniMap />
      </StyledMiniMap>
    </StyledHeader>
  );
}


/*
* Styles
*/

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
`;

const StyledIntroContent = styled.div`
  flex-grow: 1;
  font-size: 0.85em;
`;

const StyledCheckboxLabel = styled.label`
  z-index: 1;
  width: 40em;
  margin-bottom: 0.2em;
  margin-left: 2em;
  font-size: 0.75em;
  font-weight: ${({ isChecked }) => (isChecked ? 'bold' : 'normal')};
  line-height: 1.25;
  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.brightAccent : 'inherit')};
  text-transform: lowercase;
  user-select: none;
`;

const StyledAccentCheckbox = styled(AccentCheckbox)`
  margin-right: 0.5em;
`;

const StyledMiniMap = styled.div`
  flex-shrink: 0;
  align-self: stretch;
  margin: -1.25em -1.25em -1.25em 0;
`;
