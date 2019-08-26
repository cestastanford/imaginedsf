/*
*   Imports libraries.
*/

import React from 'react';

/*
*   Imports components.
*/

import Header from './Header.jsx';
import LeafletMap from './LeafletMap.jsx';
import MapControls from './MapControls.jsx';
import Panel from './Panel.jsx';

function App() {
  return (
    <div>
    App Component
      <Header />
      <div>
        <LeafletMap />
        <Panel />
        <MapControls />
      </div>
    </div>
  );
}

export default App;
