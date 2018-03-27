import { AUTH_ACTION_TYPES as types } from './actionTypes';
import APIs from '../api';

const { AuthApi } = APIs;
const api = new AuthApi();

export const loginUser = creds => (dispatch) => {
  dispatch({
    type: types.LOGIN_USER,
    payload: api.loginUserByEmail(creds),
  });
};

export const registerUser = body => (dispatch) => {
  dispatch({
    type: types.REGISTER_USER,
    payload: api.signupUserByEmail(body),
  });
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: types.SIGNOUT_USER,
  });
};

