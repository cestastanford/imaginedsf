/*
* Imports
*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { contentReceived } from '../state/actions';


/*
* ContentLoader component definition.  Requests SPA content on
* first render and shows a loading message until content is received,
* at which point it renders its children.
*/

export default function ContentLoader({ children }) {
  const contentLoaded = useSelector((state) => state.contentLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('/wp-json/imaginedsf/content');
      const parsedResponse = await response.json();

      dispatch(contentReceived(parsedResponse));
    };

    fetchContent();
  }, [dispatch]);

  return contentLoaded ? children : (
    <div>Loading...</div>
  );
}

ContentLoader.propTypes = {
  children: PropTypes.node.isRequired,
};
