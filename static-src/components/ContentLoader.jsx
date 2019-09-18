/*
* Imports
*/

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { contentReceived } from '../state/actions';


/*
* ContentLoader component definition.  Requests SPA content on
* first render and shows a loading message until content is received,
* at which point it renders its children.
*/

export default function ContentLoader({ children }) {
  const contentLoaded = useSelector((state) => state.contentLoaded);
  const dispatch = useDispatch();
  const [loadingMessageVisible, setLoadingMessageVisible] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoadingMessageVisible(true);
      const response = await fetch('/wp-json/imaginedsf/content');
      const parsedResponse = await response.json();

      dispatch(contentReceived(parsedResponse));
      setLoadingMessageVisible(false);
    };

    fetchContent();
  }, [dispatch]);

  return (
    <>
      <LoadingMessage visible={loadingMessageVisible}>Loading...</LoadingMessage>
      { contentLoaded ? children : null }
    </>
  );
}

ContentLoader.propTypes = {
  children: PropTypes.node.isRequired,
};


/*
* Styles for the loading message.
*/

const LoadingMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 2em;
  font-weight: lighter;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: opacity 0.5s, visibility 0s 0.5s;
`;
