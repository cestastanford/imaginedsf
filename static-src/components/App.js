/*
* Imports libraries.
*/

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';


/*
* Imports Redux action creators.
*/

import { fetchContent } from '../state/actions';


/*
* Imports components.
*/

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
  const visibleMapArea = useRef();
  const dispatch = useDispatch();

  //  Downloads initial content and sets initial state
  useEffect(() => {
    const initApp = async () => {
      await dispatch(fetchContent());
      setLoading(false);
    };

    initApp();
  }, [dispatch]);

  return (
    <StyledApp>
      <LoadingMessage visible={loading}>Loading...</LoadingMessage>
      { loading ? null : (
        <StyledMainContainer>
          <Header />
          <StyledBody>
            <LeafletMap visibleMapAreaRef={visibleMapArea} />
            <Panel />
            <VisibleMapArea ref={visibleMapArea} />
            <Modals />
          </StyledBody>
        </StyledMainContainer>
      )}
    </StyledApp>
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
