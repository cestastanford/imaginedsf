/*
*   Import libraries.
*/

import React from 'react';
import { Link, Router } from '@reach/router';

/*
*   Imports components.
*/

import Introduction from './Introduction';
import ProposalMaps from './ProposalMaps';
import Narratives from './Narratives';

const Panel = () => (
  <>
    <div>
      <Link to="/">Introduction</Link>
      {' '}
      <Link to="/proposal-maps">Proposal Maps</Link>
      {' '}
      <Link to="/narratives">Narratives</Link>
    </div>
    <Router>
      <Introduction path="/" />
      <ProposalMaps path="/proposal-maps" />
      <Narratives path="/narratives" />
    </Router>
  </>
);

export default Panel;
