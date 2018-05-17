import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Icon from 'react-icons-kit';
import { close } from 'react-icons-kit/ionicons';
import styled from 'styled-components';

import Layout from '../styles/Layout';

import Calendar from '../components/Calendar';

import * as todoActions from '../store/modules/Todo';

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
      _id: null,
      date: moment().format('YYYY-MM-DD'),
      deadline: moment().format('YYYY-MM-DD'),
      content: ''
    };
  }

  async componentDidMount() {
    const { history: { location: { search } }, TodoActions } = this.props;
    await TodoActions.find();
    const { list } = this.props;
    if(search) {
      const _id = search.replace('?_id=', '');
      const data = list.filter(item => item._id === _id);

      const { deadline, content } = data[0];
      this.setState({ _id, deadline: moment(deadline).format('YYYY-MM-DD'), content });
    }
  }

  handleSelected = (deadline) => {
    if(moment().format('YYYY-MM-DD') > deadline) { this.setState({ date: deadline }) }
    else { this.setState({ deadline, date: deadline }) }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = async () => {
    const { TodoActions, history } = this.props;
    const { _id, deadline, content } = this.state;

    if(_id) {
      await TodoActions.update(_id, { deadline, content });
    } else {
      await TodoActions.create({ deadline, content });
    }
    
    await TodoActions.find();
    history.push('/todo');
  }

  handleBack = () => {
    const { history } = this.props;
    history.push('/todo');
  }

  render() {
    const { _id, content } = this.state;
    return (
      <Layout>
        <Header>
          새로운 일정을 입력해주세요.
          <Icon className="icon" size={22} icon={close} onClick={this.handleBack} />
        </Header>
        <Calendar {...this.state} onSelected={this.handleSelected} />
        <Input type="text" name="content" value={content} onChange={this.handleChange} placeholder="일정 내용" />
        <Button onClick={this.handleSubmit}>{_id ? '수정하기' : '추가하기'}</Button>
      </Layout>
    );
  }
};

const mapStateToProps = state => {
  return {
    list: state.Todo.get('list').toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    TodoActions: bindActionCreators(todoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskView);