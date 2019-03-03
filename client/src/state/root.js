import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import petReducer from './pet/petStore';
import { vetReducer, vetEpics } from './vet';
import { messageReducer } from './message';

/* ---- REDUCERS ---- */
const rootReducer = combineReducers({ petReducer, vetReducer, messageReducer });

/* ---- EPICS ---- */
const rootEpic = combineEpics(...vetEpics);
export { rootReducer, rootEpic };
