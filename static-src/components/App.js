/*
* Imports libraries.
*/

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import LeafletMapContext from './LeafletMapContext';
import { fetchContent } from '../state/actions';
import Header from './Header';
import LeafletMap from './LeafletMap';
import VisibleMapArea from './VisibleMapArea';
import Panel from './Panel';
import Modals from './Modals';


/*
* Defines top-level App component, which contains all other app components
* and starts initial data loading and state initialization.
*/

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const visibleMapAreaElementRef = useRef();
  const leafletMapRef = useRef();
  const dispatch = useDispatch();


  //  Downloads initial content and sets initial state
  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(fetchContent());
        setLoading(false);
      } catch (e) {
        setLoadingError(e.message);
        throw e;
      }
    };

    initApp();
  }, [dispatch]);

  return (
    <LeafletMapContext.Provider value={leafletMapRef}>
      <StyledApp>
        <LoadingMessage visible={loading}>
          { loadingError ? 'Error' : 'Loading...' }
          { loadingError ? <LoadingError>{ loadingError }</LoadingError> : null }
        </LoadingMessage>
        { loading ? null : (
          <StyledMainContainer>
            <BrowserRouter>
              <Header />
              <StyledBody>
                <LeafletMap
                  visibleMapAreaElementRef={visibleMapAreaElementRef}
                  ref={leafletMapRef}
                />
                <Panel />
                <VisibleMapArea ref={visibleMapAreaElementRef} />
                <Modals />
              </StyledBody>
            </BrowserRouter>
          </StyledMainContainer>
        )}
      </StyledApp>
    </LeafletMapContext.Provider>
  );
}


/*
* Defines styled components used in app.
*/

const LoadingMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.LoadingMessage};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 2em;
  font-weight: lighter;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  background-color: #fff;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s, visibility 0s 0.5s;
`;

const LoadingError = styled.div`
  margin-top: 1em;
  font-size: 0.75em;
`;

const StyledApp = styled.div`
  width: 100vw;
  min-width: 57.75em;
  height: 100vh;
  min-height: 800px;
  font-family: 'Muli', sans-serif;
  font-size: 16px;

  .admin-bar-showing & {
    height: calc(100vh - 32px);

    @media screen and (max-width: 782px) {
      height: calc(100vh - 46px);
    }
  }
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
  width: 100%;
  height: 100%;
  padding: 1.25em;
`;
