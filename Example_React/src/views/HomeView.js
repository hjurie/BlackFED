import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';

import Layout from '../styles/Layout';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        Home

        <Layout.Panel>aaa</Layout.Panel>
      </Layout>
    );
  }
};

export default HomeView;