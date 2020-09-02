import apiRoutes from '../../configurations/network/apiRoutes';
import Api from '../../utils/Api';
import APP_STATE_ACTION_TYPES from '../actionTypes/AppStateActionTypes';

const getTestimonialAndFaq = reqPayload => {
  return async dispatch => {
    try {
      const { testimonialAndFaqApi } = apiRoutes;

      const options = {
        url: testimonialAndFaqApi,
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
        type: APP_STATE_ACTION_TYPES.FETCH_FAQ_DISCLAMER_SUCCESS,
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

export default getTestimonialAndFaq;
