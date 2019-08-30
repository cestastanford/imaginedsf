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
import { CREDITS_CONTENT_AREA } from '../constants';


class Credits extends React.Component {
  componentDidMount() {
    const { contentRequested, contentReceived } = this.props;
    contentRequested(CREDITS_CONTENT_AREA);
    setTimeout(() => {
      contentReceived(
        CREDITS_CONTENT_AREA,
        'sample credits',
      );
    }, 5000);
  }

  render() {
    const { contentAreaLoading, content } = this.props;
    return (
      <div>
        Credits Component
        {' | '}
        { contentAreaLoading ? 'Content loading' : 'Content not loading' }
        {' | '}
        { content }
      </div>
    );
  }
}

Credits.propTypes = {
  contentRequested: PropTypes.func.isRequired,
  contentReceived: PropTypes.func.isRequired,
  contentAreaLoading: PropTypes.bool,
  content: PropTypes.string,
};

Credits.defaultProps = {
  contentAreaLoading: false,
  content: '',
};

const mapStateToProps = (state) => ({
  contentAreaLoading: state.contentAreaLoading[CREDITS_CONTENT_AREA],
  content: state.contentAreaContent[CREDITS_CONTENT_AREA],
});

const mapDispatchToProps = {
  contentRequested: actions.contentRequested,
  contentReceived: actions.contentReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(Credits);
