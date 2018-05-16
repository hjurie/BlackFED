import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import axios from 'axios';

// 액션 타입을 만들기
const TEST = 'system/TEST';

export const test = createAction(TEST);

const init = Map({
  isLogin: '로그인이 되었습니다.'
})

export default handleActions({
  [TEST]: (state, action) => {
    return state.set('isLogin', '하하하하하하하');
  }
}, init);