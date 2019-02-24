/* eslint-disable react/no-array-index-key, no-param-reassign */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ASYNC, testRequest } from 'app/actions';

const mapStateToProps = state => ({
  reports: state.reports,
});

const mapDispatchToProps = {
  onTestRequest: testRequest[ASYNC.request],
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.fetchApi = this.fetchApi.bind(this);

    setTimeout(() => { this.fetchApi('2-seconds-after-page-load'); }, 2000);
  }

  fetchApi(param) {
    if (typeof param !== 'string') { param = 'on-button-click'; }
    this.props.onTestRequest(param); // eslint-disable-line react/destructuring-assignment
  }

  render() {
    const { reports } = this.props;

    return (
      <React.Fragment>
        <button type="button" onClick={this.fetchApi}>Click Me!</button>
        {
          reports.map((report, index) => (
            <div className="report" key={index}>{report}</div>
          ))
        }
      </React.Fragment>
    );
  }
}

App.defaultProps = {
  reports: [],

  onTestRequest: () => {},
};

App.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.string),

  onTestRequest: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
