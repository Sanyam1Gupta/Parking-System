import CUSTOMER_ACTION_TYPES from '../actionTypes/CustomerActionTypes';

const DEFAULT_STATE = {};

const CustomerReducer = (state = DEFAULT_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case CUSTOMER_ACTION_TYPES.CUSTOMER_TYPE_SUCCESS:
      return { ...state, ...data };
    case CUSTOMER_ACTION_TYPES.CUSTOMER_TYPE_ERROR:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default CustomerReducer;
