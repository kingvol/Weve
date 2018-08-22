import { DISPLAY_MODE_CHANGED, SHORT_LIST_CHANGED, EXHIBITION_CHANGED } from './actionTypes';

export const displayModeChanged = () => ({
  type: DISPLAY_MODE_CHANGED,
});

export const shortListChanged = () => ({
  type: SHORT_LIST_CHANGED,
});

export const exhibitionChanged = () => ({
  type: EXHIBITION_CHANGED,
});
