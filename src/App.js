import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from './components/About';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import SearchView from './components/SearchView';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Nav />

          <Switch>            
            <Route exact path='/' component={SearchView} />
            <Route path='/about' component={About} />    
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;