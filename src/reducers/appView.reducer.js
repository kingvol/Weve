import Immutable from 'seamless-immutable';
import { GRID_CHANGED } from '../actions/actionTypes';

const initialState = Immutable({
  grid: false,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GRID_CHANGED:
      return {
        ...state,
        grid: !state.grid,
      };

    default:
      return state;
  }
};
