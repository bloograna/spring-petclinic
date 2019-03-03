// import { findIndex, isEmpty, set } from 'lodash';
import { makeActionCreator as mac } from './common/makeActionCreator';
import initialState from './state';
import createReducer from './common/createReducer';

/* ----- TYPES ----- */

// Selected Item
const SAVE_PET = 'pet/SAVE_PET';
const GET_PET_TYPES = 'pet/GET_PET_TYPES';
const GET_PET_BY_OWNER = 'pet/GET_PET_BY_OWNER';
const GET_PET_BY_ID = 'pet/GET_PET_BY_ID';

/* ----- ACTIONS ----- */
// Selected Item
const savePet = mac(SAVE_PET, 'pet');
const getPetTypes = mac(GET_PET_TYPES);
const getPetByOwner = mac(GET_PET_BY_OWNER, 'ownerId');
const getPetById = mac(GET_PET_BY_ID, 'petId');

export { savePet, getPetTypes, getPetByOwner, getPetById };

/* ----- REDUCER ----- */
const petInitialState = initialState.pet;

// const savePetData = (action, ) => {
//   const { pet } = action;

//  return {};
// };

const handlers = {
  savePet: state => [],
  getPetTypes: (state, action) => [],
  getPetByOwner: (state, action) => [],
  getPetById: (state, action) => []
};

const petReducer = createReducer(petInitialState, {
  [SAVE_PET]: handlers.savePet,
  [GET_PET_TYPES]: handlers.containsValueUpdate,
  [GET_PET_BY_OWNER]: handlers.doUpdate,
  [GET_PET_BY_ID]: handlers.expressionTypeUpdate
});

export default petReducer;
