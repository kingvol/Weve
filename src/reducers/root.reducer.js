import Immutable from 'seamless-immutable';
import { ROOT_ACTION_TYPES as types } from '../actions/actionTypes';

const initialState = Immutable({
  root: undefined, // 'auth' or 'post-auth',
  appTitle: 'wevedo',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return state.merge({
        root: action.root,
      });

    default:
      return state;
  }
};
