import { cloneDeep } from 'lodash';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { concat } from 'rxjs/observable/concat';
import { makeActionCreator as mac } from '../common/makeActionCreator';
import initialState from '../state';
import { addMessage } from '../message/messageStore';
import petService from '../../service/pet/petService';
import { setActiveOwner, clearActiveOwner } from '../owner/ownerStore';

/* ----- TYPES ----- */
const SAVE_PET = 'pet/SAVE_PET';
const SAVE_PET_SUCCESS = 'pet/SAVE_PET_SUCCESS';
const GET_PET_TYPES = 'pet/GET_PET_TYPES';
const GET_PET_TYPES_SUCCESS = 'pet/GET_PET_TYPES_SUCCESS';
const GET_PETS_BY_OWNER = 'pet/GET_PETS_BY_OWNER';
const GET_PETS_BY_OWNER_SUCCESS = 'pet/GET_PETS_BY_OWNER_SUCCESS';
const GET_PET_BY_ID = 'pet/GET_PET_BY_ID';
const GET_PET_BY_ID_SUCCESS = 'pet/GET_PET_BY_ID_SUCCESS';

// render/modal
const OPEN_ADD_MODAL = 'pet/OPEN_ADD_MODAL';
const CLOSE_ADD_MODAL = 'pet/CLOSE_ADD_MODAL';
const VALIDATE_MODAL_DATA = 'pet/VALIDATE_MODAL_DATA';
const VALIDATE_MODAL_DATA_COMPLETED = 'pet/VALIDATE_MODAL_DATA_COMPLETED';

// misc
const SET_ACTIVE_PET = 'pet/SET_ACTIVE_PET';
const CLEAR_ACTIVE_PET = 'pet/CLEAR_ACTIVE_PET';

/* ----- ACTIONS ----- */
const savePet = mac(SAVE_PET, 'pet');
const savePetSuccess = mac(SAVE_PET_SUCCESS);
const getPetTypes = mac(GET_PET_TYPES);
const getPetTypesSuccess = mac(GET_PET_TYPES_SUCCESS, 'petTypes');
const getPetsByOwner = mac(GET_PETS_BY_OWNER, 'ownerId');
const getPetsByOwnerSuccess = mac(GET_PETS_BY_OWNER_SUCCESS, 'pets');
const getPetById = mac(GET_PET_BY_ID, 'petId');
const getPetByIdSuccess = mac(GET_PET_BY_ID_SUCCESS, 'pet');

const openAddPetModal = mac(OPEN_ADD_MODAL, 'ownerId');
const closeAddPetModal = mac(CLOSE_ADD_MODAL);
const validatePetModalData = mac(VALIDATE_MODAL_DATA);
const validatePetModalDataCompleted = mac(VALIDATE_MODAL_DATA_COMPLETED);

const setActivePet = mac(SET_ACTIVE_PET, 'pet');
const clearActivePet = mac(CLEAR_ACTIVE_PET);

/* ----- REDUCER HELPER FUNCTIONS ----- */
const attachActiveOwnerId = (ownerId, pet) => {
  return { ...pet, ownerId, type: { id: pet.type } };
};

const stitchPetsArray = (existingPets, newPets) => {
  const updatedPets = cloneDeep(existingPets);
  newPets.forEach(pet => {
    let petByOwnerId = updatedPets[pet.ownerId];
    if (!petByOwnerId) {
      updatedPets[pet.ownerId] = {};
    }
    updatedPets[pet.ownerId][pet.id] = pet;
  });
  return updatedPets;
};

/* ----- REDUCER ----- */
const petInitialState = initialState.pet;

const petReducer = (state = petInitialState, action) => {
  switch (action.type) {
    case GET_PET_TYPES_SUCCESS: {
      const { petTypes } = action;
      return { ...state, petTypes };
    }
    case GET_PETS_BY_OWNER_SUCCESS: {
      const { pets } = action;
      const updatedPets = stitchPetsArray(state.pets, pets);
      return { ...state, pets: updatedPets, searchResults: pets };
    }
    case GET_PET_BY_ID_SUCCESS: {
      const { pet } = action;
      const { pets } = state;
      const updatedPets = stitchPetsArray(pets, [pet]);
      return { ...state, pets: updatedPets };
    }
    case OPEN_ADD_MODAL: {
      return { ...state, showAddPetModal: true };
    }
    case CLOSE_ADD_MODAL: {
      return { ...state, showAddPetModal: false, activePet: null };
    }
    case VALIDATE_MODAL_DATA: {
      return { ...state, shouldValidatePetModalData: true };
    }
    case VALIDATE_MODAL_DATA_COMPLETED: {
      return { ...state, shouldValidatePetModalData: false };
    }
    case SET_ACTIVE_PET: {
      const { pet } = action;
      return { ...state, activePet: pet };
    }
    case CLEAR_ACTIVE_PET: {
      return { ...state, activePet: null };
    }
    default:
      return state;
  }
};

const getPetsByOwnerEpic = action$ =>
  action$.ofType(GET_PETS_BY_OWNER).mergeMap(action =>
    concat(
      fromPromise(petService.getPetsbyOwnerId(action.ownerId)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while getting pets from server');
        }
        return getPetsByOwnerSuccess(result.data);
      })
    )
  );

const getPetByIdEpic = action$ =>
  action$.ofType(GET_PET_BY_ID).mergeMap(action =>
    concat(
      fromPromise(petService.getPetById(action.petId)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while getting pets from server');
        }
        return getPetByIdSuccess(result.data);
      })
    )
  );

const savePetEpic = (action$, store) =>
  action$.ofType(SAVE_PET).flatMap(action => {
    // value? wtf.
    const ownerStore = store.value.ownerReducer;
    return concat(
      of(validatePetModalDataCompleted()),
      of(closeAddPetModal()),
      fromPromise(
        petService.savePet(
          attachActiveOwnerId(ownerStore.activeOwner, action.pet)
        )
      ).map(result => {
        if (result.error) {
          return addMessage('An error occurred while saving pet');
        }
        return savePetSuccess();
      }),
      of(getPetsByOwner(ownerStore.activeOwner))
    );
  });

const getPetTypesEpic = action$ =>
  action$.ofType(GET_PET_TYPES).mergeMap(() =>
    fromPromise(petService.getPetTypes()).map(result => {
      if (result.error) {
        return addMessage('An error occurred while saving pet');
      }
      return getPetTypesSuccess(result.data);
    })
  );

const openAddModalEpic = action$ =>
  action$
    .ofType(OPEN_ADD_MODAL)
    .mergeMap(action => of(setActiveOwner(action.ownerId)));

const closeAddModalEpic = action$ =>
  action$
    .ofType(CLOSE_ADD_MODAL)
    .mergeMap(() => concat(of(clearActiveOwner()), of(clearActivePet())));

const petEpics = [
  getPetsByOwnerEpic,
  getPetByIdEpic,
  savePetEpic,
  getPetTypesEpic,
  openAddModalEpic,
  closeAddModalEpic
];

export {
  petReducer as default,
  petEpics,
  savePet,
  getPetTypes,
  getPetsByOwner,
  getPetById,
  openAddPetModal,
  closeAddPetModal,
  validatePetModalData,
  setActivePet,
  clearActivePet
};
