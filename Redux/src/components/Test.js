import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import styled from 'styled-components';

import * as authActions from '../store/modules/Auth';
import * as systemActions from '../store/modules/System';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = () => {
    const { SystemActions, AuthActions } = this.props;
    SystemActions.loading('!!!!');
    AuthActions.test();
  }

  handleFind = () => {
    const { SystemActions } = this.props;
    SystemActions.find();
  }

  render() {
    const { isLoading, isLogin, data } = this.props;
    return (
      <div>
        Test {isLoading ? 'true' : 'false'}
        {
          JSON.stringify(data)
        }
        {isLogin}
        <button onClick={this.handleChange}>로딩 상태 바꾸기</button>
        <button onClick={this.handleFind}>값 검색</button>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isLoading: state.System.get('isLoading'),
    data: state.System.get('data').toJS(),
    isLogin: state.Auth.get('isLogin')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
    SystemActions: bindActionCreators(systemActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);