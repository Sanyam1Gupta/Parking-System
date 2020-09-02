import apiRoutes from '../../configurations/network/apiRoutes';
import Api from '../../utils/Api';
import EMAIL_AND_DOWNLOAD_ACTION_TYPES from '../actionTypes/EmailAndDowloadActionTypes';

const getDownloadReport = reqPayload => {
  return async dispatch => {
    try {
      const { downloadReportApi } = apiRoutes;

      const options = {
        url: downloadReportApi,
        method: 'GET',
        data: reqPayload,
      };

      const apiInstance = new Api({
        reqEncryption: 'NONE',
        resDecryption: 'NONE',
      });

      const response = await apiInstance.request(options);
      const { data: mainData } = response;
      const { data } = mainData;
      const dispatchAction = {
        type: EMAIL_AND_DOWNLOAD_ACTION_TYPES.FETCH_DOWNLOAD_REPORT_SUCCESS,
        data: data[0],
      };
      dispatch(dispatchAction);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export default getDownloadReport;
