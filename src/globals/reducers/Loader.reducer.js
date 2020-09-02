import {
  SHOW_LOADER,
  HIDE_LOADER,
} from '../actionTypes/LoaderActionTypes.constants';

const DEFAULT_STATE = {
  status: false,
};

const LoaderReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_LOADER:
      return {
        ...state,
        status: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        status: false,
      };

    default:
      return state;
  }
};

export default LoaderReducer;
