import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic, rootReducer } from './root';

function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers = composeWithDevTools({
    latency: 0,
    maxAge: 10
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);

  // FOR DEBUGGING ONLY
  window.store = {
    getState: store.getState
  };
  return store;
}
const store = configureStore();
export default store;
