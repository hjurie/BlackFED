import React, { Fragment } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = styled.div`
  padding: 90px 10px 10px 10px;
`;
const Panel = styled.div`
  width: 100px; height: 50px; background-color: skyblue;
`;

const LayoutStyle = (props) => {
  const {  children } = props;
  return (
    <Layout>
      <Header />
      {children}
      <Footer />
    </Layout>
  );
};

const PanelStyle = () => {
  return(<Panel />);
}

LayoutStyle.Panel = PanelStyle;

export default LayoutStyle;