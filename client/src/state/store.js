import logger from 'redux-logger';
import multi from 'redux-multi';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './root';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(multi, logger))
  );

  return store;
}
/* eslint-enable */
