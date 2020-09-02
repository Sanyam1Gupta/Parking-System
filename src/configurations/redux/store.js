import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import createCompressor from 'redux-persist-transform-compress';
import createEncryptor from 'redux-persist-transform-encrypt';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import combinedReducer from './reducers';

const history = createBrowserHistory();

const persistStorage = localForage;
const isPresistanceRequired = true;
const isDev = process.env.NODE_ENV === 'development';
const isReduxLogEnable = process.env.ENABLE_REDUX_LOG === 'true' || false;
const compressor = createCompressor({});
const encryptor = createEncryptor({
  secretKey: 'ReactApp',
  onError(error) {
    // Handle the error.
    console.log('Error while encryption', error);
  },
});
const persistConfig = {
  version: 0,
  key: 'ReactApp',
  storage: persistStorage,
  blacklist: [],
  transforms: [],
};

const persistedReducer = isPresistanceRequired
  ? persistReducer(persistConfig, combinedReducer(history))
  : combinedReducer(history);

const middlewares = [
  routerMiddleware(history),
  thunk.withExtraArgument(), // Argument can be a request object used inside all calls
];

// if (isReduxLogEnable) {
middlewares.push(logger);
// }
const composeEnhancers = !isDev
  ? compose
  : composeWithDevTools({
      // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    });

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store, {}, () => {
  // This is called fater rehydraete is done.
  console.log('ReactApp store rehydrate done');
});

const purgeData = () => {
  return new Promise((resolve, reject) => {
    persistor
      .purge()
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error(false));
      });
  });
};

const flushData = () => {
  return new Promise((resolve, reject) => {
    persistor
      .flush()
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error(false));
      });
  });
};

const pausePersistance = () => {
  return new Promise((resolve, reject) => {
    persistor
      .pause()
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error(false));
      });
  });
};

const persistData = () => {
  return new Promise((resolve, reject) => {
    persistor
      .persist()
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(new Error(false));
      });
  });
};

if (isDev) {
  window.persistor = persistor;
}

export {
  store,
  persistor,
  purgeData,
  flushData,
  pausePersistance,
  persistData,
  history,
};
