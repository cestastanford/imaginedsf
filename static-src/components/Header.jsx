import React from 'react';
import { Link } from '@reach/router';

export default function Header() {
  return (
    <div>
      <Link to="/bibliography">Bibliography</Link>
      {' '}
      <Link to="/credits">Credits</Link>
      {' '}
      <Link to="/feedback">Feedback</Link>
    </div>
  );
}
