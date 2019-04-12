import _ from 'lodash';
import { makeActionCreator as mac } from '../common/makeActionCreator';
import initialState from '../state';

/* ----- TYPES ----- */
const ADD_MESSAGE = 'message/ADD_MESSAGE';
const MARK_AS_READ = 'message/MARK_AS_READ';
const CLEAR_ALL = 'message/CLEAR_ALL';

/* ----- ACTIONS ----- */
const addMessage = mac(ADD_MESSAGE, 'message');
const clearAllMessages = mac(CLEAR_ALL);
const markMessageAsRead = mac(MARK_AS_READ, 'id');

/* ----- REDUCER ----- */
const messageInitialState = initialState.message;
const messageReducer = (state = messageInitialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { message } = action;
      return [...state, message];
    }
    case MARK_AS_READ: {
      const { id } = action;
      return state.map(msg => {
        if (msg.id !== id) {
          return msg;
        }

        const newMsg = msg.clone();
        newMsg.isRead = true;
        newMsg.displayNotification = false;

        return newMsg;
      });
    }
    case CLEAR_ALL: {
      return [];
    }
    default:
      return state;
  }
};

/* ----- EXPORTS ----- */
export {
  addMessage,
  clearAllMessages,
  markMessageAsRead,
  messageReducer as default
};
