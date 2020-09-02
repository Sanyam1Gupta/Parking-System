import axios from 'axios';
import defaultConfig from 'configurations/network/defaultConfig';
import { store } from 'configurations/redux/store';
import {
  SAVE_TOKEN,
  PURGE_REDUX,
} from 'globals/constants/Authentication.constants';
// import { defaultUnauthenticatedRoute } from 'configurations/routing/ApplicationRouter';
import Crypto from './crypto';

class Api {
  constructor(OPTIONS = {}, CONSTANTS = '') {
    const { reqEncryption = 'AES', resDecryption = 'AES' } = OPTIONS;
    const { baseURL, timeout } = CONSTANTS || defaultConfig;

    this.requestManager = axios.create({
      baseURL,
      timeout,
    });

    this.requestManager.interceptors.request.use(
      this.requestInterceptor,
      this.requestInterceptorError,
    );
    this.requestManager.interceptors.response.use(
      this.responseInterceptor,
      this.responseInterceptorError,
    );

    this.reqEncryption = reqEncryption;
    this.resDecryption = resDecryption;
  }

  static encryptData = async (data, headers, type) => {
    if (data) {
      const dataStore = store.getState();
      const { auth } = dataStore;
      return await Crypto.encrypter(data, headers, auth, type);
    }
    return data;
  };

  static decryptData = async (data, headers, type) => {
    const dataStore = store.getState();
    const { auth } = dataStore;
    return await Crypto.decrypter(data, headers, auth, type);
  };

  static appendTokenHeaders = async headers => {
    const dataStore = store.getState();
    const { auth } = dataStore;
    const tokenHash = (auth && auth.token) || {};
    return {
      ...headers,
      ...tokenHash,
    };
  };

  static extractTokenHeaders = async headers => {
    const dataStore = store.getState();
    const { auth = {} } = dataStore;
    const { responseTokenKey = '' } = auth; // fail safe to remove once auth reducer implemented
    const token = headers[responseTokenKey];
    if (token) {
      store.dispatch({ type: SAVE_TOKEN, payload: { token } });
    }
    return headers;
  };

  requestInterceptor = async request => {
    const { data, headers } = request;
    const transformedHeaders = await Api.appendTokenHeaders(headers);
    const transformedData = await Api.encryptData(
      data,
      headers,
      this.reqEncryption,
    );

    return {
      ...request,
      headers: transformedHeaders,
      data: transformedData,
    };
  };

  requestInterceptorError = error => {
    return Promise.reject(error);
  };

  responseInterceptor = async response => {
    const { data, headers } = response;
    const transformedHeaders = await Api.extractTokenHeaders(headers);
    const transformedData = await Api.decryptData(
      data,
      headers,
      this.resDecryption,
    );

    return {
      ...response,
      headers: transformedHeaders,
      data: transformedData,
    };
  };

  responseInterceptorError = error => {
    const { response = {} } = error;
    const { status } = response;
    if (status === 401) {
      console.log('Invalid User Case');
      const { data = {} } = response;
      const { error: apiError, statusCode = '' } = data;
      console.log('%c ********** RES ', 'font-size: 26px');
      console.log(data);
      if (
        statusCode &&
        statusCode === 401 &&
        apiError &&
        apiError._isCustomError
      ) {
        return Promise.reject(error);
      } else {
        // window.location = defaultUnauthenticatedRoute;
        store.dispatch({ type: PURGE_REDUX });
      }
    } else {
      return Promise.reject(error);
    }
  };

  request = async options => {
    return this.requestManager.request(options);
  };
}

export default Api;
