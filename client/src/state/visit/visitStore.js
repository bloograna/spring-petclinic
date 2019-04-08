import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { cloneDeep, isEmpty } from 'lodash';
import isDate from 'date-fns/isDate';
import isAfter from 'date-fns/isAfter';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { concat } from 'rxjs/observable/concat';
import { makeActionCreator as mac } from '../common/makeActionCreator';
import initialState from '../state';
import { addMessage } from '../message';
import { getPetById } from '../pet';
import { clearActiveOwner } from '../owner';
import visitService from '../../service/visit/visitService';
import {
  formatDate,
  getDateTimeFromStrings,
  formatTime
} from '../../util/timeUtil';

/* ----- TYPES ----- */
const SAVE_VISIT = 'visit/SAVE_VISIT';
const SAVE_VISIT_SUCCESS = 'visit/SAVE_VISIT_SUCCESS';
const GET_VISITS_BY_DATE = 'visit/GET_VISITS_BY_DATE';
const GET_VISITS_BY_DATE_SUCCESS = 'visit/GET_VISITS_BY_DATE_SUCCESS';
const GET_VISITS_BY_DATE_RANGE = 'visit/GET_VISITS_BY_DATE_RANGE';
const GET_VISITS_BY_DATE_RANGE_SUCCESS =
  'visit/GET_VISITS_BY_DATE_RANGE_SUCCESS';
const GET_VISIT_BY_VET_ID = 'visit/GET_VISIT_BY_VET_ID';
const GET_VISIT_BY_VET_ID_SUCCESS = 'visit/GET_VISIT_BY_VET_ID_SUCCESS';
const GET_VISIT_BY_PET_ID = 'visit/GET_VISIT_BY_PET_ID';
const GET_VISIT_BY_PET_ID_SUCCESS = 'visit/GET_VISIT_BY_PET_ID_SUCCESS';
const DELETE_VISIT = 'visit/DELETE_VISIT';
const DELETE_VISIT_SUCCESS = 'visit/DELETE_VISIT_SUCCESS';

// appointments related
const SET_VISIT_ID = 'visit/SET_VISIT_ID';
const SET_VISIT_DATE = 'visit/SET_VISIT_DATE';
const SET_VISIT_START_TIME = 'visit/SET_VISIT_START_TIME';
const SET_VISIT_END_TIME = 'visit/SET_VISIT_END_TIME';
const SET_VISIT_PET = 'visit/SET_VISIT_PET';
const SET_VISIT_VET = 'visit/SET_VISIT_VET';
const SET_VISIT_DESCRIPTION = 'visit/SET_VISIT_DESCRIPTION';
const CLEAR_NEW_VISIT_DATA = 'visit/CLEAR_NEW_VISIT_DATA';

// render/modal

const OPEN_ADD_MODAL = 'visit/OPEN_ADD_MODAL';
const CLOSE_ADD_MODAL = 'visit/CLOSE_ADD_MODAL';
const VALIDATE_MODAL_DATA = 'visit/VALIDATE_MODAL_DATA';
const VALIDATE_MODAL_DATA_COMPLETED = 'visit/VALIDATE_MODAL_DATA_COMPLETED';

/* ----- ACTIONS ----- */
const saveVisit = mac(SAVE_VISIT, 'visit');
const saveVisitSuccess = mac(SAVE_VISIT_SUCCESS, 'visit');
const getVisitsByDate = mac(GET_VISITS_BY_DATE, 'date');
const getVisitsByDateSuccess = mac(GET_VISITS_BY_DATE_SUCCESS, 'visits');
const getVisitsByDateRange = mac(
  GET_VISITS_BY_DATE_RANGE,
  'startDate',
  'endDate'
);
const getVisitsByDateRangeSuccess = mac(
  GET_VISITS_BY_DATE_RANGE_SUCCESS,
  'visits'
);
const getVisitByVetId = mac(GET_VISIT_BY_VET_ID, 'vetId');
const getVisitByVetIdSuccess = mac(GET_VISIT_BY_VET_ID_SUCCESS, 'visits');
const getVisitByPetId = mac(GET_VISIT_BY_PET_ID, 'petId');
const getVisitByPetIdSuccess = mac(GET_VISIT_BY_PET_ID_SUCCESS, 'visits');
const deleteVisit = mac(DELETE_VISIT, 'visitId');
const deleteVisitSuccess = mac(DELETE_VISIT_SUCCESS);

