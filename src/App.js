import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import NotFound from './components/NotFound';
import SearchView from './components/SearchView';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />

          <Switch>            
            {/* <Route path='/?query=&sort=:by&prefix&page=:pageNumber&dateRange=:searchFor&type=:search' component={SearchView} /> */}
            <Route exact path='/' component={SearchView} />            
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;