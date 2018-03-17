/* eslint-disable global-require, import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from '../reducers';

let middleware = [promise(), thunk];

if (__DEV__) {
  const { createLogger } = require('redux-logger');

  const logger = createLogger({ collapsed: true });
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

export default configureStore = () => createStore(
  rootReducer,
  applyMiddleware(...middleware),
);
