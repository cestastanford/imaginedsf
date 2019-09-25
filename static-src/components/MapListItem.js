/*
* Imports
*/

import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AccentCheckbox from './AccentCheckbox';
import AccentDisclosureTriangle from './AccentDisclosureTriangle';
import { setEnabled, setOpacity } from '../state/actions';
import {
  MAP_GROUP_POST_TYPE,
  GEOJSON_SOURCE_TYPE,
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
    metadata: {
      year,
      description,
      recommended_basemap: recommendedBasemap,
    },
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
  const isRaster = !isGroup && sourceType !== GEOJSON_SOURCE_TYPE;
  return (
    <>
      <StyledMapListItem>
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

const StyledTitle = styled.span`
  flex-grow: 1;
  margin-right: 1rem;
  font-size: 0.9em;
  font-weight: ${({ isEnabled }) => (isEnabled ? 'bold' : 'normal')};
  color: ${({ theme, isEnabled }) => (isEnabled ? theme.colors.brightAccent : '#444')};
  cursor: pointer;
  user-select: none;
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
