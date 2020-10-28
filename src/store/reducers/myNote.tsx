/**
 * This reducer manages data about the current opened note.
 */

// Types
import { ActionType } from '../../types-and-interfaces/store/reducers/general.types';
import { MyNoteStateType } from '../../types-and-interfaces/store/reducers/myNote.types';

const initialState: MyNoteStateType = null;

function reducer(state: MyNoteStateType, action: ActionType) {
  switch (action.type) {
    case 'SET_NOTE_ID':
      if (!action.payload) return null;

      return { ...state, noteId: action.payload };
    default:
      return state;
  }
}

const actionCreators = {
  /**
   * @param noteId The note's ID
   */
  setNoteId: (noteId: string): ActionType => ({
    type: 'SET_NOTE_ID',
    payload: noteId,
  }),
};

export default {
  initialState,
  reducer,
  actionCreators,
};
