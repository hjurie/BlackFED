import React, { Component } from 'react';
import styled from 'styled-components';

import Layout from '../styles/Layout';
import Header from '../components/Header';
import List from '../components/List';

class TodoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { _id: 0, isComplete: false, content: 'test1' },
        { _id: 1, isComplete: false, content: 'test2' },
        { _id: 2, isComplete: false, content: 'test3' },
        { _id: 3, isComplete: false, content: 'test4' },
        { _id: 4, isComplete: false, content: 'test5' },
      ]
    };
  }

  handleChange = (_id, flag) => {
    this.setState(prevState => {
      return prevState.list.map((item) => {
        if(item._id === _id) item.isComplete = flag;
        return item;
      })
    });
  }

  render() {
    return (
      <Layout>
        <Header />
        <List {...this.state} onChange={this.handleChange} />
      </Layout>
    );
  }
};

export default TodoView;