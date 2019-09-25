/*
* Imports.
*/

import { useRef, useEffect } from 'react';
import { LatLngBounds, Point } from 'leaflet';


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
    const areaTopLeftContainerPoint = new Point(areaX - containerX, areaY - containerY);
    const areaBottomRightContainerPoint = new Point(
      areaTopLeftContainerPoint.x + areaWidth,
      areaTopLeftContainerPoint.y + areaHeight,
    );

    //  Convert to LatLngBounds
    return new LatLngBounds(
      this.map.containerPointToLatLng(areaTopLeftContainerPoint),
      this.map.containerPointToLatLng(areaBottomRightContainerPoint),
    );
  }

  getBoundsZoom(bounds) {
    const {
      width: containerWidth,
      height: containerHeight,
    } = this.map.getContainer().getBoundingClientRect();

    const {
      width: areaWidth,
      height: areaHeight,
    } = this.areaElement.getBoundingClientRect();

    //  Get a padding value based on the difference in size between
    //  the visible map area and the map container
    const padding = new Point(containerWidth - areaWidth, containerHeight - areaHeight);
    return this.map.getBoundsZoom(bounds, false, padding);
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
    return new Point(
      areaX + (areaWidth / 2) - containerX,
      areaY + (areaHeight / 2) - containerY,
    );
  }

  getCenter() {
    //  Convert center point of visible area from pixels relative
    //  to map container to LatLng
    const areaCenterContainerPoint = this.getAreaCenterContainerPoint();
    return this.map.containerPointToLatLng(areaCenterContainerPoint);
  }

  getZoom(...args) { console.log(this.map.getZoom()); return this.map.getZoom(...args); }

  setZoom(newZoom) {
    //  Zoom to specified level around the center of the visible
    //  area.
    this.map.setZoomAround(this.getAreaCenterContainerPoint(), newZoom, { animate: true });
  }

  fitBounds(areaBounds) {
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
    const areaTopLeftContainerPoint = new Point(areaX - containerX, areaY - containerY);
    const areaBottomRightContainerPoint = new Point(
      areaTopLeftContainerPoint.x + areaWidth,
      areaTopLeftContainerPoint.y + areaHeight,
    );

    //  Convert to padding values that Leaflet should fit bounds
    //  inside of, in pixels relative to map container
    return this.map.fitBounds(
      areaBounds,
      {
        paddingTopLeft: areaTopLeftContainerPoint,
        paddingBottomRight: new Point(
          containerWidth - areaBottomRightContainerPoint.x,
          containerHeight - areaBottomRightContainerPoint.y,
        ),
      },
    );
  }

  hasLayer(...args) { return this.map.hasLayer(...args); }

  addLayer(...args) { return this.map.addLayer(...args); }

  removeLayer(...args) { return this.map.removeLayer(...args); }

  on(...args) { return this.map.on(...args); }

  once(...args) { return this.map.once(...args); }

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
