import ptBr from './pt-br';
import enUs from './en-us';
import { LanguageStateType } from '../types/reducers/language';

/**
 * This object is a reference to all the languages of the application.
 *
 * Everytime a new language is added it has to be placed here, following
 * the structure: {'name-of-the-translations-file': referenceToTheTranslationsFile}
 */
const languages: { [key: string]: LanguageStateType } = {
  'pt-br': ptBr,
  'en-us': enUs,
};

export default languages;
