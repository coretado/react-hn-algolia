import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Dashboard />
        </div>
      </Router>      
    );
  }
}

export default App;