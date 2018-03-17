import Immutable from 'seamless-immutable';
import { AUTH_ACTION_TYPES as types } from '../actions/actionTypes';

const initialState = Immutable({
  isLoading: false,
  isAuthorized: false,
  authToken: '',
  error: null,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOGIN_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case types.LOGIN_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthorized: true,
        authToken: action.payload,
      };

    case types.LOGIN_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
