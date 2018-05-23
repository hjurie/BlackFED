# Redux 적용하기

> 리액트의 초기설정은 모두 개인차가 있습니다.  저의 방법이니 참조로 부탁드립니다.


```bash
  # Npm을 이용하여 패키지 설치
  npm install redux react-redux redux-actions redux-thunk redux-pender immutable --save

  # Yarn을 이용하여 패키지 설치
  yarn add redux react-redux redux-actions redux-thunk redux-pender immutable
```


# Store 구성

### store/modules/System.js
```jsx
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import axios from 'axios';

// 액션 타입 설정
const LOADING = 'system/LOADING';
const FIND = 'system/FIND';

// 액션 생성
export const loading = createAction(LOADING);
export const find = createAction(FIND, data => axios.post('http://localhost:8080/todo', data));

// 초기값 설정
const initialState = Map({
  isLoading: false,
  data: Map({})
})

// 리듀서
export default handleActions({
  [LOADING]: (state, action) => {
    return state.set('isLoading', !state.get('isLoading'));
  },
  // 비동기 데이터를 가져올 때
  ...pender({
    type: FIND,
     // 처리 중
    onPending: (state, action) => {
      console.log('실행중');
      return state;
    },
     // 성공시 처리
    onSuccess: (state, action) => {
      const { payload: { data } } = action;
      return state.set('data', fromJS(data));
    },
     // 실패시 처리
    onFailure: (state, action) => {
      console.log('실패');
      return state;
    }
  })
}, initialState);
```

### store/modules/index.js
```jsx
import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

// 해당 폴더내부에 index.js파일을 제외한 모든 js파일의 파일명과 확장자를 리스트로 만듭니다.
const req = require.context('.', true, /^(?!.\/index).*.js$/);

const modules = {
  pender: penderReducer
};

// 키값으로 배열을 생성하고 반복합니다. ( 이때 키값은 ./System.js 과 같이 나옵니다. )
req.keys().forEach((key) => {

  // 정규식을 이용하여 moduleName (System 과 같이) 만들어줍니다.
  const regex = /.\/(.*?).js$/;
  const moduleName = regex.test(key) && key.match(regex)[1];

  // 해당 파일의 default로 내보낸 redux-actions의 handleActions를 가져와 { System: f() } 다음과 같이 만듭니다.
  modules[moduleName] = req(key).default;
});

// 상위에서 reducer부분들을 모아 놓은 modules를 combineReducers를 이용하여 내보냅니다.
export default combineReducers(modules);
```

### store/configure.js
```jsx
import { createStore, applyMiddleware } from 'redux';
import penderMiddleware from 'redux-pender';
import modules from './modules';

const configureStore = (initialState) => {
  // Reducers들과 미들웨어를 이용하여 store를 만듭니다.
  const store = createStore(modules, applyMiddleware(penderMiddleware()));
  return store;
};

export default configureStore;
```
### store/index.js
```jsx
import configureStore from './configure';
  
// 동작되는 시점은 Root에서 import store from './store' 일때 입니다.
// 모든 Reducer와 이용할 미들웨어를 정비한 store를 생성하여 반환합니다.
export default configureStore();
```

### Root.js
```jsx
import React from 'react';
import { Provider } from 'react-redux';
import Test from './components/Test';

// store를 제작하여 가져온 이후에 Provider에 추가해줍니다.
import store from './store';

const Root = (props) => {
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
};

export default Root;
```

# 각 Smart Component에서 사용하기
- 데이터를 가지고 있는 컴포넌트에 action들과 상태값을 가져와 사용합니다.
```jsx
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// export한 createAction을 한 action을 모두 가져옵니다.
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

  // 다음과 같이 props에 값이 담기면서 this.props에서 꺼내서 쓸수 있습니다. (ReadOnly이며 변경은 action을 이용하여야합니다.)
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

// 해당하는 데이터를 다음과 같이 불러옵니다. ( immutable을 이용하였기 때문에 .get 과 같이 불러오는것 입니다. )
const mapStateToProps = state => {
  return {
    isLoading: state.System.get('isLoading'),
    data: state.System.get('data').toJS(),
    isLogin: state.Auth.get('isLogin')
  }
}

// 가져온 action들을 dispatch와 연동하여 바인딩합니다. (액션실행시 dispatch 발생을 위해)
const mapDispatchToProps = dispatch => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
    SystemActions: bindActionCreators(systemActions, dispatch)
  }
}

// 위에서 생성한 state, action을 동작할 수 있게 미리 생성한 store에 연결해줍니다.
export default connect(mapStateToProps, mapDispatchToProps)(Test);
```