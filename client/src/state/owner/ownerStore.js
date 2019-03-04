import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { concat } from 'rxjs/observable/concat';
import { makeActionCreator as mac } from '../common/makeActionCreator';
import initialState from '../state';
import { addMessage } from '../message/messageStore';
import ownerService from '../../service/owner/ownerService';

/* ----- TYPES ----- */
// services related
const SAVE_OWNER = 'owner/SAVE_OWNER';
const SAVE_OWNER_SUCCESS = 'owner/SAVE_OWNER_SUCCESS';
const GET_OWNERS_BY_LASTNAME = 'owner/GET_OWNERS_BY_LASTNAME';
const GET_OWNERS_BY_LASTNAME_SUCCESS = 'owner/GET_OWNERS_BY_LASTNAME_SUCCESS';

// render/modal
const OPEN_ADD_MODAL = 'owner/OPEN_ADD_MODAL';
const HIDE_ADD_MODAL = 'owner/HIDE_ADD_MODAL';
const VALIDATE_MODAL_DATA = 'owner/VALIDATE_MODA_DATA';
const VALIDATE_MODAL_DATA_COMPLETED = 'owner/VALIDATE_MODA_DATA_COMPLETED';

/* ----- ACTIONS ----- */
const saveOwner = mac(SAVE_OWNER, 'owner');
const saveOwnerSuccess = mac(SAVE_OWNER_SUCCESS);
const getOwnerByLastName = mac(GET_OWNERS_BY_LASTNAME, 'lastName');
const getOwnerByLastNameSuccess = mac(GET_OWNERS_BY_LASTNAME_SUCCESS, 'owners');

const openAddOwnerModal = mac(OPEN_ADD_MODAL);
const hideAddOwnerModal = mac(HIDE_ADD_MODAL);
const validateOwnerModalData = mac(VALIDATE_MODAL_DATA);
const validateOwnerModalDataCompleted = mac(VALIDATE_MODAL_DATA_COMPLETED);

/* ----- REDUCER ----- */
const ownerInitialState = initialState.owner;

const ownerReducer = (state = ownerInitialState, action) => {
  switch (action.type) {
    case GET_OWNERS_BY_LASTNAME_SUCCESS: {
      const { owners } = action;
      return { owners };
    }
    case OPEN_ADD_MODAL: {
      return { ...state, showAddModal: true };
    }
    case HIDE_ADD_MODAL: {
      return { ...state, showAddModal: false };
    }
    case VALIDATE_MODAL_DATA: {
      return { ...state, shouldValidateModalData: true };
    }
    case VALIDATE_MODAL_DATA_COMPLETED: {
      return { ...state, showAdshouldValidateModalDatadModal: false };
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
  action$.ofType(GET_OWNERS_BY_LASTNAME).mergeMap(action =>
    fromPromise(ownerService.getOwners(getSearchRequest(action.lastName))).map(
      result => {
        if (result.error) {
          return addMessage(
            'An error occurred while getting owners from server'
          );
        }
        return getOwnerByLastNameSuccess(result.data);
      }
    )
  );

const saveOwnerEpic = action$ =>
  action$.ofType(SAVE_OWNER).mergeMap(action =>
    concat(
      fromPromise(ownerService.saveOwner(action.owner)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while saving owner');
        }
        return saveOwnerSuccess();
      }),
      of(getOwnerByLastName(action.owner.lastName))
    )
  );

const ownerEpics = [getOwnersEpic, saveOwnerEpic];

export {
  ownerReducer as default,
  ownerEpics,
  saveOwner,
  getOwnerByLastName,
  openAddOwnerModal,
  hideAddOwnerModal,
  validateOwnerModalData,
  validateOwnerModalDataCompleted
};
