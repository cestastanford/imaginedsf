import React from 'react';
import { useSelector } from 'react-redux';
import { Router } from '@reach/router';

import Modal from './Modal';

export default function Modals() {
  const {
    bibliography,
    credits,
    feedback,
  } = useSelector((state) => state.contentAreaContent);

  return (
    <Router>
      <Modal path="/bibliography" title="Bibliography" content={bibliography} />
      <Modal path="/credits" title="Credits" content={credits} />
      <Modal path="/feedback" title="Feedback" content={feedback} />
    </Router>
  );
}
