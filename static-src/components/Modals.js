/*
* Imports.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { Router } from '@reach/router';

import Modal from './Modal';
import HTMLContent from './HTMLContent';
import FeedbackForm from './FeedbackForm';

/*
* Component definition for Modals, which contains the various modals
* that can be displayed and routes between them.
*/

export default function Modals() {
  const {
    bibliography,
    credits,
    feedback,
  } = useSelector((state) => state.contentAreaContent);

  return (
    <Router>

      <Modal
        path="/bibliography"
        title="Bibliography"
        content={<HTMLContent content={bibliography} />}
      />

      <Modal
        path="/credits"
        title="Credits"
        content={<HTMLContent content={credits} />}
      />

      <Modal
        path="/feedback"
        title="Feedback"
        content={(
          <>
            <HTMLContent content={feedback} />
            <FeedbackForm />
          </>
        )}
      />

    </Router>
  );
}
