/*
*   Imports libraries.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/*
* Imports Redux action creators.
*/

import * as actions from '../state/actions';


/*
*   Imports components.
*/

import Header from './Header';
import LeafletMap from './LeafletMap';
import MapControls from './MapControls';
import Panel from './Panel';

class App extends React.Component {
  componentDidMount() {
    const { mapsRequested, mapsReceived } = this.props;
    mapsRequested();
    setTimeout(() => {
      mapsReceived(
        { 1: 'sample map' }, // maps
        ['sample proposal range'], // proposalRanges
        [1], // basemaps
      );
    }, 5000);
  }

  render() {
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
}

App.propTypes = {
  mapsRequested: PropTypes.func.isRequired,
  mapsReceived: PropTypes.func.isRequired,
};

const mapStateToProps = null;
const mapDispatchToProps = {
  mapsRequested: actions.mapsRequested,
  mapsReceived: actions.mapsReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
