import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import pullAt from 'lodash/pullAt';
import last from 'lodash/last';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import includes from 'lodash/includes';
import now from 'lodash/now';

export const _map = (array, callback) => map(array, callback);

export const _orderBy = (collection, iteratees = [], orders = []) =>
  orderBy(collection, iteratees, orders);

export const _pullAt = (array, arrayOfIndex) => pullAt(array, arrayOfIndex);

export const _last = array => last(array);

export const _isEmpty = value => isEmpty(value);

export const _isString = value => isString(value);

export const _includes = (collection, value, fromIndex = 0) =>
  includes(collection, value, fromIndex);

export const _now = () => now();
