export type LanguageStateType = {
  /**
   * The name of the translations file without its extension
   */
  default: string;

  /**
   * The name of the language
   */
  language: string;

  /**
   * All the translations from translations file
   */
  translations: { [key: string]: any };
};
