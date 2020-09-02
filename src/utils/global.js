import { SOME_THING_WENT_WRONG } from '../globals/constants/ErrorMessage.constants';

const getCurrencyFormat = (num, options = {}) => {
  let styleOptions = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  };
  if (options && Object.keys(options).length > 0) {
    styleOptions = { styleOptions, ...options };
  }
  if (!Number.isNaN(Number(num))) {
    return new Intl.NumberFormat('en-IN', styleOptions).format(num);
  }
  return num;
};

const getMaskedCardNumber = numberString => {
  const maskedString = numberString
    .substring(0, 2)
    .concat('XXXXX')
    .concat(numberString.substring(7, 10));
  return maskedString;
};

const generateFormData = data => {
  let formData = [];
  Object.keys(data).forEach(key => {
    const d = `${key}=${data[key]}`;
    formData.push(d);
  });
  formData = formData.join('&');
  return formData;
};

const isDesktop = data => {
  const { appStateStore } = data;
  const { deviceInfo = {} } = appStateStore;
  const { deviceWidth } = deviceInfo;
  return deviceWidth && Number(deviceWidth) >= 900;
};

const convertToNumericValues = payload => {
  const result = { ...payload };
  const keysToConvert = [
    'monthlyIncome',
    'monthlyExpense',
    'existingEMI',
    'existingSavings',
  ];
  keysToConvert.forEach(key => {
    if (
      payload &&
      Object.prototype.hasOwnProperty.call(payload.financialData, key)
    ) {
      result.financialData[key] = parseFloat(payload.financialData[key]);
    }
  });
  return result;
};

const validateMobileNumber = (value, options = {}) => {
  const { isEmptyValid = true } = options;
  let isValid = true;
  if (value && value.length > 0) {
    const validMobilePattern = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/g;
    isValid = validMobilePattern.test(value);
  }
  if (isEmptyValid) {
    if (value.length === 0) {
      isValid = true;
    }
  } else {
    isValid = false;
  }
  return isValid;
};

const validateEmailId = (value, options = {}) => {
  const { isEmptyValid = true } = options;
  let isValid = true;
  if (value && value.length > 0) {
    // const validEmailPattern = /(?:[a-z0-9_]+(?:\.[a-z0-9_]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const validEmailPattern = /^(([a-zA-Z0-9_]+(\.[^._]+)*)|("."))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    isValid = validEmailPattern.test(value);
  }
  if (isEmptyValid) {
    if (value.length === 0) {
      isValid = true;
    }
  } else {
    isValid = false;
  }
  return isValid;
};

// NOTE: this message extractor is only for those error which fall under catch block
const extractErrorMessageFromApiResponse = errResponse => {
  const {
    message: jsErrorMessage = SOME_THING_WENT_WRONG,
    response = {},
  } = errResponse;
  const { data = {} } = response;
  const altMessage =
    jsErrorMessage.indexOf('timeout') > -1
      ? `${SOME_THING_WENT_WRONG} Please Try Again.`
      : jsErrorMessage;
  const { message = altMessage } = data;

  return message;
};

export {
  getCurrencyFormat,
  getMaskedCardNumber,
  generateFormData,
  isDesktop,
  convertToNumericValues,
  validateMobileNumber,
  validateEmailId,
  extractErrorMessageFromApiResponse,
};
