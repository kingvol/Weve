import { INBOX_ACTION_TYPES as types } from './actionTypes';

export const onPending = pending => ({
  type: types.INBOX_PENDING,
  payload: pending,
});

export const onFulfilled = fulfilled => ({
  type: types.INBOX_FULFILLED,
  payload: fulfilled,
});

export const onRejected = rejected => ({
  type: types.INBOX_REJECTED,
  payload: rejected,
});
