import LOADER_ACTION_TYPES from '../actionTypes/LoaderActionTypes';

export const showLoader = () => {
  return {
    type: LOADER_ACTION_TYPES.SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: LOADER_ACTION_TYPES.HIDE_LOADER,
  };
};
