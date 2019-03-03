import { map } from 'lodash';
import { makeActionCreator } from '../common/makeActionCreator';

/* ------- TYPES ------- */
const ADD_MESSAGE = 'message/ADD_MESSAGE';
const MARK_AS_READ = 'message/MARK_AS_READ';
const CLEAR_ALL = 'message/CLEAR_ALL';

export const addMessage = makeActionCreator(ADD_MESSAGE, 'message');
export const markMessageAsRead = makeActionCreator(MARK_AS_READ, 'id');
export const clearAllMessages = makeActionCreator(CLEAR_ALL);

/* ------- REDUCER ------- */
export default function messageReducer(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { message } = action;
      return [...state, message];
    }
    case MARK_AS_READ: {
      const { id } = action;
      return map(state, msg => {
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
}
