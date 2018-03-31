import Immutable from 'seamless-immutable';
import { CHAT_ACTION_TYPES as types } from '../actions/actionTypes';

const initialState = Immutable({
  isLoading: false,
  error: null,
  rooms: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CHAT_ROOMS_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case types.FETCH_CHAT_ROOMS_FULFILLED:
      return {
        ...state,
        rooms: action.payload,
        isLoading: false,
      };

    case types.FETCH_CHAT_ROOMS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message || action.payload.error,
      };

    default:
      return state;
  }
};
