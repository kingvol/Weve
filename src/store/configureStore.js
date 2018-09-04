/* eslint-disable global-require, import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers';

let middleware = [promise(), thunk];

if (__DEV__) {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({ collapsed: true });
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  blacklist: ['chat'],
  whitelist: ['ui', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const store = createStoreWithMiddleware(
  persistedReducer,
  // rootReducer,
  __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
