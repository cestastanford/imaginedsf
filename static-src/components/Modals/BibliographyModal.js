import React from 'react';
import { useSelector } from 'react-redux';

import Modal from './Modal';
import HTMLContent from '../HTMLContent';

export default function BibliographyModal() {
  const bibliography = useSelector((state) => state.contentAreaContent.bibliography);
  return (
    <Modal title="Bibliography">
      <HTMLContent content={bibliography} />
    </Modal>
  );
}
