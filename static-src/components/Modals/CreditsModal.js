import React from 'react';
import { useSelector } from 'react-redux';

import Modal from './Modal';
import HTMLContent from '../HTMLContent';

export default function CreditsModal() {
  const credits = useSelector((state) => state.contentAreaContent.credits);
  return (
    <Modal title="Credits">
      <HTMLContent content={credits} />
    </Modal>
  );
}
