import {
  DISPLAY_MODE_CHANGED,
  SHORT_LIST_CHANGED,
  COUNTRY_CODE_CHANGED,
} from '../actions/actionTypes';

const initialState = {
  grid: false,
  shortlisted: false,
  countryCode: 'gb',
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

    case COUNTRY_CODE_CHANGED:
      return {
        ...state,
        countryCode: action.payload,
      };

    default:
      return state;
  }
};
