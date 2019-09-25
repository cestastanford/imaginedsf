/*
* Imports
*/

import React, { useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HTMLContent from './HTMLContent';
import AccentCheckbox from './AccentCheckbox';
import AccentDisclosureTriangle from './AccentDisclosureTriangle';
import { setEnabled, setOpacity } from '../state/actions';
import {
  MAP_GROUP_POST_TYPE,
  GEOJSON_SOURCE_TYPE,
} from '../constants';


/*
* Custom hook that handles listening for hovers and determining whether
* the overlay should be visible or not.
*/

const HOVER_SHOW_DELAY = 1000;
const HOVER_HIDE_DELAY = 500;
const useHoverDescriptionOverlay = () => {
  const [showOverlayAt, setShowOverlayAt] = useState(null);
  const listItemRef = useRef();
  const hoverTimeoutId = useRef(null);

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

  return [showOverlayAt, { onMouseEnter, onMouseLeave, ref: listItemRef }];
};


/*
* Renders either a map or a map group and any children.
*/

export default function MapListItem({ id, showYear }) {
  const enabled = useSelector((state) => state.mapState.enabled[id]);
  const opacity = useSelector((state) => state.mapState.opacity[id]);
  const {
    post_type: postType,
    post_title: title,
    source_type: sourceType,
    metadata: {
      year,
      description,
      recommended_basemap: recommendedBasemapId,
    },
    children,
  } = useSelector((state) => state.mapContent.mapItems[id]);

  const recommendedBasemap = useSelector(
    (state) => (recommendedBasemapId ? state.mapContent.mapItems[recommendedBasemapId] : null),
  );

  const dispatch = useDispatch();
  const handleEnabledUpdate = useCallback(
    () => dispatch(setEnabled(id, !enabled)),
    [dispatch, id, enabled],
  );

  const handleOpacityUpdate = useCallback(
    (newOpacity) => dispatch(setOpacity(id, newOpacity)),
    [dispatch, id],
  );

  const [showOverlayAt, overlayListeners] = useHoverDescriptionOverlay();

  const isGroup = postType === MAP_GROUP_POST_TYPE;
  const isRaster = !isGroup && sourceType !== GEOJSON_SOURCE_TYPE;

  return (
    <>

      <StyledMapListItem {...overlayListeners}> {/* eslint-disable-line */}

        <StyledEnabled>
          { isGroup ? (
            <AccentDisclosureTriangle
              expanded={enabled}
              onChange={handleEnabledUpdate}
            />
          ) : (
            <AccentCheckbox
              checked={enabled}
              onChange={handleEnabledUpdate}
            />
          ) }
        </StyledEnabled>

        { showYear ? (
          <StyledYear
            isEnabled={enabled}
            onClick={handleEnabledUpdate}
          >
            { year }
          </StyledYear>
        ) : null }

        <StyledTitle
          isEnabled={enabled}
          onClick={handleEnabledUpdate}
        >
          { title }
        </StyledTitle>

        { isRaster ? (
          <StyledRange
            type="range"
            min="0.01"
            max="1"
            step="0.01"
            disabled={!enabled}
            value={opacity}
            onChange={(e) => handleOpacityUpdate(+e.target.value)}
          />
        ) : null }

        { showOverlayAt ? (
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
        ) : null }

      </StyledMapListItem>

      { isGroup && enabled ? (
        <StyledChildren>
          { children.map((childId) => <MapListItem key={childId} id={childId} />) }
        </StyledChildren>
      ) : null }

    </>
  );
}

MapListItem.propTypes = {
  id: PropTypes.number.isRequired,
  showYear: PropTypes.bool,
};

MapListItem.defaultProps = {
  showYear: false,
};


/*
* Styles
*/

const StyledMapListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1.25;
`;

const StyledEnabled = styled.span`
  margin-right: 0.75rem;
  margin-bottom: 0.15em;
`;

const StyledYear = styled.span`
  margin-right: 0.75rem;
  margin-bottom: 0.1em;
  font-size: 1.1em;
  color: ${({ theme, isEnabled }) => (isEnabled ? theme.colors.brightAccent : '#888')};
  cursor: pointer;
  user-select: none;
`;

const StyledTitle = styled.a`
  flex-grow: 1;
  margin-right: 1rem;
  font-size: 0.9em;
  font-weight: ${({ isEnabled }) => (isEnabled ? 'bold' : 'normal')};
  color: ${({ theme, isEnabled }) => (isEnabled ? theme.colors.brightAccent : '#444')};
  cursor: pointer;
  user-select: none;
  opacity: 1;
  transition: opacity 0.25s;

  &:hover {
    color: ${({ theme, isEnabled }) => (isEnabled ? theme.colors.brightAccent : '#444')};
    opacity: 0.75;
  }
`;

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

const StyledRange = styled.input`
  width: 8em;
`;

const StyledChildren = styled.ul`
  padding: 0.1em 0 0.1em 0.9rem;
  margin-left: 0.25em;
  border-left: 1px solid #aaa;

  & > li {
    margin: 0.5em 0;
  }
`;
