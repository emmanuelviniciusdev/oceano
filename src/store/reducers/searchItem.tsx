/**
 * This reducer holds the text of the search input, placed in 'TopBar' component.
 */

// Types
import { ActionType } from '../../types-and-interfaces/store/reducers/general.types';
import { SearchItemStateType } from '../../types-and-interfaces/store/reducers/searchItem.types';

const initialState: SearchItemStateType = null;

function reducer(state: SearchItemStateType, action: ActionType) {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      if (!action.payload) return state;

      return { ...state, searchText: action.payload };
    default:
      return state;
  }
}

const actionCreators = {
  /**
   * @param searchText The text to be searched in the API
   */
  setSearchText: (searchText: string): ActionType => ({
    type: 'SET_SEARCH_TEXT',
    payload: searchText,
  }),
};

export default {
  initialState,
  reducer,
  actionCreators,
};
