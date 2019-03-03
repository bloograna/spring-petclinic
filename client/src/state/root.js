import { combineReducers } from 'redux';
import petReducer from './petStore';
/* ---- REDUCERS ---- */
const rootReducer = combineReducers({ petReducer });
export default rootReducer;
