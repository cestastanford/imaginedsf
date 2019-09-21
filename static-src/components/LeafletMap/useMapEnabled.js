/*
* Imports.
*/

import { useCallback } from 'react';
import { useSelector } from 'react-redux';


/*
* Custom hook that returns an object of IDs of the currently-enabled
* maps, excluding map groups and maps with a disabled ancestor.
*/

export default function useMapEnabled() {
  const {
    mapsAndGroups,
    proposalRanges,
    basemaps,
  } = useSelector((state) => state.mapContent);

  const {
    enabled,
  } = useSelector((state) => state.mapState);

  return useCallback(() => {
    //  Recursively iterates trees to filter out all maps that are
    //  disabled or have a disabled ancestor
    const getEnabledDescendantMapIds = (parent) => (
      [].concat(...parent.children.map((id) => {
        //  If enabled
        if (enabled[id]) {
          //  If group
          if (mapsAndGroups[id].children) {
            return getEnabledDescendantMapIds(mapsAndGroups[id]);
          }

          //  If not group
          return [id];
        }

        //  If not enabled
        return [];
      }))
    );

    //  Creates object of IDs.
    return [
      ...[].concat(...proposalRanges.map(getEnabledDescendantMapIds)),
      ...getEnabledDescendantMapIds({ children: basemaps }),
    ].reduce((accum, id) => ({ ...accum, [id]: true }), {});
  }, [enabled, mapsAndGroups, proposalRanges, basemaps]);
}
