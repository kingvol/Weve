import { ROOT_ACTION_TYPES as types } from './actionTypes';

export const changeAppRoot = root => ({
  type: types.ROOT_CHANGED,
  root,
});
