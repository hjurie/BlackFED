import React, { Fragment } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Header = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100px; padding: 20px 0 0 20px; background-color: #242125;
`;
const Date = styled.div`
  color: #A29B97; font-size: 1.4em;
`;
const Total = styled.div`
  color: #EEE; font-size: .75em; font-family: 'Roboto';
`;
const AddBtn = styled.div`
  position: absolute; top: 50%; right: 20px; transform: translateY(-50%); width: 45px; height: 45px; line-height: 50px; border-radius: 50%; color: #FFF; background: linear-gradient(#F48DA8, #E9465B); box-shadow: 3px 3px 8px RGBA(0,0,0,.8);
  font-size: 1.6em; text-align: center; cursor: pointer;
`;
const Progress = styled.div`
  position: absolute; bottom: 0; left: 0; width: 100%; height: 10px; background-color: #000; overflow: hidden;
  & > div.bar { float: left; width: 25%; height: 8px; margin: 1px 0; background: linear-gradient(45deg, #E9465B, #F48DA8); }
  & > div.status { float: left; padding: 0 5px; color: #FFF; font-size: .1em; }
`;

const HeaderComponent = (props) => {
  return (
    <Header>
      <Date>{moment().format('DD MMMM')}</Date>
      <Total>{8} OPEN TASKS</Total>
      <AddBtn>+</AddBtn>
      <Progress>
        <div className="bar" />
        <div className="status">25%</div>
      </Progress>
    </Header>
  );
};

export default HeaderComponent;