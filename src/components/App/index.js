import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "../About";
import Nav from "../Nav";
import NotFound from "../NotFound";
import SearchView from "../SearchView";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Nav />

          <Switch>
            <Route exact path="/" component={SearchView} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
