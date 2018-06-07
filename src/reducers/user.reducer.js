import Immutable from 'seamless-immutable';
import { USER_ACTION_TYPES as types } from '../actions/actionTypes';

const initialState = Immutable({
  isLoading: false,
  error: null,
  profile: {},
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case types.CHANGE_PASSWORD_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };

    case types.CHANGE_PASSWORD_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message || action.payload.error,
      };

    case types.FETCH_USER_PROFILE_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case types.FETCH_USER_PROFILE_FULFILLED:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };

    case types.FETCH_USER_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message || action.payload.error,
      };

    case types.UPDATE_USER_PROFILE_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case types.UPDATE_USER_PROFILE_FULFILLED:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };

    case types.UPDATE_USER_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message || action.payload.error,
      };

    default:
      return state;
  }
};
