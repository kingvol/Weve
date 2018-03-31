import { combineReducers } from 'redux';

import RootReducer from './root.reducer';
import AuthReducer from './auth.reducer';
import UserReducer from './user.reducer';
import InboxReducer from './inbox.reducer';

const reducers = {
  root: RootReducer,
  auth: AuthReducer,
  user: UserReducer,
  inbox: InboxReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
