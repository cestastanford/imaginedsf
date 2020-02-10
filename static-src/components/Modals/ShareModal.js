import React, { useContext } from 'react';

import Modal from './Modal';
import PreviousLocationContext from './PreviousLocationContext';


export default function ShareModal() {
  const previousLocation = useContext(PreviousLocationContext);
  const previousUrl = `${window.location.origin}${previousLocation.pathname}${previousLocation.hash}`;

  return (
    <Modal title="Share current view" isSideModal>
      <a href={previousUrl}>{previousUrl}</a>
    </Modal>
  );
}
