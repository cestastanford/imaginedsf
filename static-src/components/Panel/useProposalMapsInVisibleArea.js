import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { polygon } from '@turf/helpers';
import intersect from '@turf/intersect';


/*
* Custom hook returning a memoized object of id/bool pairs for which
* children of proposal eras are within the visible area.
*/

export default function useProposalMapsInVisibleArea() {
  const proposalEras = useSelector((state) => state.mapContent.proposalEras);
  const mapItems = useSelector((state) => state.mapContent.mapItems);
  const visibleMapAreaBounds = useSelector((state) => state.mapState.bounds);

  return useMemo(() => {
    const visibleAreaPolygon = polygon([[
      visibleMapAreaBounds.getNorthWest(),
      visibleMapAreaBounds.getNorthEast(),
      visibleMapAreaBounds.getSouthEast(),
      visibleMapAreaBounds.getSouthWest(),
      visibleMapAreaBounds.getNorthWest(),
    ].map((latLng) => [latLng.lng, latLng.lat])]);

    const proposalChildren = [].concat(
      ...proposalEras.map((era) => [...era.children.map((id) => mapItems[id])]),
    );

    return Object.assign({}, ...proposalChildren.map((item) => {
      let itemInVisibleArea = true;
      if (item.metadata.has_bounds) {
        const itemBoundsPolygon = polygon([[0, 1, 2, 3, 0].map((index) => [
          +item.metadata.bounds[index].lng,
          +item.metadata.bounds[index].lat,
        ])]);

        if (!intersect(visibleAreaPolygon, itemBoundsPolygon)) {
          itemInVisibleArea = false;
        }
      }

      return { [item.ID]: itemInVisibleArea };
    }));
  }, [mapItems, proposalEras, visibleMapAreaBounds]);
}
