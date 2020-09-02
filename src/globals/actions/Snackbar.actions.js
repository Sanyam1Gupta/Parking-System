import SNACKBAR_ACTION_TYPES from '../actionTypes/SnackbarActionTypes';

export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;
  return {
    type: SNACKBAR_ACTION_TYPES.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = (key = '') => ({
  type: SNACKBAR_ACTION_TYPES.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = key => ({
  type: SNACKBAR_ACTION_TYPES.REMOVE_SNACKBAR,
  key,
});