// add new data
const setVisitId = mac(SET_VISIT_ID, 'id');
const setVisitDate = mac(SET_VISIT_DATE, 'date');
const setVisitStartTime = mac(SET_VISIT_START_TIME, 'start');
const setVisitEndTime = mac(SET_VISIT_END_TIME, 'end');
const setVisitPetId = mac(SET_VISIT_PET, 'petId');
const setVisitVetId = mac(SET_VISIT_VET, 'vetId');
const setVisitDescription = mac(SET_VISIT_DESCRIPTION, 'desc');
const clearNewVisitData = mac(CLEAR_NEW_VISIT_DATA);

// render/modal
const openAddVisitModal = mac(OPEN_ADD_MODAL, 'visit');
const closeAddVisitModal = mac(CLOSE_ADD_MODAL);
const validateVisitModalData = mac(VALIDATE_MODAL_DATA);
const validateVisitModalDataCompleted = mac(VALIDATE_MODAL_DATA_COMPLETED);

/* ----- REDUCER ----- */

const parseVisitResponse = newVisitData =>
  newVisitData.map(visit => {
    const start = getDateTimeFromStrings(visit.date, visit.startTime);
    const end = getDateTimeFromStrings(visit.date, visit.endTime);
    return {
      id: visit.id,
      title: 'Office Visit',
      start: start,
      end: end,
      desc: visit.description,
      petId: visit.petId,
      vetId: visit.vetId
    };
  });

const validateVisit = newVisit => {
  const { vetId, petId, date, start, end, desc } = newVisit;
  const hasSubjects = vetId && petId;
  const validDates = isDate(date) && isDate(start) && isDate(end);
  const endAfterStart = isAfter(end, start);
  const descValid = !isEmpty(desc ? desc.trim() : null);
  return hasSubjects && validDates && endAfterStart && descValid;
};

const constructVisitRequestBody = newVisit => {
  const { id, vetId, petId, date, start, end, desc } = newVisit;
  const startTime = formatTime(start);
  const endTime = formatTime(end);
  const newDate = formatDate(date);
  return {
    id,
    vetId,
    petId,
    date: newDate,
    startTime,
    endTime,
    description: desc
  };
};

const appendOrUpdateExistingVisits = (existingVisits, newVisits) => {
  const updatedVisits = cloneDeep(existingVisits);
  newVisits.forEach(visit => (updatedVisits[visit.id] = visit));
  return updatedVisits;
};

const visitInitialState = initialState.visit;
const visitReducer = (state = visitInitialState, action) => {
  switch (action.type) {
    case GET_VISITS_BY_DATE_SUCCESS:
    case GET_VISITS_BY_DATE_RANGE_SUCCESS: {
      const { visits } = action;
      const parsedVisits = parseVisitResponse(visits);
      const updatedVisits = appendOrUpdateExistingVisits(
        state.visits,
        parsedVisits
      );
      return { ...state, visits: updatedVisits };
    }
    case GET_VISIT_BY_VET_ID_SUCCESS: {
      const { visits } = action;
      // const parsedVisits = parseVisitResponse(visits);
      return { ...state, visitVetSearchResult: visits };
    }
    case GET_VISIT_BY_PET_ID_SUCCESS: {
      const { visits } = action;
      return { ...state, visits: visits };
    }
    case OPEN_ADD_MODAL: {
      return { ...state, showAddVisitModal: true };
    }
    case CLOSE_ADD_MODAL: {
      return { ...state, showAddVisitModal: false };
    }
    case VALIDATE_MODAL_DATA: {
      return { ...state, shouldValidateVisitModalData: true };
    }
    case VALIDATE_MODAL_DATA_COMPLETED: {
      return { ...state, shouldValidateVisitModalData: false };
    }
    case SET_VISIT_ID: {
      const { id } = action;
      const newVisit = cloneDeep(state.newVisit);
      newVisit.id = id;
      return { ...state, newVisit };
    }
    case SET_VISIT_DATE: {
      const { date } = action;
      const newVisit = cloneDeep(state.newVisit);
      newVisit.date = date;
      return { ...state, newVisit };
    }
    case SET_VISIT_START_TIME: {
      const { start } = action;
      const newVisit = cloneDeep(state.newVisit);
      newVisit.start = start;
      return { ...state, newVisit };
    }
    case SET_VISIT_END_TIME: {
      const { end } = action;
      const newVisit = cloneDeep(state.newVisit);
      newVisit.end = end;
      return { ...state, newVisit };
    }
    case SET_VISIT_PET: {
      const { petId } = action;
      const newVisit = cloneDeep(state.newVisit);
      newVisit.petId = petId;
      return { ...state, newVisit };
    }
    case SET_VISIT_VET: {
      const { vetId } = action;
      const newVisit = cloneDeep(state.newVisit);
      newVisit.vetId = vetId;
      return { ...state, newVisit };
    }
    case SET_VISIT_DESCRIPTION: {
      const { desc } = action;
      const newVisit = cloneDeep(state.newVisit);
      newVisit.desc = desc;
      return { ...state, newVisit };
    }
    case CLEAR_NEW_VISIT_DATA: {
      const { newVisit } = visitInitialState;
      return { ...state, newVisit };
    }
    default:
      return state;
  }
};

