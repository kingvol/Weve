import { DISPLAY_MODE_CHANGED } from '../actions/actionTypes';

const initialState = {
  grid: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_MODE_CHANGED:
      return {
        ...state,
        grid: !state.grid,
      };

    default:
      return state;
  }
};
