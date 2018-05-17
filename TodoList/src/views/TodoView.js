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
    this.state = { start : null };
  }

  componentDidMount() {
    const { TodoActions } = this.props;
    TodoActions.find();
  }

  handleChange = async (item) => {
    const { _id, open, isComplete } = item;
    if (open) return;
    const { TodoActions } = this.props;
    await TodoActions.update(_id, { isComplete: !isComplete });
    await TodoActions.find();
  }

  handleMouseDown = (e) => {
    const start = e.pageX || e.touches[0].pageX;
    
    this.setState({ start });
    
  }

  handleMouseMove = (e, item) => {
    const result = e.pageX || e.touches[0].pageX;
    const { _id, open } = item;
    const { TodoActions } = this.props;
    if(this.state.start - result > 20) {
      
      // menu open
      if (!open) TodoActions.change({ key: true, _id });
    } else if(this.state.start - result < -20) {

      // menu close
      if (open) TodoActions.change({ key: false, _id });
    }
  }

  handleModify = (_id) => {
    const { history } = this.props;
    history.push(`/write?_id=${_id}`)
  }

  handleRemove = async (_id) => {
    const { TodoActions } = this.props;
    await TodoActions.change({ key: false, _id });
    await TodoActions.remove(_id);
    await TodoActions.find();
  }

  render() {
    return (
      <Layout>
        <Header {...this.props} />
        <List {...this.props}
          onChange={this.handleChange}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onModify={this.handleModify}
          onRemove={this.handleRemove} />
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