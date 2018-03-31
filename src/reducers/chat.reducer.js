import { combineReducers } from 'redux';
import { merge, keyBy } from 'lodash';
import { CHAT_ACTION_TYPES as types } from '../actionsTypes';

const roomsReducer = (state = {}, action) => {
  const reducer = {
    [types.CREATE_ROOM]: ({ payload }) => merge(state, payload),
    [types.START_FETCHING_MESSAGES]: () =>
      merge(state, {
        meta: { isFetching: true },
      }),
    [types.RECEIVED_MESSAGES]: ({ roomId, messages, canLoadMore, lastKnownKey, messagesCount }) =>
      merge(keyBy(state, 'id'), {
        [roomId]: {
          messages,
          meta: {
            isFetching: false,
            canLoadMore: canLoadMore || null,
            lastKnownKey: lastKnownKey || null,
            messagesCount,
          },
        },
      }),
    [types.ADD_MESSAGE]: ({ message }) =>
      merge(state, {
        [action.roomId]: {
          messages: { [message.id]: message },
        },
      }),
    [types.ROOMS_RECEIVED]: ({ payload }) => merge(keyBy(state, 'id'), payload),
    [types.CLEAR_CHATS]: () => ({}),
  }[action.type];

  return reducer ? reducer(action) : state;
};

const metaReducer = (
  state = {
    currentRoom: null,
  },
  action,
) => {
  const reducer = {
    [types.SET_ROOM]: ({ roomId }) => merge(state, { currentRoom: roomId }),
  }[action.type];

  return reducer ? reducer(action) : state;
};

const ChatReducer = combineReducers({
  rooms: roomsReducer,
  meta: metaReducer,
});

export default ChatReducer;
