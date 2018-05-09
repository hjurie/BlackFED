import React, { Fragment } from 'react';
import styled from 'styled-components';

// styled-components를 이용하여 Footer 생성
const Footer = styled.div`
  position: fixed; bottom: 0; left: 0; width: 100vw; height: 120px; background-color: #24272E; color: #FFF;
`;

const FooterComponent = (props) => {
  return (
    <Footer>
      Footer
    </Footer>
  );
};

export default FooterComponent;