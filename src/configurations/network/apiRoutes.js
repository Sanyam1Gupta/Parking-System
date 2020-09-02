const apiRoutes = {
  calculateAndSaveApi: 'calculator/calculate',
  authApi: {
    generateOTPApi: 'authentication/generate-otp',
    validateOTPApi: 'authentication/validate-otp',
    loginByCustomerId: 'authentication/internet-banking-login',
  },
  checkCustomerTypeApi: 'customer/check-customer-type',
  getCustomerResultApi: 'user/get-result',
  verifyByDOBPanApi: 'customer/verify-dob-pan',
  saveCustomerDetailsApi: 'user/save-result',
  updateCustomerDetailsApi: 'user/update-result',
  testimonialAndFaqApi: 'app-feature/list-feature',
  sendEmailReportApi: 'notification/send-email',
  downloadReportApi: 'notification/send-email',
};

export default apiRoutes;
