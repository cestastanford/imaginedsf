/*
* Imports libraries.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/*
* Imports action creators.
*/

import * as actions from '../state/actions';


class Narratives extends React.Component {
  componentDidMount() {
    const { narrativesRequested, narrativesReceived } = this.props;
    narrativesRequested();
    setTimeout(() => {
      narrativesReceived(
        ['A sample narrative'],
      );
    }, 5000);
  }

  render() {
    const { narrativesLoading, narratives } = this.props;
    return (
      <div>
        Narratives Component
        { narrativesLoading ? 'Narratives loading' : 'Narratives not loading' }
        { narratives }
      </div>
    );
  }
}

Narratives.propTypes = {
  narrativesRequested: PropTypes.func.isRequired,
  narrativesReceived: PropTypes.func.isRequired,
  narrativesLoading: PropTypes.bool.isRequired,
  narratives: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({
  narrativesLoading,
  narratives,
}) => ({
  narrativesLoading,
  narratives,
});

const mapDispatchToProps = {
  narrativesRequested: actions.narrativesRequested,
  narrativesReceived: actions.narrativesReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(Narratives);
