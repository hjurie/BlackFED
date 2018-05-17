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