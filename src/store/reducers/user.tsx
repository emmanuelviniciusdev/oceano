// Types
import { ActionType } from '../../types-and-interfaces/store/reducers/general.types';
import { UserStateType } from '../../types-and-interfaces/store/reducers/user.types';

const initialState: UserStateType = null;

function reducer(state: UserStateType, action: ActionType) {
  switch (action.type) {
    case 'SET_USER':
      if (!action.payload) return null;

      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const actionCreators = {
  /**
   * @param user The user data
   */
  setUser: (user: UserStateType): ActionType => ({
    type: 'SET_USER',
    payload: user,
  }),
};

export default {
  initialState,
  reducer,
  actionCreators,
};
