import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import axios from 'axios';

const CHANGE = 'todo/CHANGE';
const FIND = 'todo/FIND';
const CREATE = 'todo/CREATE';
const UPDATE = 'todo/UPDATE';
const REMOVE = 'todo/REMOVE';

export const change = createAction(CHANGE);
export const find = createAction(FIND, () => axios.get('http://localhost:8080/todo'));
export const create = createAction(CREATE, data => axios.post('http://localhost:8080/todo', data));
export const update = createAction(UPDATE, (_id, data) => axios.put(`http://localhost:8080/todo/${_id}`, data));
export const remove = createAction(REMOVE, _id => axios.delete(`http://localhost:8080/todo/${_id}`));

const init = Map({
  list: List([])
})

export default handleActions({
  [CHANGE]: (state, action) => {
    const { key, _id } = action.payload;
    return state.update('list', list => list.map(item => {
      if(item.get('_id') === _id) return item.set('open', key);
      return item.set('open', false);
    }));
  },
  ...pender({
    type: FIND,
    onSuccess: (state, action) => {
      console.log('FIND');

      const { payload: { data } } = action;
      const newList = data.map((item) => {
        return Object.assign(item, { open: false });
      })
      return state.set('list', fromJS(newList));
    }
  }),
  ...pender({
    type: CREATE,
    onSuccess: (state, action) => {
      console.log('CREATE');

      return state;
    }
  }),
  ...pender({
    type: UPDATE,
    onSuccess: (state, action) => {
      console.log('UPDATE');
      
      return state;
    }
  }),
  ...pender({
    type: REMOVE,
    onSuccess: (state, action) => {
      console.log('REMOVE');

      return state;
    }
  }),
}, init);