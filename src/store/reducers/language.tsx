import languages from '../../languages';

// Types
import { ActionType } from '../../types-and-interfaces/store/reducers/general.types';
import { LanguageStateType } from '../../types-and-interfaces/store/reducers/language.types';

const initialState: LanguageStateType = languages['pt-br'];

function reducer(
  state: LanguageStateType,
  action: ActionType
): LanguageStateType {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, ...(languages[action.payload] ?? languages['pt-br']) };
    default:
      return state;
  }
}

const actionCreators = {
  /**
   * @param language The name of the the json file without the extension. Example: 'pt-br'
   */
  setLanguage: (language: string = 'pt-br'): ActionType => ({
    type: 'SET_LANGUAGE',
    payload: language,
  }),
};

export default {
  initialState,
  reducer,
  actionCreators,
};
