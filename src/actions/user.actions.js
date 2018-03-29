import { USER_ACTION_TYPES as types } from './actionTypes';
import APIs from '../api';

const { UserApi } = APIs;
const api = new UserApi();

export const changePassword = body => (dispatch) => {
  dispatch({
    type: types.CHANGE_PASSWORD,
    payload: api.changePassword(body),
  });
};
