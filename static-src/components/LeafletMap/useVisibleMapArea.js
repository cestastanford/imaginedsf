/*
* Imports.
*/

import { useRef, useEffect } from 'react';
import { LatLngBounds } from 'leaflet';


/*
* Class definition.
*/

class VisibleMapAreaProxy {
  constructor(map, visibleMapAreaElement) {
    this.map = map;
    this.areaElement = visibleMapAreaElement;
  }

  getBounds() {
    const {
      left: containerX,
      top: containerY,
    } = this.map.getContainer().getBoundingClientRect();

    const {
      left: areaX,
      top: areaY,
      width: areaWidth,
      height: areaHeight,
    } = this.areaElement.getBoundingClientRect();

    //  Get bounds of visible area in pixels relative to map container
    const areaUpperLeftContainerPoint = [areaX - containerX, areaY - containerY];
    const areaLowerRightContainerPoint = [
      areaUpperLeftContainerPoint[0] + areaWidth,
      areaUpperLeftContainerPoint[1] + areaHeight,
    ];

    //  Convert to LatLngBounds
    return new LatLngBounds([
      this.map.containerPointToLatLng(areaUpperLeftContainerPoint),
      this.map.containerPointToLatLng(areaLowerRightContainerPoint),
    ]);
  }

  getAreaCenterContainerPoint() {
    const {
      left: containerX,
      top: containerY,
    } = this.map.getContainer().getBoundingClientRect();

    const {
      left: areaX,
      top: areaY,
      width: areaWidth,
      height: areaHeight,
    } = this.areaElement.getBoundingClientRect();

    //  Get center point of visible area in pixels relative to map
    //  container
    return [
      areaX + (areaWidth / 2) - containerX,
      areaY + (areaHeight / 2) - containerY,
    ];
  }

  getCenter() {
    //  Convert center point of visible area from pixels relative
    //  to map container to LatLng
    const areaCenterContainerPoint = this.getAreaCenterContainerPoint();
    return this.map.containerPointToLatLng(areaCenterContainerPoint);
  }

  getZoom(...args) { return this.map.getZoom(...args); }

  fitBounds(bounds) {
    const {
      left: containerX,
      top: containerY,
      width: containerWidth,
      height: containerHeight,
    } = this.map.getContainer().getBoundingClientRect();

    const {
      left: areaX,
      top: areaY,
      width: areaWidth,
      height: areaHeight,
    } = this.areaElement.getBoundingClientRect();

    //  Get top-left and bottom-right coordinates of visible area
    const areaUpperLeftContainerPoint = [areaX - containerX, areaY - containerY];
    const areaLowerRightContainerPoint = [
      areaUpperLeftContainerPoint[0] + areaWidth,
      areaUpperLeftContainerPoint[1] + areaHeight,
    ];

    //  Convert to padding values that Leaflet should fit bounds
    //  inside of, in pixels relative to map container
    return this.map.fitBounds(
      bounds,
      {
        paddingTopLeft: areaUpperLeftContainerPoint,
        paddingBottomRight: [
          containerWidth - areaLowerRightContainerPoint[0],
          containerHeight - areaLowerRightContainerPoint[1],
        ],
      },
    );
  }

  setView(newAreaCenterLatLng, newZoomLevel) {
    const {
      width: containerWidth,
      height: containerHeight,
    } = this.map.getContainer().getBoundingClientRect();

    //  newAreaCenterLatLng is the LatLng that will be at the center
    //  of the visible map area; convert to pixels relative to the
    //  map container
    const newAreaCenterContainerPoint = this.map.latLngToContainerPoint(newAreaCenterLatLng);

    //  Find point that will be at the center of the map container
    const areaCenterContainerPoint = this.getAreaCenterContainerPoint();
    const newMapContainerPoint = [
      newAreaCenterContainerPoint.x - areaCenterContainerPoint[0],
      newAreaCenterContainerPoint.y - areaCenterContainerPoint[1],
    ];

    const newMapCenterContainerPoint = [
      newMapContainerPoint[0] + containerWidth / 2,
      newMapContainerPoint[1] + containerHeight / 2,
    ];

    //  Convert back to LatLng
    const newMapCenterLatLng = this.map.containerPointToLatLng(newMapCenterContainerPoint);
    return this.map.setView(newMapCenterLatLng, newZoomLevel);
  }

  hasLayer(...args) { return this.map.hasLayer(...args); }

  addLayer(...args) { return this.map.addLayer(...args); }

  removeLayer(...args) { return this.map.removeLayer(...args); }

  on(...args) { return this.map.on(...args); }

  off(...args) { return this.map.off(...args); }
}


/*
* Exposes a proxy object that represents the visible area of the Leaflet
* map and allows certain method calls on it, forwarding those actions
* to the Leaflet map to give the desired response or effect.
*/

export default function useVisibleMapArea(leafletMap, visibleMapAreaRef) {
  const visibleMapAreaProxy = useRef();

  useEffect(() => {
    const { current: map } = leafletMap;
    const { current: visibleMapAreaElement } = visibleMapAreaRef;

    if (map && visibleMapAreaElement) {
      visibleMapAreaProxy.current = new VisibleMapAreaProxy(
        map,
        visibleMapAreaElement,
      );
    } else {
      visibleMapAreaProxy.current = null;
    }
  }, [leafletMap, visibleMapAreaRef]);

  return visibleMapAreaProxy;
}
