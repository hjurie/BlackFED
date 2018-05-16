import React from 'react';
import { Provider } from 'react-redux';
import Test from './components/Test';

import store from './store';

const Root = (props) => {
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
};

export default Root;