/*
* Imports libraries.
*/

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import LeafletMapContext from './LeafletMapContext';
import { fetchContent } from '../state/actions';
import Header from './Header';
import LeafletMap from './LeafletMap';
import VisibleMapArea from './VisibleMapArea';
import Panel from './Panel';
import PanelView from './PanelView';
import HTMLContent from './HTMLContent';
import ProposalMapsPanelViewHeader from './ProposalMapsPanelViewHeader';
import ProposalMapsPanelViewBody from './ProposalMapsPanelViewBody';
import NarrativesPanelViewHeader from './NarrativesPanelViewHeader';
import NarrativesPanelViewBody from './NarrativesPanelViewBody';
import Modal from './Modal';
import FeedbackForm from './FeedbackForm';


/*
* Defines top-level App component, which contains all other app components
* and starts initial data loading and state initialization.
*/

export default function App() {
  const [loading, setLoading] = useState(true);
  const visibleMapAreaElementRef = useRef();
  const leafletMapRef = useRef();
  const dispatch = useDispatch();
  const {
    introduction,
    bibliography,
    credits,
    feedback,
  } = useSelector((state) => state.contentAreaContent);


  //  Downloads initial content and sets initial state
  useEffect(() => {
    const initApp = async () => {
      await dispatch(fetchContent());
      setLoading(false);
    };

    initApp();
  }, [dispatch]);

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

  return (
    <LeafletMapContext.Provider value={leafletMapRef}>
      <StyledApp>
        <LoadingMessage visible={loading}>Loading...</LoadingMessage>
        { loading ? null : (
          <StyledMainContainer>
            <BrowserRouter>
              <Header />
              <StyledBody>
                <LeafletMap
                  visibleMapAreaElementRef={visibleMapAreaElementRef}
                  ref={leafletMapRef}
                />
                <Panel>

                  <PanelView
                    path="/introduction"
                    title="Introduction"
                    bodyContent={<HTMLContent content={introduction} />}
                  />

                  <PanelView
                    path="/proposal-maps"
                    title="Proposal Maps"
                    headerContent={<ProposalMapsPanelViewHeader />}
                    bodyContent={<ProposalMapsPanelViewBody />}
                  />

                  <PanelView
                    path="/narratives"
                    title="Narratives"
                    headerContent={<NarrativesPanelViewHeader pathPrefix="/narratives/" />}
                    bodyContent={<NarrativesPanelViewBody />}
                  />

                </Panel>
                <VisibleMapArea ref={visibleMapAreaElementRef} />
                { modals.map((modal) => (
                  <Route
                    path={modal.props.path}
                    key={modal.props.path}
                    render={() => modal}
                  />
                )) }
              </StyledBody>
              <Route
                path="/"
                exact
                render={({ location }) => (
                  <Redirect to={{ pathname: '/introduction', hash: location.hash }} />
                )}
              />
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
  width: 100%;
  height: 100%;
  padding: 1.25em;
`;
