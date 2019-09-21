/*
* Imports.
*/

import { useRef, useEffect } from 'react';


/*
* Exposes a proxy object that represents the visible area of the Leaflet
* map and allows certain method calls on it, forwarding those actions
* to the Leaflet map to give the desired response or effect.
*/

export default function useVisibleMapArea(leafletMap, visibleMapAreaRef) {
  const visibleMapAreaProxy = useRef();

  useEffect(() => {
    const { current: map } = leafletMap;
    if (map) {
      visibleMapAreaProxy.current = {
        getBounds: map.getBounds.bind(map),
        getCenter: map.getCenter.bind(map),
        getZoom: map.getZoom.bind(map),
        fitBounds: map.fitBounds.bind(map),
        setView: map.setView.bind(map),
        hasLayer: map.hasLayer.bind(map),
        addLayer: map.addLayer.bind(map),
        removeLayer: map.removeLayer.bind(map),
        on: map.on.bind(map),
        off: map.off.bind(map),
      };
    }
  }, [leafletMap]);

  return visibleMapAreaProxy;
}
