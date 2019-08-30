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
import { INTRODUCTION_CONTENT_AREA } from '../constants';


class Introduction extends React.Component {
  componentDidMount() {
    const { contentRequested, contentReceived } = this.props;
    contentRequested(INTRODUCTION_CONTENT_AREA);
    setTimeout(() => {
      contentReceived(
        INTRODUCTION_CONTENT_AREA,
        'a sample introduction',
      );
    }, 5000);
  }

  render() {
    const { introductonLoading, introductionContent } = this.props;
    return (
      <div>
        Introduction Component
        {' | '}
        { introductonLoading ? 'Content loading' : 'Content not loading' }
        {' | '}
        { introductionContent }
      </div>
    );
  }
}

Introduction.propTypes = {
  contentRequested: PropTypes.func.isRequired,
  contentReceived: PropTypes.func.isRequired,
  introductonLoading: PropTypes.bool,
  introductionContent: PropTypes.string,
};

Introduction.defaultProps = {
  introductonLoading: false,
  introductionContent: '',
};

const mapStateToProps = (state) => ({
  introductonLoading: state.contentAreaLoading[INTRODUCTION_CONTENT_AREA],
  introductionContent: state.contentAreaContent[INTRODUCTION_CONTENT_AREA],
});

const mapDispatchToProps = {
  contentRequested: actions.contentRequested,
  contentReceived: actions.contentReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);
