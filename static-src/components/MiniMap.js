/*
* Imports
*/

import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CRS, Transformation, Point } from 'leaflet';

import { SF_OUTLINE_BOUNDS } from '../constants';
import sfOutline from '../img/sf-outline.png';


/*
* Renders a tiny map of San Francisco with a rectangle over the part
* of the map that's currently in the visible area.  The rectangle
* is red if only showing maps in visible area in proposal list.
*/

export default function MiniMap() {
  const imgRef = useRef();
  const rectangleAccent = useSelector((state) => state.onlyShowProposalMapsInVisibleArea);
  const visibleBounds = useSelector((state) => state.mapState.bounds);
  const [rectangleBounds, setRectangleBounds] = useState();

  useEffect(() => {
    //  Get image bounds as lat/lng coordinates projected to planar values
    const imageBoundsCoordinatesTopLeft = CRS.EPSG3857.project(SF_OUTLINE_BOUNDS.getNorthWest());
    const imageBoundsCoordinatesBottomRight = CRS.EPSG3857.project(
      SF_OUTLINE_BOUNDS.getSouthEast(),
    );

    //  Get image bounds as pixel values
    const {
      left: x1,
      top: y1,
      right: x2,
      bottom: y2,
    } = imgRef.current.getBoundingClientRect();

    const imageBoundsPixelsTopLeft = new Point(x1, y1);
    const imageBoundsPixelsBottomRight = new Point(x2, y2);

    //  Get transformation from projected lat/lng coordinate system
    //  to pixel coordinate system.  Given two rectangles A and B
    //  with upper left/lower right coordinates [[xA1, yA1], [xA2, yA2]]
    //  and [[xB1, yB1], [xB2, yB2]] respectively, transformation
    //  from A to B is...
    //  [xB, yB] = [
    //    xA * (xB2 - xB1) / (xA2 - xA1) + xB1 - xA1 * (xB2 - xB1) / (xA2 - xA1),
    //    yA * (yB2 - yB1) / (yA2 - yA1) + yB1 - yA1 * (yB2 - yB1) / (yA2 - yA1),
    //  ]
    const [
      { x: xA1, y: yA1 },
      { x: xA2, y: yA2 },
    ] = [imageBoundsCoordinatesTopLeft, imageBoundsCoordinatesBottomRight];

    const [
      { x: xB1, y: yB1 },
      { x: xB2, y: yB2 },
    ] = [imageBoundsPixelsTopLeft, imageBoundsPixelsBottomRight];

    const transformation = new Transformation(
      (xB2 - xB1) / (xA2 - xA1),
      xB1 - xA1 * ((xB2 - xB1) / (xA2 - xA1)),
      (yB2 - yB1) / (yA2 - yA1),
      yB1 - yA1 * ((yB2 - yB1) / (yA2 - yA1)),
    );

    //  Get visible map area bounds as lat/lng coordinates projected
    //  to planar values
    const visibleBoundsCoordinatesTopLeft = CRS.EPSG3857.project(visibleBounds.getNorthWest());
    const visibleBoundsCoordinatesBottomRight = CRS.EPSG3857.project(visibleBounds.getSouthEast());

    //  Run transformation on projected visible map area coordinates
    //  to get pixel coordinates for where the rectangle should be.
    const visibleBoundsPixelsTopLeft = transformation.transform(
      visibleBoundsCoordinatesTopLeft,
    );

    const visibleBoundsPixelsBottomRight = transformation.transform(
      visibleBoundsCoordinatesBottomRight,
    );

    //  Get CSS position values relative to the image pixel bounds
    const rectangleLeft = visibleBoundsPixelsTopLeft.x - imageBoundsPixelsTopLeft.x;
    const rectangleTop = visibleBoundsPixelsTopLeft.y - imageBoundsPixelsTopLeft.y;
    const rectangleRight = imageBoundsPixelsBottomRight.x - visibleBoundsPixelsBottomRight.x;
    const rectangleBottom = imageBoundsPixelsBottomRight.y - visibleBoundsPixelsBottomRight.y;
    setRectangleBounds({
      left: rectangleLeft,
      top: rectangleTop,
      right: rectangleRight,
      bottom: rectangleBottom,
    });
  }, [visibleBounds]);

  return (
    <StyledMiniMap>
      <StyledImgContainer>
        <StyledImg src={sfOutline} ref={imgRef} />
        { rectangleBounds ? (
          <StyledRectangle
            rectangleAccent={rectangleAccent}
            rectangleLeft={rectangleBounds.left}
            rectangleTop={rectangleBounds.top}
            rectangleRight={rectangleBounds.right}
            rectangleBottom={rectangleBounds.bottom}
          />
        ) : null }
      </StyledImgContainer>
    </StyledMiniMap>
  );
}


/*
* Styles
*/

const StyledMiniMap = styled.div`
  position: relative;
  width: 175px;
  height: 160px;
  overflow: hidden;
`;

const StyledImgContainer = styled.div`
  position: absolute;
  top: 0;
  left: -15px; /* Based on aspect ratio of specific image */
  width: 237px; /* Based on aspect ratio of specific image */
  height: 200px; /* Based on aspect ratio of specific image */
`;

const StyledImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const StyledRectangle = styled.div`
  position: absolute;
  top: ${({ rectangleTop }) => rectangleTop}px;
  right: ${({ rectangleRight }) => rectangleRight}px;
  bottom: ${({ rectangleBottom }) => rectangleBottom}px;
  left: ${({ rectangleLeft }) => rectangleLeft}px;
  background-color: ${({ rectangleAccent, theme }) => (rectangleAccent ? theme.colors.brightAccent25 : theme.colors.miniMapGrey)};
`;
