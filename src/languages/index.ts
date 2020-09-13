import ptBr from './pt-br.json';
import enUs from './en-us.json';
import { LanguageStateType } from '../types/ReducerTypes';

/**
 * This object is a reference to all the languages of the application.
 *
 * Everytime a new language is added it has to be placed here, following
 * the structure: {'name-of-the-json-file': referenceToTheJsonFile}
 */
const languages: { [key: string]: LanguageStateType } = {
  'pt-br': ptBr,
  'en-us': enUs,
};

export default languages;
