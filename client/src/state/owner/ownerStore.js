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
const SAVE_OWNER = 'Owner/SAVE_OWNER';
const SAVE_OWNER_SUCCESS = 'Owner/SAVE_OWNER_SUCCESS';
const GET_OWNERS_BY_LASTNAME = 'Owner/GET_OWNERS_BY_LASTNAME';
const GET_OWNERS_BY_LASTNAME_SUCCESS = 'Owner/GET_OWNERS_BY_LASTNAME_SUCCESS';

/* ----- ACTIONS ----- */
const saveOwner = mac(SAVE_OWNER, 'owner');
const saveOwnerSuccess = mac(SAVE_OWNER_SUCCESS, 'owner');
const getOwnerByLastName = mac(GET_OWNERS_BY_LASTNAME, 'lastName');
const getOwnerByLastNameSuccess = mac(GET_OWNERS_BY_LASTNAME_SUCCESS, 'owners');

/* ----- REDUCER ----- */
const ownerInitialState = initialState.owner;

const ownerReducer = (state = ownerInitialState, action) => {
  switch (action.type) {
    case GET_OWNERS_BY_LASTNAME_SUCCESS: {
      const { owners } = action;
      return { owners };
    }
    default:
      return state;
  }
};

// /* -------- HELPERS ------- */
// const getOwnerRequestBody = owner => {
//   const { address, firstName, lastName } = owner;

//   return {
//     firstName,
//     lastName,
//     specialties: mappedSpecialties,
//     visits: []
//   };
//   //  {

//   //   "firstName": "sunny",
//   //   "lastName": "ONO",
//   //   "address": "110 W. Liberty St.",
//   //   "city": "Madison",
//   //   "telephone": "6085551023"
//   // }
// };
const getSearchRequest = lastName => {
  return { lastName };
};

/* -------- EPICS ------- */

const getOwnersEpic = action$ =>
  action$.ofType(GET_OWNERS_BY_LASTNAME).mergeMap(action =>
    concat(
      fromPromise(
        ownerService.getOwners(getSearchRequest(action.lastName))
      ).map(result => {
        if (result.error) {
          return addMessage(
            'An error occurred while getting owners from server'
          );
        }
        return getOwnerByLastNameSuccess(result.data);
      })
    )
  );

const saveOwnerEpic = action$ =>
  action$.ofType(SAVE_OWNER).mergeMap(action =>
    concat(
      fromPromise(ownerService.saveOwner(action.owner)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while saving owner');
        }
        return saveOwnerSuccess(result.data);
      }),
      of(getOwnerByLastName(action.owner.lastName))
    )
  );

const ownerEpics = [getOwnersEpic, saveOwnerEpic];

export { ownerReducer as default, ownerEpics, saveOwner, getOwnerByLastName };
