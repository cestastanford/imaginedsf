import React from 'react';
import { Router } from '@reach/router';

import Modal from './Modal';

export default function Modals() {
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
      <Modal path="/bibliography" content={bibliography} />
      <Modal path="/credits" content={credits} />
      <Modal path="/feedback" content={feedback} />
    </Router>
  );
}
