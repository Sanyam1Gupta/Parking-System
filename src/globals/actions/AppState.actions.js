import APP_STATE_ACTION_TYPES from '../actionTypes/AppStateActionTypes';

const setFormState = data => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.SET_FORM,
      data,
    };
    dispatch(dispatchAction);
  };
};

const resetFormState = () => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.RESET_FORM,
    };
    dispatch(dispatchAction);
  };
};

const setUpdateDeviceWidthHeight = data => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.UPDATE_DEVICE_WIDTH_HEIGHT,
      data,
    };
    dispatch(dispatchAction);
  };
};

const fetchPreviousCalculatedResult = () => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.FETCH_PREVIOUS_RESULT,
    };
    dispatch(dispatchAction);
  };
};

const resetPreviousCalculatedResult = () => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.RESET_FETCH_PREVIOUS_RESULT,
    };
    dispatch(dispatchAction);
  };
};

const setOtpResponse = payload => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.SET_OTP_RESPONSE,
      data: payload,
    };
    dispatch(dispatchAction);
  };
};

const resetOtpResponse = () => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.RESET_OTP_RESPONSE,
    };
    dispatch(dispatchAction);
  };
};

const updateOtpRetryLimit = () => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.UPDATE_OTP_RETRY_LIMIT,
    };
    dispatch(dispatchAction);
  };
};

const resetOtpRetryLimit = () => {
  return dispatch => {
    const dispatchAction = {
      type: APP_STATE_ACTION_TYPES.RESET_OTP_RETRY_LIMIT,
    };
    dispatch(dispatchAction);
  };
};

export {
  setFormState,
  resetFormState,
  setUpdateDeviceWidthHeight,
  fetchPreviousCalculatedResult,
  resetPreviousCalculatedResult,
  setOtpResponse,
  resetOtpResponse,
  updateOtpRetryLimit,
  resetOtpRetryLimit,
};
