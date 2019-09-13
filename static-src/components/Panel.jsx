/*
*   Import libraries.
*/

import React from 'react';
import { Link, Router } from '@reach/router';
import PropTypes from 'prop-types';

/*
*   Imports components.
*/

import Introduction from './Introduction';
import ProposalMaps from './ProposalMaps';
import Narratives from './Narratives';

const Panel = ({ location }) => (
  <>
    <div>
      <Link to="/">Introduction</Link>
      {' '}
      <Link to="/proposal-maps">Proposal Maps</Link>
      {' '}
      <Link to="/narratives">Narratives</Link>
    </div>
    <Router location={location || window.location}>
      <Introduction path="/*" />
      <ProposalMaps path="/proposal-maps" />
      <Narratives path="/narratives" />
    </Router>
  </>
);

Panel.propTypes = {
  location: PropTypes.shape({}),
};

Panel.defaultProps = {
  location: null,
};

export default Panel;
