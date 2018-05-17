import configureStore from './configure';
  
// 동작되는 시점은 Root에서 import store from './store' 일때 입니다.
// 모든 Reducer와 이용할 미들웨어를 정비한 store를 생성하여 반환합니다.
export default configureStore();