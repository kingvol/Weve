import { CHAT_ACTION_TYPES as types } from './actionTypes';
import APIs from '../api';

const { ChatApi } = APIs;
const api = new ChatApi();

export const fetchRooms = rooms => (dispatch) => {
  dispatch({
    type: types.FETCH_CHAT_ROOMS,
    payload: api.fetchRooms(rooms),
  });
};
