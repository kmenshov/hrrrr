/* eslint-disable react/no-array-index-key, no-param-reassign */
/* global fetch */

import React from 'react';

export default class PagesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
    };

    this.fetchApi = this.fetchApi.bind(this);

    setTimeout(() => { this.fetchApi('2-seconds-after-page-load'); }, 2000);
  }

  fetchApi(param) {
    if (typeof param !== 'string') { param = 'on-button-click'; }

    fetch(`/api/v0/test/${param}`)
      .then(response => response.text())
      .then(text => this.setState(
        prevState => ({
          reports: prevState.reports.concat(text),
        }),
      ));
  }

  render() {
    const { reports } = this.state;

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
