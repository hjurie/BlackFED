import { createStore, applyMiddleware } from 'redux';
import penderMiddleware from 'redux-pender';
import ReduxThunk from 'redux-thunk';
import modules from './modules';

const configureStore = (initialState) => {
  // Reducers들과 미들웨어를 이용하여 store를 만듭니다.
  const store = createStore(modules, applyMiddleware(ReduxThunk, penderMiddleware()));
  return store;
};

export default configureStore;