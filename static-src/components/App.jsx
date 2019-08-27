/*
*   Imports libraries.
*/

import React from 'react';

/*
*   Imports components.
*/

import Header from './Header';
import LeafletMap from './LeafletMap';
import MapControls from './MapControls';
import Panel from './Panel';

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
