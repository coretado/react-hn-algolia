import React, { Component, Fragment } from 'react';

import Search from './Search';
import QueryOptions from './QueryOptions';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Search />
        <QueryOptions />
      </Fragment>      
    );
  }
}

export default Dashboard;