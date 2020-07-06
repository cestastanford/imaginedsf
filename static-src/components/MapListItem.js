/*
* Imports
*/

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

import AccentCheckbox from './AccentCheckbox';
import AccentDisclosureTriangle from './AccentDisclosureTriangle';
import { setEnabled, setOpacity } from '../state/actions';
import {
  MAP_GROUP_POST_TYPE,
  RASTER_WMS_SOURCE_TYPE,
  RASTER_TILE_SOURCE_TYPE,
  DESCRIPTION_ROUTE,
} from '../constants';


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
    metadata: { year, indented },
    children,
  } = useSelector((state) => state.mapContent.mapItems[id]);

  const dispatch = useDispatch();
  const handleEnabledUpdate = useCallback(
    () => dispatch(setEnabled(id, !enabled)),
    [dispatch, id, enabled],
  );

  const handleOpacityUpdate = useCallback(
    (newOpacity) => dispatch(setOpacity(id, newOpacity)),
    [dispatch, id],
  );

  const isGroup = postType === MAP_GROUP_POST_TYPE;
  const isRaster = !isGroup && (
    sourceType === RASTER_WMS_SOURCE_TYPE
    || sourceType === RASTER_TILE_SOURCE_TYPE
  );

  const descriptionActive = useRouteMatch(`${DESCRIPTION_ROUTE}/${id}`);
  const descriptionLocation = { ...useLocation(), pathname: `${DESCRIPTION_ROUTE}/${id}` };

  return (
    <>

      <StyledMapListItem indented={indented}>

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

        { !indented && showYear ? (
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
          {title}
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

        <StyledDescriptionButton
          to={descriptionLocation}
          active={descriptionActive}
        >
          𝒊
        </StyledDescriptionButton>

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
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  margin-left: ${({ indented }) => (indented ? '1.5em' : '0')};
  line-height: 1.25;

  > * {
    flex-shrink: 0;
  }
`;

const StyledEnabled = styled.span`
  margin-right: 0.65rem;
  margin-bottom: 0.15em;
`;

const StyledYear = styled.span`
  margin-right: 0.65rem;
  color: ${({ theme, isEnabled }) => (isEnabled ? theme.colors.brightAccent : '#888')};
  cursor: pointer;
  user-select: none;
`;

const StyledTitle = styled.a`
  flex-grow: 1;
  flex-shrink: 1;
  margin-right: 1rem;
  font-weight: ${({ isEnabled }) => (isEnabled ? 'bold' : 'normal')};
  color: ${({ theme, isEnabled }) => (isEnabled ? theme.colors.brightAccent : '#444')};
  letter-spacing: ${({ isEnabled }) => (isEnabled ? '-0.015em' : 'inherit')};
  cursor: pointer;
  user-select: none;
  opacity: 1;
  transition: opacity 0.25s;

  &:hover {
    color: ${({ theme, isEnabled }) => (isEnabled ? theme.colors.brightAccent : '#444')};
    opacity: 0.75;
  }
`;

const StyledRange = styled.input`
  width: 6em;
  margin-right: 1.5em;
  transform: scale(1.25);
  transform-origin: left;
`;

const StyledDescriptionButton = styled(Link)`
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.35rem;
  font-size: 1.15em;
  line-height: 0.85;
  color: ${(props) => (props.active ? props.theme.colors.brightAccent : '#888')};
  text-align: center;
  border: 1px solid ${(props) => (props.active ? props.theme.colors.brightAccent : '#888')};
  border-radius: 1.2rem;
  transition: color 0.15s, border-color 0.15s, opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledChildren = styled.ul`
  padding-left: 1.25em;
  margin-bottom: 0.75em;
  margin-left: 0.15em;
  border-left: 1px solid #aaa;
`;
