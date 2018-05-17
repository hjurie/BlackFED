import React, { Component, Fragment } from 'react';
import Icon from 'react-icons-kit';
import { checkmark } from 'react-icons-kit/ionicons';
import styled from 'styled-components';

const List = styled.div`
  display: flex; flex-direction: column;
`;
const Item = styled.div`
  position: relative; flex-basis: 60px; user-select: none;
  background-color: ${p => p.done ? '#242125' : '#312E36'};

  & > div.point {
    position: absolute; top: 50%; left: 20px; transform: translateY(-50%); width: 12px; height: 12px; border-radius: 50%;
    background: ${p => p.done ? '#363439' : 'linear-gradient(#F48DA8, #E9465B)'};
  }
  & > div.content {
    position: absolute; top: 50%; left: 50px; transform: translateY(-40%); width: 300px; height: 60px; line-height: 60px; font-size: 1em; font-weight: 500;
    color: ${p => p.done ? '#4E494B' : '#A29B97'};
    &::before { position: absolute; top: 5px; left: 0; display: block; content: '14 May'; height: 20px; line-height: 20px; font-size: .65rem; font-weight: normal; }
  }
  & > div.check {
    position: absolute; top: 50%; right: 20px; transform: translateY(-50%); width: 60px; height: 30px; border-radius: 15px; cursor: pointer;
    background-color: ${p => p.done ? '#4E494B' : '#807374'};
    & > div { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  }
  
  &::before { position: absolute; content: ''; top: 0; left: 25px; width: 0; height: 100%; border-left: 2px solid ${p => p.done ? '#363439' : '#3F3B40'}; }
`;

const ListComponent = (props) => {
  const { onChange } = props;
  let { list } = props;
  
  
  list = list.reduce((acc, item) => {
    if (!item.isComplete) { acc.unshift(item); }
    else { acc.push(item); }
    return acc;
  }, []);
  
  return (
    <List>
      {
        list.map((item, index) => (
          <Item key={item._id} done={item.isComplete}>
            <div className="point" />
            <div className="content">{item.content}</div>
            <div className="check" onClick={() => onChange(item._id, !item.isComplete)}>
              { item.isComplete ? <Icon icon={checkmark} /> : null }
            </div>
          </Item>
        ))
      }
    </List>
  );
}

export default ListComponent;