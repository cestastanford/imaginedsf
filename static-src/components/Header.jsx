/*
*   Import libraries.
*/

import React from 'react';
import { Link, Router } from '@reach/router';

/*
*   Imports components.
*/

import Bibliography from './Bibliography';
import Credits from './Credits';
import Feedback from './Feedback';

const Header = () => (
  <>
    <div>
      <Link to="/bibliography">Bibliography</Link>
      {' '}
      <Link to="/credits">Credits</Link>
      {' '}
      <Link to="/feedback">Feedback</Link>
    </div>
    <Router>
      <Bibliography path="/bibliography" />
      <Credits path="/credits" />
      <Feedback path="/feedback" />
    </Router>
  </>
);

export default Header;
