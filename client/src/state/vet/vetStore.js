import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { capitalize } from 'lodash';
import { concat } from 'rxjs/observable/concat';
import { makeActionCreator as mac } from '../common/makeActionCreator';
import initialState from '../state';
import { addMessage } from '../message/messageStore';
import vetService from '../../service/vet/vetService';

/* ----- TYPES ----- */
const SAVE_VET = 'vet/SAVE_VET';
const SAVE_VET_SUCCESS = 'vet/SAVE_VET_SUCCESS';
const GET_VET_SPECIALTIES = 'vet/GET_VET_SPECIALTIES';
const GET_VET_SPECIALTIES_SUCCESS = 'vet/GET_VET_SPECIALTIES_SUCCESS';
const GET_VETS = 'vet/GET_VETS';
const GET_VETS_SUCCESS = 'vet/GET_VETS_SUCCESS';
const GET_VET_BY_ID = 'vet/GET_VET_BY_ID';
const GET_VET_BY_ID_SUCCESS = 'vet/GET_VET_BY_ID_SUCCESS';

/* ----- ACTIONS ----- */
const saveVet = mac(SAVE_VET, 'vet');
const saveVetSuccess = mac(SAVE_VET_SUCCESS, 'vet');
const getVetSpecialties = mac(GET_VET_SPECIALTIES);
const getVetSpecialtiesSuccess = mac(
  GET_VET_SPECIALTIES_SUCCESS,
  'specialties'
);
const getVets = mac(GET_VETS);
const getVetsSuccess = mac(GET_VETS_SUCCESS, 'vets');
const getVetById = mac(GET_VET_BY_ID, 'vetId');
const getVetByIdSuccess = mac(GET_VET_BY_ID_SUCCESS, 'vetId');

/* ----- REDUCER ----- */
const vetInitialState = initialState.vet;

const vetReducer = (state = vetInitialState, action) => {
  switch (action.type) {
    case GET_VETS_SUCCESS: {
      const { vets } = action;
      return { ...state, vets: vets };
    }
    case GET_VET_SPECIALTIES_SUCCESS: {
      const { specialties } = action;
      return { ...state, specialties: specialties };
    }
    // case START_SEARCHING: {
    //   return { ...state, done: false };
    // }
    default:
      return state;
  }
};

/* -------- EPICS ------- */

const getVetsEpic = action$ =>
  action$.ofType(GET_VETS).mergeMap(() =>
    concat(
      fromPromise(vetService.getVets()).map(result => {
        if (result.error) {
          return addMessage('An error occurred while getting vets from server');
        }
        return getVetsSuccess(result.data);
      })
    )
  );

const getSpecialtiesEpic = action$ =>
  action$.ofType(GET_VET_SPECIALTIES).mergeMap(() =>
    concat(
      fromPromise(vetService.getVetSpecialties()).map(result => {
        if (result.error) {
          return addMessage(
            'An error occured while getting vet specialities from server'
          );
        }
        return getVetSpecialtiesSuccess(
          result.data.map(specialty => capitalize(specialty.name))
        );
      })
    )
  );

const vetEpics = [getVetsEpic, getSpecialtiesEpic];

export {
  vetReducer as default,
  vetEpics,
  saveVet,
  getVetSpecialties,
  getVets,
  getVetById
};
