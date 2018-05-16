import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import axios from 'axios';

const LOADING = 'system/LOADING';
const FIND = 'system/FIND';

export const loading = createAction(LOADING);
export const find = createAction(FIND, data => axios.post('http://localhost:8080/todo', data));

const init = Map({
  isLoading: false,
  data: Map({})
})

export default handleActions({
  [LOADING]: (state, action) => {
    return state.set('isLoading', !state.get('isLoading'));
  },
  ...pender({
    type: FIND,
    onSuccess: (state, action) => {
      const { payload: { data } } = action;
      return state.set('data', fromJS(data));
    }
  })
}, init);