/*
*   Imports libraries.
*/

import React, { useState } from 'react';
import { Location, navigate } from '@reach/router';
import styled from 'styled-components';


/*
*   Imports components.
*/

import Header from './Header';
import LeafletMap from './LeafletMap';
import MapControls from './MapControls';
import Panel from './Panel';
import Modals from './Modals';

const StyledDiv = styled.div`
  margin: 1em;
  border: 1px solid ${({ theme }) => theme.divColor || '#aaa'};
  padding: 1em;
  color: ${({ theme }) => theme.textColor || '#aaa'};
`;

export default function App() {
  const [panelLocation, setPanelLocation] = useState(null);

  //  Explicitly sets panel view when opening or switching modals
  //  and returns to panel route when closing modal, allowing modals
  //  to have routes.
  const setModal = (modalPath, currentLocation) => {
    if (modalPath) {
      navigate(modalPath);
      setPanelLocation(panelLocation || currentLocation);
    } else {
      navigate(panelLocation.pathname);
      setPanelLocation(null);
    }
  };

  return (
    <Location>
      {({ location }) => (
        <StyledDiv>
          App Component
          <Header openModal={(modalPath) => setModal(modalPath, location)} />
          <StyledDiv>
            <LeafletMap />
            <Panel location={panelLocation} />
            <MapControls />
          </StyledDiv>
          <Modals closeModal={() => setModal(null, location)} />
        </StyledDiv>
      )}
    </Location>
  );
}
