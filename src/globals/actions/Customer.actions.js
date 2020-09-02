import apiRoutes from '../../configurations/network/apiRoutes';
import Api from '../../utils/Api';
import CUSTOMER_ACTION_TYPES from '../actionTypes/CustomerActionTypes';
import AUTH_ACTION_TYPES from '../actionTypes/AuthActionTypes';

const getCustomerResultAction = data => {
  const { getCustomerResultApi } = apiRoutes;

  const options = {
    url: getCustomerResultApi,
    method: 'POST',
    data,
  };
  const apiInstance = new Api({
    reqEncryption: 'NONE',
    resDecryption: 'NONE',
  });
  const response = apiInstance.request(options);

  return response;
};

const checkCustomerTypeAction = payload => {
  return async dispatch => {
    try {
      const { checkCustomerTypeApi } = apiRoutes;
      const options = {
        url: checkCustomerTypeApi,
        method: 'POST',
        data: payload,
      };
      const apiInstance = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });
      const response = await apiInstance.request(options);
      const { data: mainData } = response;

      const { data } = mainData;
      const dispatchAction = {
        type: CUSTOMER_ACTION_TYPES.CUSTOMER_TYPE_SUCCESS,
        data,
      };
      dispatch(dispatchAction);
      return response;
    } catch (error) {
      const dispatchAction = {
        type: CUSTOMER_ACTION_TYPES.CUSTOMER_TYPE_ERROR,
        data: error,
      };
      dispatch(dispatchAction);
      throw error;
    }
  };
};

const saveCustomerDetailsAction = reqPayload => {
  return async dispatch => {
    try {
      const { updateCustomerDetailsApi } = apiRoutes;

      const options = {
        url: updateCustomerDetailsApi,
        method: 'PATCH',
        data: reqPayload,
      };
      const apiInstance = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });
      const response = await apiInstance.request(options);
      const { data: mainData } = response;
      const { data } = mainData;
      const customerDataToStore = {
        customerData: {
          customerId: '',
          mobileNo: reqPayload.mobileNumber,
          isReturning: false,
          isNTB: true,
          fullName: reqPayload.fullName,
        },
      };
      const dispatchAction = {
        type: AUTH_ACTION_TYPES.REG_AND_LOGIN_BY_MOBILE_SUCCESS,
        data: customerDataToStore,
      };
      dispatch(dispatchAction);
      return response;
    } catch (error) {
      const dispatchAction = {
        type: 'NO_DATA',
        data: error,
      };
      dispatch(dispatchAction);
      throw error;
    }
  };
};

const updateCustomerDetailsAction = data => {
  const { updateCustomerDetailsApi } = apiRoutes;

  const options = {
    url: updateCustomerDetailsApi,
    method: 'PATCH',
    data,
  };
  const apiInstance = new Api({
    reqEncryption: 'NONE',
    resDecryption: 'NONE',
  });
  const response = apiInstance.request(options);

  return response;
};

const resetTempCustomerData = () => {
  return dispatch => {
    const dispatchAction = {
      type: CUSTOMER_ACTION_TYPES.CUSTOMER_TYPE_ERROR,
    };
    dispatch(dispatchAction);
  };
};

const saveCustomerDataNTB = data => {
  return dispatch => {
    const dispatchAction = {
      type: 'SAVE_CUSTOMER_DATA_NTB',
      data,
    };
    dispatch(dispatchAction);
  };
};

export {
  getCustomerResultAction,
  checkCustomerTypeAction,
  saveCustomerDetailsAction,
  updateCustomerDetailsAction,
  resetTempCustomerData,
  saveCustomerDataNTB,
};
