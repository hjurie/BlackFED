import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TodoView from '../views/TodoView';
import NewTaskView from '../views/NewTaskView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route path="/todo" component={TodoView} />
        <Route path="/new_task" component={NewTaskView} />
        <Redirect to="/todo" />
      </Switch>
    );
  }
};

export default App;