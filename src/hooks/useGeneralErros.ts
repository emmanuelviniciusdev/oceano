import { useState } from 'react';

// Types
import { GeneralErrorType } from '../types-and-interfaces/hooks/useGeneralErrors.types';

/**
 * This hook manages all the possible general errors states that a component
 * may have.
 */
export default function useGeneralErrors() {
  const [errors, setErrors] = useState<GeneralErrorType[]>([]);

  /**
   * Adds an error to the errors state.
   *
   * @param errorName The error name
   * @param errorMessage The optional error message
   * @param errorKey The optional error key
   */
  const addGeneralError = (
    errorName: string,
    errorMessage?: string,
    errorKey?: number
  ) =>
    setErrors((errors) => [
      ...(errors || []),
      {
        key: errorKey || Math.random(),
        name: errorName,
        message: errorMessage || '',
      },
    ]);

  /**
   * Removes an error by a key or name.
   *
   * @param key The reference key to remove the error
   * @param errorTerm The term used to search the error to be removed
   */
  const removeGeneralErrorBy = (
    key: 'key' | 'name',
    errorTerm: number | string
  ) =>
    setErrors(
      (errors) => errors && errors.filter((error) => error[key] !== errorTerm)
    );

  /**
   * Gets an error by a key or name.
   *
   * @param key The reference key to return the errors
   * @param errorTerm The term used to search the errors to be returned
   */
  const getErrorsBy = (key: 'key' | 'name', errorTerm: number | string) => {
    return errors.filter((error) => error[key] === errorTerm);
  };

  return {
    generalErrors: errors,
    getErrorsBy,
    addGeneralError,
    removeGeneralErrorBy,
  };
}
