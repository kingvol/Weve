import { combineReducers } from 'redux';

import RootReducer from './root.reducer';
import AuthReducer from './auth.reducer';

const reducers = {
  root: RootReducer,
  auth: AuthReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

