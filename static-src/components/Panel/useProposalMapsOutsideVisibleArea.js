import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { polygon } from '@turf/helpers';
import intersect from '@turf/intersect';
import useGetDescendantMaps from '../useGetDescendantMaps';


/*
* Custom hook returning a memoized object of id/bool pairs for which
* descendent maps of proposal eras are outside the visible area.
*/

export default function useProposalMapsOutsideVisibleArea() {
  const proposalEras = useSelector((state) => state.mapContent.proposalEras);
  const visibleMapAreaBounds = useSelector((state) => state.mapState.bounds);
  const getDescendantMaps = useGetDescendantMaps();

  return useMemo(() => {
    const visibleAreaPolygon = polygon([[
      visibleMapAreaBounds.getNorthWest(),
      visibleMapAreaBounds.getNorthEast(),
      visibleMapAreaBounds.getSouthEast(),
      visibleMapAreaBounds.getSouthWest(),
      visibleMapAreaBounds.getNorthWest(),
    ].map((latLng) => [latLng.lng, latLng.lat])]);

    const proposalMaps = [].concat(...proposalEras.map(getDescendantMaps));
    const proposalMapsOutsideVisibleArea = Object.assign({}, ...proposalMaps.map((item) => {
      let itemOutsideVisibleArea = false;
      if (item.bounds) {
        const itemBoundsPolygon = polygon([[0, 1, 2, 3, 0].map((index) => [
          item.bounds[index].lng,
          item.bounds[index].lat,
        ])]);

        if (!intersect(visibleAreaPolygon, itemBoundsPolygon)) {
          itemOutsideVisibleArea = true;
        }
      }

      return { [item.ID]: itemOutsideVisibleArea };
    }));

    return proposalMapsOutsideVisibleArea;
  }, [getDescendantMaps, proposalEras, visibleMapAreaBounds]);
}
