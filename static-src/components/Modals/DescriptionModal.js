import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LatLngBounds } from 'leaflet';
import styled from 'styled-components';

import Modal from './Modal';
import PreviousLocationContext from './PreviousLocationContext';
import HTMLContent from '../HTMLContent';
import useZoomToBounds from '../useZoomToBounds';
import { applyMapState } from '../../state/actions';

import extentImg from '../../img/extent.png';
import basemapsImg from '../../img/basemaps.png';


/*
* Zoom to map extent button
*/

function ZoomToMapExtentButton({ mapId, closeModal }) {
  const map = useSelector((state) => state.mapContent.mapItems[mapId]);
  const bounds = new LatLngBounds(map.metadata.bounds);
  const [zoomToBounds] = useZoomToBounds(bounds);

  const handleButtonClick = () => {
    zoomToBounds();
    closeModal();
  };

  return (
    <StyledMapControl onClick={handleButtonClick}>
      <StyledButton className="button">
        <img src={extentImg} alt="Zoom to map extent" />
      </StyledButton>
      <StyledButtonTitle>Zoom to map extent</StyledButtonTitle>
    </StyledMapControl>
  );
}

ZoomToMapExtentButton.propTypes = {
  mapId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};


/*
* Show recommended basemap button
*/

function ShowRecommendedBasemapButton({ mapId, closeModal }) {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.mapContent.mapItems[mapId]);
  const recommendedBasemapId = map.metadata.recommended_basemap;
  const basemapIds = useSelector((state) => state.mapContent.basemaps);
  const {
    post_title: recommendedBasemapTitle,
  } = useSelector((state) => state.mapContent.mapItems[recommendedBasemapId]);

  const handleButtonClick = () => {
    dispatch(applyMapState({
      enabled: Object.assign(
        {},
        ...basemapIds.map((id) => ({ [id]: false })),
        { [recommendedBasemapId]: true },
      ),
    }));

    closeModal();
  };

  return (
    <StyledMapControl onClick={handleButtonClick}>
      <StyledButton className="button">
        <img src={basemapsImg} alt="Show recommended basemap" />
      </StyledButton>
      <StyledButtonTitle>
        Show recommended basemap:
        <strong>{ recommendedBasemapTitle }</strong>
      </StyledButtonTitle>
    </StyledMapControl>
  );
}

ShowRecommendedBasemapButton.propTypes = {
  mapId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};


/*
* Description modal
*/

export default function DescriptionModal({ mapId }) {
  const previousLocation = useContext(PreviousLocationContext);
  const history = useHistory();
  const map = useSelector((state) => state.mapContent.mapItems[mapId]);

  if (!map) {
    return null;
  }

  const {
    post_title: title,
    metadata: {
      description,
      has_bounds: hasBounds,
      recommended_basemap: recommendedBasemap,
    },
  } = map;

  const closeModal = () => history.push(previousLocation);

  return (
    <Modal title={title}>
      <StyledModalContent>
        <StyledMapControls>

          {/* Zoom to map extent button */}
          { hasBounds ? (
            <ZoomToMapExtentButton mapId={mapId} closeModal={closeModal} />
          ) : null }

          {/* Show recommended basemap button */}
          { recommendedBasemap ? (
            <ShowRecommendedBasemapButton mapId={mapId} closeModal={closeModal} />
          ) : null }

        </StyledMapControls>
        <StyledDescription content={description} />
      </StyledModalContent>
    </Modal>
  );
}

DescriptionModal.propTypes = {
  mapId: PropTypes.string.isRequired,
};

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const StyledMapControls = styled.div`
  display: flex;
`;

const StyledMapControl = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 3em 1em 0;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

const StyledButton = styled.button`
  width: 2.25em;
  height: 2.25em;
  padding: 0.25em;
  margin-right: 0.5em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
`;

const StyledButtonTitle = styled.div`
  font-size: 0.85em;

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.brightAccent};
  }
`;

const StyledDescription = styled(HTMLContent)`
  overflow: scroll;
`;
