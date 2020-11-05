/**
 * This reducer manages data about the current opened note.
 */

// Types
import { ActionType } from '../../types-and-interfaces/store/reducers/general.types';
import { MyNoteStateType } from '../../types-and-interfaces/store/reducers/myNote.types';

const initialState: MyNoteStateType = {
  noteId: '',
  parentFolderId: null,
};

function reducer(state: MyNoteStateType, action: ActionType) {
  switch (action.type) {
    case 'SET_NOTE_ID':
      return { ...state, noteId: action.payload };
    case 'SET_PARENT_FOLDER_ID':
      return { ...state, parentFolderId: action.payload };
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

  setParentFolderId: (parentFolderId: string | null): ActionType => ({
    type: 'SET_PARENT_FOLDER_ID',
    payload: parentFolderId,
  }),
};

export default {
  initialState,
  reducer,
  actionCreators,
};