/* -------- EPICS ------- */

const saveVisitEpic = action$ =>
  action$.ofType(SAVE_VISIT).mergeMap(action =>
    concat(
      of(validateVisitModalDataCompleted()),
      of(closeAddVisitModal()),
      fromPromise(visitService.saveVisit(action.visit)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while saving visit');
        }
        return saveVisitSuccess(result.data);
      }),
      of(getVisitsByDate(action.visit.date))
    )
  );

const getVisitsByDateEpic = action$ =>
  action$.ofType(GET_VISITS_BY_DATE).mergeMap(action =>
    concat(
      fromPromise(
        visitService.getVisitsByDate(
          isDate(action.date) ? formatDate(action.date) : action.date
        )
      ).map(result => {
        if (result.error) {
          return addMessage(
            'An error occurred while getting visit from server'
          );
        }
        return getVisitsByDateSuccess(result.data);
      })
    )
  );

const getVisitsByVetIdEpic = action$ =>
  action$.ofType(GET_VISIT_BY_VET_ID).mergeMap(action =>
    concat(
      fromPromise(visitService.getVisitsByVetId(action.vetId)).map(result => {
        if (result.error) {
          return addMessage(
            'An error occurred while getting visit from server'
          );
        }
        return getVisitByVetIdSuccess(result.data);
      })
    )
  );

const getVisitsByDateRangeEpic = action$ =>
  action$.ofType(GET_VISITS_BY_DATE_RANGE).mergeMap(action =>
    concat(
      fromPromise(
        visitService.getVisitsByDateRange(action.startDate, action.endDate)
      ).map(result => {
        if (result.error) {
          return addMessage(
            'An error occurred while getting visit from server'
          );
        }
        return getVisitsByDateRangeSuccess(result.data);
      })
    )
  );

const openAddModalEpic = (action$, store) =>
  action$.ofType(OPEN_ADD_MODAL).mergeMap(action => {
    const { visit } = action;
    // which means this is opened by clicking on calendae
    if (visit) {
      const { desc, end, petId, vetId, start, id } = visit;
      return concat(
        of(getPetById(petId)),
        of(setVisitId(id)),
        of(setVisitDate(start)),
        of(setVisitStartTime(start)),
        of(setVisitEndTime(end)),
        of(setVisitPetId(petId)),
        of(setVisitVetId(vetId)),
        of(setVisitDescription(desc))
      );
    }
    return [];
  });

const closeAddModalEpic = action$ =>
  action$
    .ofType(CLOSE_ADD_MODAL)
    .mergeMap(() => concat(of(clearNewVisitData())), of(clearActiveOwner()));

const validateVisitDataEpic = (action$, store) =>
  action$.ofType(VALIDATE_MODAL_DATA).mergeMap(() => {
    const newVisit = store.value.visitReducer.newVisit;
    const validVisit = validateVisit(newVisit);
    if (validVisit) {
      return of(saveVisit(constructVisitRequestBody(newVisit)));
    }
    console.log(validVisit);
    return [];
  });

const deleteVisitEpic = (action$, store) =>
  action$.ofType(DELETE_VISIT).mergeMap(action =>
    concat(
      of(validateVisitModalDataCompleted()),
      of(closeAddVisitModal()),
      fromPromise(visitService.deleteVisit(action.visitId)).map(result => {
        if (result.error) {
          return addMessage('An error occurred while deleting visit');
        }
        return deleteVisitSuccess(result.data);
      }),
      of(getVisitsByDate(store.value.visitReducer.newVisit.date))
    )
  );

const setVisitVetEpic = action$ =>
  action$
    .ofType(SET_VISIT_VET)
    .mergeMap(action => of(getVisitByVetId(action.vetId)));

const visitEpics = [
  getVisitsByDateEpic,
  saveVisitEpic,
  getVisitsByDateRangeEpic,
  getVisitsByVetIdEpic,
  openAddModalEpic,
  closeAddModalEpic,
  validateVisitDataEpic,
  deleteVisitEpic,
  setVisitVetEpic
];

export {
  visitReducer as default,
  visitEpics,
  saveVisit,
  getVisitsByDate,
  getVisitsByDateRange,
  openAddVisitModal,
  closeAddVisitModal,
  validateVisitModalData,
  validateVisitModalDataCompleted,
  setVisitDate,
  setVisitStartTime,
  setVisitEndTime,
  setVisitPetId,
  setVisitVetId,
  setVisitDescription,
  deleteVisit
};
