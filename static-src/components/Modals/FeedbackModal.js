import React from 'react';
import { useSelector } from 'react-redux';

import Modal from './Modal';
import HTMLContent from '../HTMLContent';
import FeedbackForm from './FeedbackForm';

export default function FeedbackModal() {
  const feedback = useSelector((state) => state.contentAreaContent.feedback);
  return (
    <Modal title="Feedback">
      <HTMLContent content={feedback} />
      <FeedbackForm />
    </Modal>
  );
}
