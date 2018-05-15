import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/ionicons';
import styled from 'styled-components';

import Layout from '../styles/Layout';

import Calendar from '../components/Calendar';

const Header = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100px; padding: 20px 0 0 20px; background-color: #242125; color: #9E9793;
  & > div.icon { position: absolute; top: 10px; right: 10px; cursor: pointer; }
`;
const Input = styled.input`
  display: block; width: 90%; height: 40px; padding: 0 10px; margin: 10px auto; border: none; font-size: .85em;
`;
const Button = styled.button`
  display: block; width: 90%; height: 40px; padding: 0 10px; margin: 10px auto; border: none; font-size: 1em; background: linear-gradient(45deg, #E9465B, #F48DA8); color: #FFF; cursor: pointer;
`;

class NewTaskView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      selected: moment().format('YYYY-MM-DD'),
      content: ''
    };
  }

  handleSelected = (selected) => {
    if(moment().format('YYYY-MM-DD') > selected) { this.setState({ date: selected }) }
    else { this.setState({ selected, date: selected }) }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { selected, content } = this.state;
    console.log(selected, content);
    
  }

  handleBack = () => {
    const { history } = this.props;
    history.push('/todo');
  }

  render() {
    const { content } = this.state;
    return (
      <Layout>
        <Header>
          새로운 일정을 입력해주세요.
          <Icon className="icon" size={22} icon={close} onClick={this.handleBack} />
        </Header>
        <Calendar {...this.state} onSelected={this.handleSelected} />
        <Input type="text" name="content" value={content} onChange={this.handleChange} placeholder="일정 내용" />
        <Button onClick={this.handleSubmit}>추가하기</Button>
      </Layout>
    );
  }
};

export default NewTaskView;