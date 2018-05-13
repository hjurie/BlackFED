import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TodoView from '../views/TodoView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route path="/todo" component={TodoView} />
        <Redirect to="/todo" />
      </Switch>
    );
  }
};

export default App;