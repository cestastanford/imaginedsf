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


class Credits extends React.Component {
  componentDidMount() {
    const { contentRequested, contentReceived } = this.props;
    contentRequested(['credits']);
    setTimeout(() => {
      contentReceived(
        ['credits'],
        'sample credits',
      );
    }, 5000);
  }

  render() {
    const { contentAreaLoading, content } = this.props;
    return (
      <div>
        Credits Component
        { contentAreaLoading ? 'Content loading' : 'Content not loading' }
        { content }
      </div>
    );
  }
}

Credits.propTypes = {
  contentRequested: PropTypes.func.isRequired,
  contentReceived: PropTypes.func.isRequired,
  contentAreaLoading: PropTypes.bool.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({
  contentAreaLoading,
  content,
}) => ({
  contentAreaLoading,
  content,
});

const mapDispatchToProps = {
  contentRequested: actions.contentRequested,
  contentReceived: actions.contentReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(Credits);
