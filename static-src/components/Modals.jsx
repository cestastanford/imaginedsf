import React from 'react';
import { Router } from '@reach/router';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from './Modal';

export default function Modals({ closeModal }) {
  const {
    bibliography,
    credits,
    feedback,
  // } = useSelector((state) => state.content);
  } = {
    bibliography: 'sample bibliography text',
    credits: 'sample credits text',
    feedback: 'sample feedback text',
  };

  return (
    <Router>
      <Modal path="/bibliography" content={bibliography} closeModal={closeModal} />
      <Modal path="/credits" content={credits} closeModal={closeModal} />
      <Modal path="/feedback" content={feedback} closeModal={closeModal} />
    </Router>
  );
}

Modals.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
