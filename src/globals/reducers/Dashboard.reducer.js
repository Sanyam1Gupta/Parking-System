import DASHBOARD_ACTION_TYPES from '../actionTypes/DashboardActionTypes';

const DEFAULT_STATE = {
  isResultAvail: false,
  calculatedResult: {},
};

const DashboardReducer = (state = DEFAULT_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case DASHBOARD_ACTION_TYPES.DASHBOARD_RESULT_SUCCESS:
      return { ...state, ...data, isResultAvail: true };
    case DASHBOARD_ACTION_TYPES.DASHBOARD_RESULT_FAILURE:
    case DASHBOARD_ACTION_TYPES.RESET_DASHBOARD_RESULT:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default DashboardReducer;
