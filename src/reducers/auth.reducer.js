import Immutable from 'seamless-immutable';
import { AUTH_ACTION_TYPES as types } from '../actions/actionTypes';

const initialState = Immutable({
  isLoading: false,
  isAuthorized: false,
  accessToken: '',
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
      console.warn('fulfulled');
      return {
        ...state,
        isLoading: false,
        isAuthorized: true,
        accessToken: action.payload,
      };

    case types.LOGIN_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message || action.payload.error,
      };

    default:
      return state;
  }
};
