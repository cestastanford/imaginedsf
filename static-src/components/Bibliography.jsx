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
import { BIBLIOGRAPHY_CONTENT_AREA } from '../constants';


class Bibliography extends React.Component {
  componentDidMount() {
    const { contentRequested, contentReceived } = this.props;
    contentRequested(BIBLIOGRAPHY_CONTENT_AREA);
    setTimeout(() => {
      contentReceived(
        BIBLIOGRAPHY_CONTENT_AREA,
        'sample bibliography',
      );
    }, 5000);
  }

  render() {
    const { bibliographyLoading, bibliographyContent } = this.props;
    return (
      <div>
        Bibliography Component
        {' | '}
        { bibliographyLoading ? 'Content loading' : 'Content not loading' }
        {' | '}
        { bibliographyContent }
      </div>
    );
  }
}

Bibliography.propTypes = {
  contentRequested: PropTypes.func.isRequired,
  contentReceived: PropTypes.func.isRequired,
  bibliographyLoading: PropTypes.bool,
  bibliographyContent: PropTypes.string,
};

Bibliography.defaultProps = {
  bibliographyLoading: false,
  bibliographyContent: '',
};

const mapStateToProps = (state) => ({
  bibliographyLoading: state.contentAreaLoading[BIBLIOGRAPHY_CONTENT_AREA],
  bibliographyContent: state.contentAreaContent[BIBLIOGRAPHY_CONTENT_AREA],
});

const mapDispatchToProps = {
  contentRequested: actions.contentRequested,
  contentReceived: actions.contentReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bibliography);
