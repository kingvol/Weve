import { DISPLAY_MODE_CHANGED, SHORT_LIST_CHANGED, COUNTRY_CODE_CHANGED } from './actionTypes';

export const displayModeChanged = () => ({
  type: DISPLAY_MODE_CHANGED,
});

export const shortListChanged = () => ({
  type: SHORT_LIST_CHANGED,
});

export const countryCodeChanged = code => ({
  type: COUNTRY_CODE_CHANGED,
  payload: code,
});
