import apiRoutes from '../../configurations/network/apiRoutes';
import Api from '../../utils/Api';

const calculateAndSave = data => {
  return async () => {
    const { calculateAndSaveApi } = apiRoutes;

    const options = {
      url: calculateAndSaveApi,
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
};

export default calculateAndSave;
