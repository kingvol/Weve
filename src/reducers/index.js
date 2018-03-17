import { combineReducers } from 'redux';
import RootReducer from './root.reducer';

const reducers = {
  root: RootReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;

