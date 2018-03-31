import Immutable from 'seamless-immutable';
import { INBOX_ACTION_TYPES as types } from '../actions/actionTypes';

const initialState = Immutable({
  pending: false,
  fulfilled: false,
  rejected: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INBOX_PENDING:
      return {
        pending: true,
        fulfilled: false,
        rejected: false,
      };

    case types.INBOX_FULFILLED:
      return {
        pending: false,
        fulfilled: true,
        rejected: false,
      };

    case types.INBOX_REJECTED:
      return {
        pending: false,
        fulfilled: false,
        rejected: true,
      };

    default:
      return state;
  }
};
