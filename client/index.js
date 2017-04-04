import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {
  createStore,
  applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import { saveState, loadState } from './middleware/index.js';
import routes from './routes/index.js';
import rootReducer from './reducers';

const mount = document.getElementById('app');

const persistedState = loadState();
export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk, routerMiddleware(browserHistory)));

// save the state in localStorage everytime it changes
store.subscribe( () => saveState(store.getState()));

const history = syncHistoryWithStore(browserHistory, store, { adjustUrlOnReplay: true });

render (
  <Provider store={ store }>
    <Router history={ history } routes={ routes } />
  </Provider>
  , mount
);
