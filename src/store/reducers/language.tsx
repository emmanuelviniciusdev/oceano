import { ActionType } from '../../types/ReducerTypes';

// Languages
import ptBr from '../../languages/pt-br.json';
import enUs from '../../languages/en-us.json';

type StateType = {
  /**
   * The name of the json file without its extension
   */
  default: string;

  /**
   * The name of the language
   */
  language: string;

  /**
   * All the translations from json file
   */
  translations: object;
};

const languages: { [key: string]: StateType } = {
  'pt-br': ptBr,
  'en-us': enUs,
};

const initialState: StateType = languages['pt-br'];

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, ...(languages[action.payload] ?? languages['pt-br']) };
    default:
      return state;
  }
}

export default {
  initialState,
  reducer,
};
