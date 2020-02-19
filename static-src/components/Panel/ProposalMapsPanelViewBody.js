/*
* Imports.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import MapListItem from '../MapListItem';
import useProposalMapsInVisibleArea from './useProposalMapsInVisibleArea';


/*
* ProposalMapsPanelViewBody component definition.
*/

export default function ProposalMapsPanelViewBody() {
  const proposalEras = useSelector((state) => state.mapContent.proposalEras);
  const onlyShowInVisibleArea = useSelector((state) => state.onlyShowProposalMapsInVisibleArea);

  //  Determines which children of proposal eras should be visible
  const proposalMapsInVisibleArea = useProposalMapsInVisibleArea();

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
                { childrenInVisibleArea.length === children.length ? null : (
                  <ShowingMessage>
                    <span>Showing </span>
                    <span>{ childrenInVisibleArea.length }</span>
                    <span> of </span>
                    <span>{ children.length }</span>
                    <span> plans</span>
                  </ShowingMessage>
                ) }
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
  letter-spacing: -0.05em;
`;

const ProposalEraChildren = styled.ul`
  margin-top: 0.75em;
  margin-left: 1.5em;

  & > li {
    margin: 0.2em 0;
  }
`;

const ShowingMessage = styled.li`
  font-style: italic;
  color: #888;
`;
