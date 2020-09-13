export type ActionType = {
  type: string;
  payload: any;
};

export type LanguageStateType = {
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
