import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';

const Root = () => {
  return (
    // <Provider></Provider>
    // <ThemeProvider>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    // </ThemeProvider>
  );
}

export default Root;
