import { makeActionCreator as mac } from '../common/makeActionCreator';
import createReducer from '../common/createReducer';
import initialState from '../state';

/* ----- TYPES ----- */
const SAVE_PET = 'pet/SAVE_PET';
const GET_PET_TYPES = 'pet/GET_PET_TYPES';
const GET_PET_BY_OWNER = 'pet/GET_PET_BY_OWNER';
const GET_PET_BY_ID = 'pet/GET_PET_BY_ID';

/* ----- ACTIONS ----- */
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
  savePet: (state, action) => [],
  getPetTypes: (state, action) => [],
  getPetByOwner: (state, action) => [],
  getPetById: (state, action) => []
};

const petReducer = createReducer(petInitialState, {
  [SAVE_PET]: handlers.savePet,
  [GET_PET_TYPES]: handlers.getPetTypes,
  [GET_PET_BY_OWNER]: handlers.getPetByOwner,
  [GET_PET_BY_ID]: handlers.getPetById
});

export default petReducer;
