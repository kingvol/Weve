import { combineReducers } from 'redux';

import RootReducer from './root.reducer';
import AuthReducer from './auth.reducer';
import UserReducer from './user.reducer';

const reducers = {
  root: RootReducer,
  auth: AuthReducer,
  user: UserReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

