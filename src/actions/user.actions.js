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

export const fetchProfile = _id => (dispatch) => {
  dispatch({
    type: types.FETCH_USER_PROFILE,
    payload: api.fetchProfile(_id),
  });
};

export const updateProfile = body => (dispatch) => {
  dispatch({
    type: types.UPDATE_USER_PROFILE,
    payload: api.updateProfile(body),
  });
};
