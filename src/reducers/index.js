import { combineReducers } from 'redux';

import RootReducer from './root.reducer';
import AuthReducer from './auth.reducer';
import UserReducer from './user.reducer';
import ChatReducer from './chat.reducer';

const reducers = {
  root: RootReducer,
  auth: AuthReducer,
  user: UserReducer,
  chat: ChatReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
