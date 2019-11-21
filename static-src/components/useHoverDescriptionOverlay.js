import React, { useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import HTMLContent from './HTMLContent';


/*
* Custom hook that handles listening for hovers and determining whether
* the overlay should be visible or not.
*/

const HOVER_SHOW_DELAY = 1000;
const HOVER_HIDE_DELAY = 500;
export default function useHoverDescriptionOverlay(id) {
  const [showOverlayAt, setShowOverlayAt] = useState(null);
  const listItemRef = useRef();
  const hoverTimeoutId = useRef(null);
  const {
    post_title: title,
    metadata: {
      description,
      recommended_basemap: recommendedBasemapId,
    },
  } = useSelector((state) => state.mapContent.mapItems[id]);

  const recommendedBasemap = useSelector(
    (state) => (recommendedBasemapId ? state.mapContent.mapItems[recommendedBasemapId] : null),
  );

  //  Determines where the overlay should be positioned.
  const getOverlayPosition = () => {
    const {
      left: listItemLeft,
      top: listItemTop,
      right: listItemRight,
      bottom: listItemBottom,
    } = listItemRef.current.getBoundingClientRect();

    //  Determine which quadrant of the screen it's closest to.
    const listItemOnLeftHalf = (listItemLeft + listItemRight) / 2 < window.innerWidth / 2;
    const listItemOnTopHalf = (listItemTop + listItemBottom) / 2 < window.innerHeight / 2;

    //  Set overlay position accordingly
    return {
      left: listItemOnLeftHalf ? listItemRight : null,
      top: listItemOnTopHalf ? listItemTop : null,
      right: listItemOnLeftHalf ? null : window.innerWidth - listItemLeft,
      bottom: listItemOnTopHalf ? null : window.innerHeight - listItemBottom,
    };
  };

  //  On mouseenter, show the overlay after 1 second.
  const onMouseEnter = () => {
    clearTimeout(hoverTimeoutId.current);
    hoverTimeoutId.current = setTimeout(() => {
      setShowOverlayAt(getOverlayPosition());
    }, HOVER_SHOW_DELAY);
  };

  //  On mouseout, hide the overlay after 1 second.
  const onMouseLeave = () => {
    clearTimeout(hoverTimeoutId.current);
    hoverTimeoutId.current = setTimeout(() => {
      setShowOverlayAt(null);
    }, HOVER_HIDE_DELAY);
  };

  //  Renderable element for the overlay.
  const overlayElement = useMemo(() => (showOverlayAt ? (
    <StyledHoverOverlay style={showOverlayAt}>
      { description ? (
        <StyledOverlayDescription content={description}>
          <StyledOverlayTitle>{ title }</StyledOverlayTitle>
        </StyledOverlayDescription>
      ) : null }
      { recommendedBasemap ? (
        <StyledRecommendedBasemap>
          Recommended Basemap:
          <StyledStrong>
            { recommendedBasemap.post_title }
          </StyledStrong>
        </StyledRecommendedBasemap>
      ) : null }
    </StyledHoverOverlay>
  ) : null), [description, recommendedBasemap, showOverlayAt, title]);

  return [{ onMouseEnter, onMouseLeave, ref: listItemRef }, overlayElement];
}

const StyledHoverOverlay = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 25em;
  margin: 0 1em;
  overflow: hidden;
  color: #444;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  border-radius: ${({ theme }) => theme.radii.standard};
  box-shadow: ${({ theme }) => theme.shadows.Panel};
`;

const StyledOverlayTitle = styled.div`
  margin-top: 0;
  font-size: 1em;
  font-weight: bold;
`;

const StyledOverlayDescription = styled(HTMLContent)`
  max-height: 25em;
  padding: 1em;
  overflow-y: scroll;
`;

const StyledRecommendedBasemap = styled.div`
  padding: 0.75em 1em;
  font-size: 0.85em;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.panelBackground};
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledStrong = styled.strong`
  margin-left: 0.5em;
  color: ${({ theme }) => theme.colors.brightAccent};
`;
