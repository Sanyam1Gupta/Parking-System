import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import CustomerReducer from '../../globals/reducers/Customer.reducer';
import AuthReducer from '../../globals/reducers/Auth.reducer';
import DashboardReducer from '../../globals/reducers/Dashboard.reducer';
// import EmailAndDownloadReducer from '../../globals/reducers/EmailAndDownload.reducer';
import AppStateReducer from '../../globals/reducers/AppState.reducer';
import SnackbarReducer from '../../globals/reducers/Snackbar.reducer';
import LoaderReducer from '../../globals/reducers/Loader.reducer';

const allReducer = {
  customerStore: CustomerReducer,
  authStore: AuthReducer,
  dashboardStore: DashboardReducer,
  // emailAndDownloadStore: EmailAndDownloadReducer,
  appStateStore: AppStateReducer,
  snackbarStore: SnackbarReducer,
  loaderStore: LoaderReducer,
};

const combinedReducer = history =>
  combineReducers({
    ...allReducer,
    router: connectRouter(history),
  });

export default combinedReducer;
