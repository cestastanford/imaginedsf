/*
* Imports.
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import MapListItem from '../MapListItem';
import useProposalMapsInVisibleArea from './useProposalMapsInVisibleArea';
import { setOnlyShowProposalMapsInVisibleArea } from '../../state/actions';


/*
* ProposalMapsPanelViewBody component definition.
*/

export default function ProposalMapsPanelViewBody() {
  const proposalEras = useSelector((state) => state.mapContent.proposalEras);
  const onlyShowInVisibleArea = useSelector((state) => state.onlyShowProposalMapsInVisibleArea);

  //  Determines which children of proposal eras should be visible
  const proposalMapsInVisibleArea = useProposalMapsInVisibleArea();

  const dispatch = useDispatch();
  const showAllMaps = () => dispatch(setOnlyShowProposalMapsInVisibleArea(false));

  return (
    <StyledProposalMapsPanelViewBody>
      {
        proposalEras.map((era) => {
          const {
            post_title: title,
            start: startYear,
            end: endYear,
            description,
            children,
          } = era;

          const childrenInVisibleArea = onlyShowInVisibleArea
            ? era.children.filter((id) => proposalMapsInVisibleArea[id])
            : era.children;

          const nHiddenMaps = children.length - childrenInVisibleArea.length;

          return (
            <ProposalEra key={title}>
              <ProposalEraTitleAndYear>
                <ProposalEraYear>
                  <span>{ startYear }</span>
                  <span>-</span>
                  <span>{ endYear }</span>
                </ProposalEraYear>
                <ProposalEraTitle>{ title }</ProposalEraTitle>
              </ProposalEraTitleAndYear>
              <ProposalEraDescription>{ description }</ProposalEraDescription>
              <ProposalEraChildren>
                { childrenInVisibleArea.map((id) => <MapListItem key={id} id={id} showYear />) }
                { nHiddenMaps ? (
                  <li>
                    <ShowHiddenLink onClick={showAllMaps}>
                      {`Show ${nHiddenMaps} hidden map${nHiddenMaps === 1 ? '' : 's'} outside of visible area`}
                    </ShowHiddenLink>
                  </li>
                ) : null }
              </ProposalEraChildren>
            </ProposalEra>
          );
        })
      }
    </StyledProposalMapsPanelViewBody>
  );
}


/*
* Styles
*/

const StyledProposalMapsPanelViewBody = styled.ul``;

const ProposalEra = styled.li`
  &:not(:last-child) {
    padding-bottom: 0.75em;
    margin-bottom: 1.25em;
    border-bottom: 1px solid #bbb;
  }
`;

const ProposalEraTitleAndYear = styled.div`
  line-height: 1.25;
`;

const ProposalEraYear = styled.span`
  font-size: 1.25em;
  color: #888;
`;

const ProposalEraTitle = styled.span`
  margin-left: 0.25em;
  font-size: 1.1em;
  font-weight: bold;
`;

const ProposalEraDescription = styled.div`
  font-size: 0.9em;
  font-style: italic;
  line-height: 1.25;
  color: #666;
  letter-spacing: 0.05em;
`;

const ProposalEraChildren = styled.ul`
  margin-left: 1.5em;

  & > li {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const ShowHiddenLink = styled.a`
  font-size: 0.9em;
  font-style: italic;
  color: ${({ theme }) => theme.colors.brightAccent};
  transition: opacity 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.brightAccent};
    opacity: 0.85;
  }
`;
