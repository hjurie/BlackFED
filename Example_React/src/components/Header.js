import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// styled-components를 이용하여 Header 생성
const Header = styled.div`
  position: fixed; top: 0; left: 0; width: 100vw; height: 70px; background-color: pink;

  /* SASS/SCSS처럼 사용이 가능합니다. */
  & > a { display: inline-block; padding: 0 20px; height: 30px; line-height: 30px; }
  & > a.active { color: red; }
`;

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Header>
        {/* 경로 이동을 위함 */}
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/todo">Todo</NavLink>
      </Header>
    );
  }
};

export default HeaderComponent;