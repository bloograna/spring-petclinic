import _ from 'lodash';
import { makeActionCreator as mac } from '../common/makeActionCreator';
import initialState from '../state';

/* ----- TYPES ----- */
const ADD_MESSAGE = 'spark/message/ADD_MESSAGE';
const MARK_ALL_AS_READ = 'spark/message/MARK_ALL_AS_READ';
const MARK_AS_READ = 'spark/message/MARK_AS_READ';
const CLEAR_ALL = 'spark/message/CLEAR_ALL';

/* ----- ACTIONS ----- */
const addMessage = mac(ADD_MESSAGE, 'message');
const clearAllMessages = mac(CLEAR_ALL);
const markAllMessagesAsRead = mac(MARK_ALL_AS_READ);
const markMessageAsRead = mac(MARK_AS_READ, 'id');

/* ----- REDUCER ----- */
const messageInitialState = initialState.message;
const messageReducer = (state = messageInitialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { message } = action;
      return [...state, message];
    }
    case MARK_ALL_AS_READ: {
      return _.map(state, msg => {
        const newMsg = msg.clone();
        newMsg.isRead = true;
        return newMsg;
      });
    }
    case MARK_AS_READ: {
      const { id } = action;
      return _.map(state, msg => {
        if (msg.id !== id) {
          return msg;
        }

        const newMsg = msg.clone();
        newMsg.isRead = true;

        return newMsg;
      });
    }
    case CLEAR_ALL: {
      return initialState;
    }
    default:
      return state;
  }
};

/* ----- EXPORTS ----- */
export {
  addMessage,
  clearAllMessages,
  markAllMessagesAsRead,
  markMessageAsRead,
  messageReducer as default
};
