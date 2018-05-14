import React, { Fragment } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  position: fixed; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0); width: 414px; height: 736px; padding-top: 100px; background-color: #242125; box-shadow: 0 3px 12px RGBA(0,0,0,.7);
`;

const LayoutComponent = (props) => {
  const { children } = props;
  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default LayoutComponent;