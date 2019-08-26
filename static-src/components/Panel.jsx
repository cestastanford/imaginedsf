/*
*   Import libraries.
*/

import React from 'react';
import { Link, Router } from '@reach/router';

/*
*   Imports components.
*/

import Introduction from './Introduction.jsx';
import ProposalMaps from './ProposalMaps.jsx';
import Narratives from './Narratives.jsx';

// function Panel() {
//   return (
//     <div>
//     Panel Component
//       <Introduction />
//       <ProposalMaps />
//       <Narratives />
//     </div>
//   );
// }

// export default Panel;

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
