/*
* Imports libraries.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/*
* Imports action creators, constants.
*/

import * as actions from '../state/actions';
import { FEEDBACK_CONTENT_AREA } from '../constants';


class Feedback extends React.Component {
  componentDidMount() {
    const { contentRequested, contentReceived } = this.props;
    contentRequested(FEEDBACK_CONTENT_AREA);
    setTimeout(() => {
      contentReceived(
        FEEDBACK_CONTENT_AREA,
        'sample feedback',
      );
    }, 5000);
  }

  render() {
    const { contentAreaLoading, content } = this.props;
    return (
      <div>
        Feedback Component
        {' | '}
        { contentAreaLoading ? 'Content loading' : 'Content not loading' }
        {' | '}
        { content }
      </div>
    );
  }
}

Feedback.propTypes = {
  contentRequested: PropTypes.func.isRequired,
  contentReceived: PropTypes.func.isRequired,
  contentAreaLoading: PropTypes.bool,
  content: PropTypes.string,
};

Feedback.defaultProps = {
  contentAreaLoading: false,
  content: '',
};

const mapStateToProps = (state) => ({
  contentAreaLoading: state.contentAreaLoading[FEEDBACK_CONTENT_AREA],
  content: state.contentAreaContent[FEEDBACK_CONTENT_AREA],
});

const mapDispatchToProps = {
  contentRequested: actions.contentRequested,
  contentReceived: actions.contentReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
