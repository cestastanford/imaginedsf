/*
* Imports.
*/

import { useCallback } from 'react';
import { useSelector } from 'react-redux';


/*
* Custom hook that returns an object of IDs of the currently-enabled
* maps, excluding map groups and maps with a disabled ancestor.
*/

export default function useMapEnabled(includeBasemaps = true) {
  const {
    mapItems,
    proposalEras,
    permanentBasemap,
    basemaps,
  } = useSelector((state) => state.mapContent);

  const { enabled } = useSelector((state) => state.mapState);

  return useCallback(() => {
    //  Recursively iterates trees to filter out all maps that are
    //  disabled or have a disabled ancestor
    const getEnabledDescendantMapIds = (parent) => (
      [].concat(...parent.children.map((id) => {
        //  If enabled
        if (enabled[id]) {
          //  If group
          if (mapItems[id].children) {
            return getEnabledDescendantMapIds(mapItems[id]);
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
      ...[].concat(...proposalEras.map(getEnabledDescendantMapIds)),
      ...(includeBasemaps ? getEnabledDescendantMapIds({ children: basemaps }) : []),
      ...(includeBasemaps && permanentBasemap ? [permanentBasemap] : []),
    ].reduce((accum, id) => ({ ...accum, [id]: true }), {});
  }, [proposalEras, includeBasemaps, basemaps, permanentBasemap, enabled, mapItems]);
}
