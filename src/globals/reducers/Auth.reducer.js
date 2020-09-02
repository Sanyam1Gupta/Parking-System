import AUTH_ACTION_TYPES from '../actionTypes/AuthActionTypes';
import AuthHelper from '../../utils/AuthHelper';

const DEFAULT_STATE = {};

const AuthReducer = (state = DEFAULT_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case AUTH_ACTION_TYPES.LOGIN_BY_CUST_ID_SUCCESS:
    case AUTH_ACTION_TYPES.REG_AND_LOGIN_BY_MOBILE_SUCCESS:
    case 'SAVE_CUSTOMER_DATA_NTB':
    case AUTH_ACTION_TYPES.LOGIN_BY_MOBILE_PAN_DOB_SUCCESS: {
      const authData = { ...data.customerData };
      if (authData && !authData?.customerData?.customerId) {
        if (data?.customerId) {
          console.log(authData && !!authData?.customerData, data);
          if (authData) {
            authData.customerId = data.customerId;
            data.customerData.customerId = data.customerId;
          }
        }
      }
      AuthHelper.register(authData);
      return { ...state, ...data };
    }
    // NOTE: below are OTP related data
    case AUTH_ACTION_TYPES.SET_LOGIN_BY_METHOD:
      return { ...state, loginByMethod: data };
    case AUTH_ACTION_TYPES.RESET_LOGIN_BY_METHOD:
      return { ...state, loginByMethod: {} };
    case AUTH_ACTION_TYPES.LOGOUT:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default AuthReducer;
