import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

export default function Modal({ content }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} /> {/* eslint-disable-line */}
      <Link to="/">Close</Link>
    </div>
  );
}

Modal.propTypes = {
  content: PropTypes.string.isRequired,
};
