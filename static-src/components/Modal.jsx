import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ content, closeModal }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} /> {/* eslint-disable-line */}
      <button type="button" onClick={closeModal}>Close</button>
    </div>
  );
}

Modal.propTypes = {
  content: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
