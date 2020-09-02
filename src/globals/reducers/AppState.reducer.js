import APP_STATE_ACTION_TYPESS from '../actionTypes/AppStateActionTypes';

const DEFAULT_STATE = {
  calculatorForm: {},
  fetchPreviousResult: false,
  faqDisclaimer: {},
  tempOtpResponse: {},
  deviceInfo: {
    deviceWidth: window.outerWidth,
    deviceHeight: window.outerHeight,
  },
  sentOtpCount: 0,
};

const AppStateReducer = (state = DEFAULT_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case APP_STATE_ACTION_TYPESS.SET_FORM:
      return { ...state, calculatorForm: data };
    case APP_STATE_ACTION_TYPESS.RESET_FORM:
      return { ...state, calculatorForm: {} };
    case APP_STATE_ACTION_TYPESS.FETCH_PREVIOUS_RESULT:
      return { ...state, fetchPreviousResult: true };
    case APP_STATE_ACTION_TYPESS.RESET_FETCH_PREVIOUS_RESULT:
      return { ...state, fetchPreviousResult: true };
    case APP_STATE_ACTION_TYPESS.UPDATE_DEVICE_WIDTH_HEIGHT:
      return { ...state, deviceInfo: data };
    case APP_STATE_ACTION_TYPESS.FETCH_FAQ_DISCLAMER_SUCCESS:
      return { ...state, faqDisclaimer: data };
    case APP_STATE_ACTION_TYPESS.SET_OTP_RESPONSE:
      return { ...state, tempOtpResponse: data };
    case APP_STATE_ACTION_TYPESS.RESET_OTP_RESPONSE:
      return { ...state, tempOtpResponse: {} };
    case APP_STATE_ACTION_TYPESS.UPDATE_OTP_RETRY_LIMIT:
      return { ...state, sentOtpCount: state.sentOtpCount + 1 };
    case APP_STATE_ACTION_TYPESS.RESET_OTP_RETRY_LIMIT:
      return { ...state, sentOtpCount: 0 };
    default:
      return state;
  }
};

export default AppStateReducer;
