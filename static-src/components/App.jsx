/*
* Imports libraries.
*/

import React from 'react';


/*
* Imports components.
*/

import ContentLoader from './ContentLoader';
import Header from './Header';
import LeafletMap from './LeafletMap';
import MapControls from './MapControls';
import Panel from './Panel';
import Modals from './Modals';


/*
* Defines top-level App component hierarchy.
*/

export default function App() {
  return (
    <ContentLoader>
      App Component
      <Header />
      <div>
        <Panel />
        <MapControls />
        <LeafletMap />
      </div>
      <Modals />
    </ContentLoader>
  );
}
