export type GeneralErrorType = {
  /**
   * Error key.
   *
   * This property is to differentiate one error from another
   * in case there are items with the same name in the array of
   * errors.
   *
   * By default, it is auto-generated with 'Math.random()'.
   */
  key: number;

  /**
   * The error name
   */
  name: string;

  /**
   * The optional error message
   */
  message?: string;
};
