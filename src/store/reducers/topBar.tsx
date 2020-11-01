// Types
import { ActionType } from '../../types-and-interfaces/store/reducers/general.types';
import { TopBarStateType } from '../../types-and-interfaces/store/reducers/topBar.types';

const initialState: TopBarStateType = null;

function reducer(state: TopBarStateType, action: ActionType) {
  switch (action.type) {
    case 'SET_SEARCHED_TERM':
      return { ...state, searchedTerm: action.payload };
    default:
      return state;
  }
}

const actionCreators = {
  /**
   * @param searchedTerm The term that will be searched in the API.
   */
  setSearchedTerm: (searchedTerm: string): ActionType => ({
    type: 'SET_SEARCHED_TERM',
    payload: searchedTerm,
  }),
};

export default {
  initialState,
  reducer,
  actionCreators,
};
