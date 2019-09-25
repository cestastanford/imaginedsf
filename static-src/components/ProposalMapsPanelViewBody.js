/*
* Imports.
*/

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LatLngBounds } from 'leaflet';
import { polygon } from '@turf/helpers';
import intersect from '@turf/intersect';

import MapListItem from './MapListItem';


/*
* Custom hook returning a memoized object of id/bool pairs for which
* children of proposal eras are within the visible area.
*/

const useProposalMapsInVisibleArea = () => {
  const proposalEras = useSelector((state) => state.mapContent.proposalEras);
  const mapItems = useSelector((state) => state.mapContent.mapItems);
  const visibleMapAreaBounds = useSelector((state) => state.mapState.bounds);

  return useMemo(() => {
    const visibleMapAreaLatLngBounds = new LatLngBounds(visibleMapAreaBounds);
    const visibleAreaPolygon = polygon([[
      visibleMapAreaLatLngBounds.getNorthWest(),
      visibleMapAreaLatLngBounds.getNorthEast(),
      visibleMapAreaLatLngBounds.getSouthEast(),
      visibleMapAreaLatLngBounds.getSouthWest(),
      visibleMapAreaLatLngBounds.getNorthWest(),
    ].map((latLng) => [latLng.lng, latLng.lat])]);

    const proposalChildren = [].concat(
      ...proposalEras.map((era) => [...era.children.map((id) => mapItems[id])]),
    );

    return Object.assign({}, ...proposalChildren.map((item) => {
      let itemInVisibleArea = false;
      if (item.metadata.has_bounds) {
        const itemBoundsPolygon = polygon([[0, 1, 2, 3, 0].map((index) => [
          +item.metadata.bounds[index].lng,
          +item.metadata.bounds[index].lat,
        ])]);

        if (intersect(visibleAreaPolygon, itemBoundsPolygon)) {
          itemInVisibleArea = true;
        }
      }

      return { [item.ID]: itemInVisibleArea };
    }));
  }, [mapItems, proposalEras, visibleMapAreaBounds]);
};


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
          const childrenInVisibleArea = onlyShowInVisibleArea
            ? era.children.filter((id) => proposalMapsInVisibleArea[id])
            : era.children;
          return (
            <ProposalEra key={era.title}>
              <ProposalEraTitleAndYear>
                <ProposalEraYear>
                  <span>{ era.years.start }</span>
                  <span>-</span>
                  <span>{ era.years.end }</span>
                </ProposalEraYear>
                <ProposalEraTitle>{ era.title }</ProposalEraTitle>
              </ProposalEraTitleAndYear>
              <ProposalEraDescription>{ era.description }</ProposalEraDescription>
              <ProposalEraChildren>
                { childrenInVisibleArea.map((id) => <MapListItem key={id} id={id} showYear />) }
                { childrenInVisibleArea.length === era.children.length ? null : (
                  <ShowingMessage>
                    <span>Showing </span>
                    <span>{ childrenInVisibleArea.length }</span>
                    <span> of </span>
                    <span>{ era.children.length }</span>
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
    padding-bottom: 1.25em;
    margin-bottom: 1.25em;
    border-bottom: 1px solid #bbb;
  }
`;

const ProposalEraTitleAndYear = styled.div`
  margin-bottom: 0.25em;
  line-height: 1.25;
`;

const ProposalEraYear = styled.span`
  font-size: 1.5em;
  color: #888;
`;

const ProposalEraTitle = styled.span`
  margin-left: 0.25em;
  font-size: 1.25em;
  font-weight: bold;
`;

const ProposalEraDescription = styled.div`
  font-style: italic;
  color: #666;
`;

const ProposalEraChildren = styled.ul`
  margin-top: 0.5em;

  & > li {
    margin: 0.5em 0;
  }
`;

const ShowingMessage = styled.li`
  font-style: italic;
  color: #888;
`;
