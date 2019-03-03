import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import petReducer from './pet/petStore';
import { vetReducer, vetEpics } from './vet';

/* ---- REDUCERS ---- */
const rootReducer = combineReducers({ petReducer, vetReducer });

/* ---- EPICS ---- */
const rootEpic = combineEpics(...vetEpics);
export { rootReducer, rootEpic };
