import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { vetReducer, vetEpics } from './vet';
import { ownerReducer, ownerEpics } from './owner';
import { petReducer, petEpics } from './pet';
import { messageReducer } from './message';

/* ---- REDUCERS ---- */
const rootReducer = combineReducers({
  petReducer,
  vetReducer,
  ownerReducer,
  messageReducer
});

/* ---- EPICS ---- */
const rootEpic = combineEpics(...vetEpics, ...ownerEpics, ...petEpics);
export { rootReducer, rootEpic };
