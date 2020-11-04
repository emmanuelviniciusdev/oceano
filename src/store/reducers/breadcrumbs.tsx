// Types
import { ActionType } from '../../types-and-interfaces/store/reducers/general.types';
import {
  BreadcrumbsStateType,
  FolderType,
} from '../../types-and-interfaces/store/reducers/breadcrumbs.types';

const initialState: BreadcrumbsStateType = {
  previousFolders: [null],
  currentFolder: null,
};

function reducer(state: BreadcrumbsStateType, action: ActionType) {
  switch (action.type) {
    case 'SET_PREVIOUS_FOLDERS':
      return { ...state, previousFolders: action.payload };
    case 'SET_CURRENT_FOLDER':
      return { ...state, currentFolder: action.payload };
    default:
      return state;
  }
}

const actionCreators = {
  /**
   * Sets previous opened folders.
   *
   * @param previousFolders The data of all previous opened folders
   */
  setPreviousFolders: (previousFolders: FolderType[]): ActionType => ({
    type: 'SET_PREVIOUS_FOLDERS',
    payload: previousFolders,
  }),

  /**
   * Sets current opened folder.
   *
   * @param currentFolder The data of the current opened folder
   */
  setCurrentFolder: (currentFolder: FolderType): ActionType => ({
    type: 'SET_CURRENT_FOLDER',
    payload: currentFolder,
  }),
};

export default {
  initialState,
  reducer,
  actionCreators,
};
