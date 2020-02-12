import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Modal from './Modal';
import HTMLContent from '../HTMLContent';

export default function DescriptionModal({ mapId }) {
  const map = useSelector((state) => state.mapContent.mapItems[mapId]);
  if (!map) {
    return null;
  }

  const {
    post_title: title,
    metadata: {
      description,
    },
  } = map;

  return (
    <Modal title={title}>
      <HTMLContent content={description} />
    </Modal>
  );
}

DescriptionModal.propTypes = {
  mapId: PropTypes.string.isRequired,
};
