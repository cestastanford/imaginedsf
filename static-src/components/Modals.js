import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import HTMLContent from './HTMLContent';
import Modal from './Modal';
import FeedbackForm from './FeedbackForm';


export default function Modals() {
  const {
    bibliography,
    credits,
    feedback,
  } = useSelector((state) => state.contentAreaContent);

  //  Modals
  const modals = [

    <Modal
      path="/bibliography"
      title="Bibliography"
      content={<HTMLContent content={bibliography} />}
    />,

    <Modal
      path="/credits"
      title="Credits"
      content={<HTMLContent content={credits} />}
    />,

    <Modal
      path="/feedback"
      title="Feedback"
      content={(
        <>
          <HTMLContent content={feedback} />
          <FeedbackForm />
        </>
      )}
    />,

  ];

  return modals.map((modal) => (
    <Route
      path={modal.props.path}
      key={modal.props.path}
      render={() => modal}
    />
  ));
}
