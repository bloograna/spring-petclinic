import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { cloneDeep } from 'lodash';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { concat } from 'rxjs/observable/concat';
import { makeActionCreator as mac } from '../common/makeActionCreator';
import initialState from '../state';
import { addMessage } from '../message/messageStore';
import ownerService from '../../service/owner/ownerService';
import Msg from '../../dataModel/Msg';

/* ----- TYPES ----- */
// services related
const SAVE_OWNER = 'owner/SAVE_OWNER';
const SAVE_OWNER_SUCCESS = 'owner/SAVE_OWNER_SUCCESS';
const GET_OWNERS_BY_LASTNAME = 'owner/GET_OWNERS_BY_LASTNAME';
const GET_OWNERS_BY_LASTNAME_SUCCESS = 'owner/GET_OWNERS_BY_LASTNAME_SUCCESS';

// render/modal
const OPEN_ADD_MODAL = 'owner/OPEN_ADD_MODAL';
const CLOSE_ADD_MODAL = 'owner/CLOSE_ADD_MODAL';
const VALIDATE_MODAL_DATA = 'owner/VALIDATE_MODAL_DATA';
const VALIDATE_MODAL_DATA_COMPLETED = 'owner/VALIDATE_MODAL_DATA_COMPLETED';

// misc
const SET_ACTIVE_OWNER = 'owner/SET_ACTIVE_OWNER';
const CLEAR_ACTIVE_OWNER = 'owner/CLEAR_ACTIVE_OWNER';

/* ----- ACTIONS ----- */
const saveOwner = mac(SAVE_OWNER, 'owner');
const saveOwnerSuccess = mac(SAVE_OWNER_SUCCESS);
const getOwnerByLastName = mac(GET_OWNERS_BY_LASTNAME, 'lastName');
const getOwnerByLastNameSuccess = mac(GET_OWNERS_BY_LASTNAME_SUCCESS, 'owners');

const openAddOwnerModal = mac(OPEN_ADD_MODAL);
const closeAddOwnerModal = mac(CLOSE_ADD_MODAL);
const validateOwnerModalData = mac(VALIDATE_MODAL_DATA);
const validateOwnerModalDataCompleted = mac(VALIDATE_MODAL_DATA_COMPLETED);

const setActiveOwner = mac(SET_ACTIVE_OWNER, 'ownerId');
const clearActiveOwner = mac(CLEAR_ACTIVE_OWNER);

/* ----- REDUCER HELPER FUNCTIONS ----- */
const stitchOwnersArray = (existingOwners, newOwners) => {
  const updatedOwners = cloneDeep(existingOwners);
  newOwners.forEach(owner => updatedOwners.set(owner.id, owner));
  return updatedOwners;
};

/* ----- REDUCER ----- */
const ownerInitialState = initialState.owner;

const ownerReducer = (state = ownerInitialState, action) => {
  switch (action.type) {
    case GET_OWNERS_BY_LASTNAME_SUCCESS: {
      const { owners } = action;
      const updatedOwners = stitchOwnersArray(state.owners, owners);
      return { ...state, owners: updatedOwners, searchResults: owners };
    }
    case OPEN_ADD_MODAL: {
      return { ...state, showAddOwnerModal: true };
    }
    case CLOSE_ADD_MODAL: {
      return { ...state, showAddOwnerModal: false };
    }
    case VALIDATE_MODAL_DATA: {
      return { ...state, shouldValidateOwnerModalData: true };
    }
    case VALIDATE_MODAL_DATA_COMPLETED: {
      return { ...state, shouldValidateOwnerModalData: false };
    }
    case SET_ACTIVE_OWNER: {
      const { ownerId } = action;
      return { ...state, activeOwner: ownerId };
    }
    case CLEAR_ACTIVE_OWNER: {
      return { ...state, activeOwner: null };
    }
    default:
      return state;
  }
};

// inline wrapping gets messy.
const getSearchRequest = lastName => {
  return { lastName };
};

/* -------- EPICS ------- */

const getOwnersEpic = action$ =>
  action$.ofType(GET_OWNERS_BY_LASTNAME).flatMap(action =>
    fromPromise(ownerService.getOwners(getSearchRequest(action.lastName))).map(
      result => {
        if (result.error) {
          return addMessage(
            Msg.error('An error occurred while getting owners from server')
          );
        }
        return getOwnerByLastNameSuccess(result.data);
      }
    )
  );

// beause apparently I have issues with from promise returning more than 1 action.
const getOwnersSuccessEpic = action$ =>
  action$
    .ofType(GET_OWNERS_BY_LASTNAME_SUCCESS)
    .flatMap(() => of(addMessage(Msg.success('Retrieved owners from server'))));

const saveOwnerEpic = action$ =>
  action$.ofType(SAVE_OWNER).mergeMap(action =>
    concat(
      of(validateOwnerModalDataCompleted()),
      of(closeAddOwnerModal()),
      fromPromise(ownerService.saveOwner(action.owner)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while saving owner');
        }
        return saveOwnerSuccess();
      }),
      of(getOwnerByLastName(action.owner.lastName))
    )
  );

const ownerEpics = [getOwnersEpic, saveOwnerEpic, getOwnersSuccessEpic];

export {
  ownerReducer as default,
  ownerEpics,
  saveOwner,
  getOwnerByLastName,
  openAddOwnerModal,
  closeAddOwnerModal,
  validateOwnerModalData,
  setActiveOwner,
  clearActiveOwner
};
