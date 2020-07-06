import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function useGetDescendantMaps() {
  const mapItems = useSelector((state) => state.mapContent.mapItems);

  //  Returns a flattened array of all descendant maps
  const getDescendantMaps = useCallback((parent) => [].concat(...parent.children.map((id) => {
    //  If group
    if (mapItems[id].children) {
      return getDescendantMaps(mapItems[id]);
    }

    //  If not group
    return [mapItems[id]];
  })), [mapItems]);

  return getDescendantMaps;
}
