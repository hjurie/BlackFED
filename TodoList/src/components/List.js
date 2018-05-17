import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Icon from 'react-icons-kit';
import { checkmark } from 'react-icons-kit/ionicons';
import styled from 'styled-components';

const List = styled.div`
  display: flex; flex-direction: column; overflow: hidden;
`;
const Item = styled.div`
  position: relative; left: 0; flex-basis: 60px; user-select: none; transition: all .2s ease-in-out;
  background-color: ${p => p.done ? '#242125' : '#312E36'};

  &.open { left: -140px; }

  & > div.point {
    position: absolute; top: 50%; left: 20px; transform: translateY(-50%); width: 12px; height: 12px; border-radius: 50%;
    background: ${p => p.done ? '#363439' : 'linear-gradient(#F48DA8, #E9465B)'};
  }
  & > div.content {
    position: absolute; top: 50%; left: 50px; transform: translateY(-40%); width: 300px; height: 60px; line-height: 60px; font-size: 1em; font-weight: 500;
    color: ${p => p.done ? '#4E494B' : '#A29B97'};
    &::before { position: absolute; top: 5px; left: 0; display: block; content: '${p => p.deadline}'; height: 20px; line-height: 20px; font-size: .65rem; font-weight: normal; }
  }
  & > div.check {
    position: absolute; top: 50%; right: 20px; transform: translateY(-50%); width: 60px; height: 30px; border-radius: 15px; cursor: pointer;
    background-color: ${p => p.done ? '#4E494B' : '#807374'};
    & > div { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  }

  & > div.btns {
    position: absolute; display: flex; top: 50%; right: -140px; transform: translateY(-50%); width: 140px; height: 60px; line-height: 60px; background: linear-gradient(135deg, #F48DA8, #E9465B); color: #FFF; text-align: center;
    div.btn { flex: 1; height: 100%; line-height: inherit; cursor: pointer; }
  }
  
  &::before { position: absolute; content: ''; top: 0; left: 25px; width: 0; height: 100%; border-left: 2px solid ${p => p.done ? '#363439' : '#3F3B40'}; }
`;

const ListComponent = (props) => {
  const { onChange, onMouseDown, onMouseMove, onModify, onRemove } = props;
  let { list } = props;
  
  
  list = list.reduce((acc, item) => {
    if (!item.isComplete) { acc.unshift(item); }
    else { acc.push(item); }
    return acc;
  }, []);

  return (
    <List>
      {
        list.map((item) => {
          let className = '';
          if(item.open) className = 'open';
          return (
            <Item key={item._id}
                className={className}
                deadline={moment(item.deadline).format('DD MMMM')}
                done={item.isComplete}
                onMouseDown={onMouseDown}
                onMouseMove={e => onMouseMove(e, item)}
                onTouchStart={onMouseDown}
                onTouchMove={e => onMouseMove(e, item)}>
              <div className="point" />
              <div className="content">{item.content}</div>
              <div className="check" onClick={() => onChange(item)}>
                { item.isComplete ? <Icon icon={checkmark} /> : null }
              </div>
              <div className="btns">
                <div className="btn" onClick={() => onModify(item._id)}>수정</div>
                <div className="btn" onClick={() => onRemove(item._id)}>삭제</div>
              </div>
            </Item>
          );
        })
      }
    </List>
  );
}

export default ListComponent;