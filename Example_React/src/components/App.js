import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Routing을 위한 View 호출
import HomeView from '../views/HomeView';
import TodoView from '../views/TodoView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route path="/home" component={HomeView} />
        <Route path="/todo" component={TodoView} />
        {/* 상위 라우팅에 걸리지 않으면 home로 바로 가게 해줍니다. */}
        <Redirect to="/home" />
      </Switch>
    );
  }
};

export default App;