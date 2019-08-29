import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function LeafletMap({ mapsLoading, maps }) {
  return (
    <div>
      LeafletMap Component
      { mapsLoading ? 'Maps loading' : 'Maps not loading' }
      { Object.entries(maps).toString() }
    </div>
  );
}

LeafletMap.propTypes = {
  mapsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  mapsLoading,
  maps,
}) => ({
  mapsLoading,
  maps,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMap);
