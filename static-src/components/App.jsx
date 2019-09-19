/*
* Imports libraries.
*/

import React from 'react';
import styled from 'styled-components';


/*
* Imports components.
*/

import ContentLoader from './ContentLoader';
import Header from './Header';
import LeafletMap from './LeafletMap';
import VisibleMapArea from './VisibleMapArea';
import Panel from './Panel';
import Modals from './Modals';


/*
* Defines top-level App component hierarchy.
*/

export default function App() {
  return (
    <StyledApp>
      <ContentLoader>
        <StyledMainContainer>
          <Header />
          <StyledBody>
            <LeafletMap />
            <Panel />
            <VisibleMapArea />
            <Modals />
          </StyledBody>
        </StyledMainContainer>
      </ContentLoader>
    </StyledApp>
  );
}


/*
* Defines styled components used in app.
*/

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Muli', sans-serif;
  font-size: 16px;
`;


const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  padding: 1.25em;
`;
