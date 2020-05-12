/*
* Imports.
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setOnlyShowProposalMapsInVisibleArea } from '../../state/actions';
import AccentCheckbox from '../AccentCheckbox';


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
        Only show maps affecting visible area
      </StyledCheckboxLabel>
    </StyledHeader>
  );
}


/*
* Styles
*/

const StyledHeader = styled.div`
  padding: 1.25em;
`;

const StyledIntroContent = styled.div`
  flex-grow: 1;
  max-width: 22em;
  font-size: 0.85em;
`;

const StyledCheckboxLabel = styled.label`
  display: block;
  margin-top: 1em;
  font-size: 0.85em;
  line-height: 1.25;
  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.brightAccent : 'inherit')};
  text-transform: lowercase;
  user-select: none;
`;

const StyledAccentCheckbox = styled(AccentCheckbox)`
  margin-right: 0.5em;
`;
