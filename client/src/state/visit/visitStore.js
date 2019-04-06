import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import _ from 'lodash';
import moment from 'moment';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { concat } from 'rxjs/observable/concat';
import { makeActionCreator as mac } from '../common/makeActionCreator';
import initialState from '../state';
import { addMessage } from '../message/messageStore';
import visitService from '../../service/visit/visitService';

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

// render/modal

const OPEN_ADD_MODAL = 'visit/OPEN_ADD_MODAL';
const CLOSE_ADD_MODAL = 'visit/CLOSE_ADD_MODAL';
const VALIDATE_MODAL_DATA = 'visit/VALIDATE_MODAL_DATA';
const VALIDATE_MODAL_DATA_COMPLETED = 'visit/VALIDATE_MODAL_DATA_COMPLETED';

/* ----- ACTIONS ----- */
const saveVisit = mac(SAVE_VISIT, 'visit', 'add');
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
const getVisitByaPetId = mac(GET_VISIT_BY_PET_ID, 'petId');
const getVisitByPetIdSuccess = mac(GET_VISIT_BY_PET_ID_SUCCESS, 'visits');

// render/modal
const openAddVisitModal = mac(OPEN_ADD_MODAL);
const closeAddVisitModal = mac(CLOSE_ADD_MODAL);
const validateVisitModalData = mac(VALIDATE_MODAL_DATA);
const validateVisitModalDataCompleted = mac(VALIDATE_MODAL_DATA_COMPLETED);

/* ----- REDUCER ----- */

const getDateTimeFromStrings = (dateString, startTimeString) =>
  moment(dateString + ' ' + startTimeString).toDate();

const parseVisitResponse = newVisitData =>
  newVisitData.map(visit => {
    const start = getDateTimeFromStrings(visit.date, visit.startTime);
    const end = getDateTimeFromStrings(visit.date, visit.endTime);
    return {
      id: visit.id,
      title: 'visit with someone todo fill this in',
      start: start,
      end: end,
      desc: visit.description,
      petId: visit.petId,
      vetId: visit.vetId
    };
  });

const visitInitialState = initialState.visit;
const visitReducer = (state = visitInitialState, action) => {
  switch (action.type) {
    case GET_VISITS_BY_DATE_SUCCESS:
    case GET_VISITS_BY_DATE_RANGE_SUCCESS: {
      const { visits } = action;
      const parsedVisits = parseVisitResponse(visits);
      return { ...state, visits: parsedVisits };
    }
    case GET_VISIT_BY_VET_ID_SUCCESS: {
      const { visits } = action;
      return { ...state, visits: visits };
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
    default:
      return state;
  }
};

/* -------- HELPERS ------- */
const getVisitRequestBody = visit => {
  const { specialties, firstName, lastName } = visit;
  const mappedSpecialties = specialties.map(value => {
    const intValue = _.parseInt(value);
    const specialtyWithId = { id: intValue };
    return specialtyWithId;
  });
  // for some odd reason server only allows one add visit to go through and then the rest of them makes
  // the special thing stuck in a "transient state" pet the log message.
  return {
    firstName,
    lastName,
    specialties: mappedSpecialties
  };
};

const getDateString = date => moment(date).format('YYYY-MM-DD');

/* -------- EPICS ------- */

const saveVisitEpic = action$ =>
  action$.ofType(SAVE_VISIT).mergeMap(action =>
    concat(
      of(validateVisitModalDataCompleted()),
      of(closeAddVisitModal()),
      fromPromise(
        visitService.saveVisit(getVisitRequestBody(action.visit))
      ).map(result => {
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
      fromPromise(visitService.getVisitsByDate(getDateString(action.date))).map(
        result => {
          if (result.error) {
            return addMessage(
              'An error occurred while getting visit from server'
            );
          }
          return getVisitsByDateSuccess(result.data);
        }
      )
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

const visitEpics = [
  getVisitsByDateEpic,
  saveVisitEpic,
  getVisitsByDateRangeEpic
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
  validateVisitModalDataCompleted
};
