import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ openModal }) {
  return (
    <div>
      <button type="button" onClick={() => openModal('/bibliography')}>Bibliography</button>
      {' '}
      <button type="button" onClick={() => openModal('/credits')}>Credits</button>
      {' '}
      <button type="button" onClick={() => openModal('/feedback')}>Feedback</button>
    </div>
  );
}

Header.propTypes = {
  openModal: PropTypes.func.isRequired,
};
