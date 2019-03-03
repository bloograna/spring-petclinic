import { makeActionCreator as mac } from '../common/makeActionCreator';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { concat } from 'rxjs/observable/concat';
import initialState from '../state';
import { addMessage } from '../message/messageStore';
import petService from '../../service/pet/petService';

/* ----- TYPES ----- */
const SAVE_PET = 'pet/SAVE_PET';
const SAVE_PET_SUCCESS = 'pet/SAVE_PET_SUCCESS';
const GET_PET_TYPES = 'pet/GET_PET_TYPES';
const GET_PET_TYPES_SUCCESS = 'pet/GET_PET_TYPES_SUCCESS';
const GET_PET_BY_OWNER = 'pet/GET_PET_BY_OWNER';
const GET_PET_BY_OWNER_SUCCESS = 'pet/GET_PET_BY_OWNER_SUCCESS';
const GET_PET_BY_ID = 'pet/GET_PET_BY_ID';
const GET_PET_BY_ID_SUCCESS = 'pet/GET_PET_BY_ID_SUCCESS';

/* ----- ACTIONS ----- */
const savePet = mac(SAVE_PET, 'pet');
const savePetSuccess = mac(SAVE_PET_SUCCESS);
const getPetTypes = mac(GET_PET_TYPES);
const getPetTypesSuccess = mac(GET_PET_TYPES_SUCCESS, 'petTypes');
const getPetsByOwner = mac(GET_PET_BY_OWNER, 'ownerId');
const getPetsByOwnerSuccess = mac(GET_PET_BY_OWNER_SUCCESS, 'pets');
const getPetById = mac(GET_PET_BY_ID, 'petId');
const getPetByIdSuccess = mac(GET_PET_BY_ID_SUCCESS, 'pet');

/* ----- REDUCER ----- */
const petInitialState = initialState.pet;

// {
//   "ownerId": 1,
//   "name": "john",
//   "birthDate": "2010-09-07",
//   "type": {
//     "id": 3
//   }

// }

/* ----- REDUCER ----- */

const petReducer = (state = petInitialState, action) => {
  switch (action.type) {
    case GET_PET_TYPES_SUCCESS: {
      const { petTypes } = action;
      return { ...state, petTypes };
    }
    case GET_PET_BY_OWNER_SUCCESS: {
      const { pets } = action;
      return { ...state, pets };
    }
    default:
      return state;
  }
};

const getPetsByOwnerEpic = action$ =>
  action$.ofType(GET_PET_BY_OWNER).mergeMap(action =>
    concat(
      fromPromise(petService.getPetsbyOwnerId(action.ownerId)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while getting pets from server');
        }
        return getPetsByOwnerSuccess(result.data);
      })
    )
  );

const savePetEpic = action$ =>
  action$.ofType(SAVE_PET).mergeMap(action =>
    concat(
      fromPromise(petService.savePet(action.pet)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while saving pet');
        }
        return savePetSuccess(result.data);
      }),
      of(getPetsByOwner(action.pet.ownerId))
    )
  );

const getPetTypesEpic = action$ =>
  action$.ofType(GET_PET_TYPES).mergeMap(() =>
    concat(
      fromPromise(petService.getPetTypes()).map(result => {
        if (result.error) {
          return addMessage('An error occurred while saving pet');
        }
        return getPetTypesSuccess(result.data);
      })
    )
  );

const petEpics = [getPetsByOwnerEpic, savePetEpic, getPetTypesEpic];

export {
  petReducer as default,
  petEpics,
  savePet,
  getPetTypes,
  getPetsByOwner,
  getPetById
};
