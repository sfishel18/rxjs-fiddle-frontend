import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './redux/containers/AppContainer';
import createStore from './redux/create-store';
import services from './redux/services';

const store = createStore(undefined, services);

ReactDom.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);
