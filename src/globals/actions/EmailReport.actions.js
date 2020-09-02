import apiRoutes from '../../configurations/network/apiRoutes';
import Api from '../../utils/Api';

const getEmailReport = reqPayload => {
  const { sendEmailReportApi } = apiRoutes;
  const bodyFormData = new FormData();
  const { email, document } = reqPayload;
  bodyFormData.append('email', email);
  bodyFormData.append('document', document);

  const options = {
    url: sendEmailReportApi,
    method: 'POST',
    data: reqPayload,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const apiInstance = new Api({
    reqEncryption: 'NONE',
    resDecryption: 'NONE',
  });

  const response = apiInstance.request(options);

  return response;
};

export default getEmailReport;
