import React, { Fragment } from 'react';
import styled from 'styled-components';

import Media from '../styles/Media';

const Layout = styled.div`
  position: fixed; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0); width: 414px; height: 736px; padding-top: 100px; background-color: #242125; box-shadow: 0 3px 12px RGBA(0,0,0,.7);

  ${Media.phone`
    position: reative; top: 0; left: 0; transform: translate3d(0,0,0); width: 100vw; height: 100vh;
  `}
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