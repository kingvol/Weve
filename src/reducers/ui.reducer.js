import {
  DISPLAY_MODE_CHANGED,
  SHORT_LIST_CHANGED,
  EXHIBITION_CHANGED,
} from '../actions/actionTypes';

const initialState = {
  grid: false,
  shortlisted: false,
  exhibition: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_MODE_CHANGED:
      return {
        ...state,
        grid: !state.grid,
      };

    case SHORT_LIST_CHANGED:
      return {
        ...state,
        shortlisted: !state.shortlisted,
      };

    case EXHIBITION_CHANGED:
      return {
        ...state,
        exhibition: !state.exhibition,
      };

    default:
      return state;
  }
};
