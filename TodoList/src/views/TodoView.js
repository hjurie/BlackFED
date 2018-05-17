import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Layout from '../styles/Layout';
import Header from '../components/Header';
import List from '../components/List';

import * as todoActions from '../store/modules/Todo';

class TodoView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { TodoActions } = this.props;
    TodoActions.find();
  }

  handleChange = async (_id, flag) => {
    const { TodoActions } = this.props;
    await TodoActions.update(_id, { isComplete: flag });
    await TodoActions.find()
  }

  handleRemove = async (_id) => {
    const { TodoActions } = this.props;
    await TodoActions.remove(_id);
    await TodoActions.find()
  }

  render() {
    return (
      <Layout>
        <Header {...this.props} />
        <List {...this.props} onChange={this.handleChange} />
      </Layout>
    );
  }
};

const mapStateToProps = state => {
  return {
    list: state.Todo.get('list').toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    TodoActions: bindActionCreators(todoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoView);