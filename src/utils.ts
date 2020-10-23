/**
 *
 *
 * Any kind of function or variable that can be used in multiple parts of the
 * application can be placed here.
 *
 *
 */

/**
 * This function makes it possible to return an object with the
 * 'ErrorConstructor' from javascript.
 *
 * Usage: throw OceanoErrorConstructed('my error message', { code: 'foo/bar' })
 *
 * @param message The message to be returned with 'ErrorConstructor'
 * @param object The object to be returned with 'ErrorConstructor'
 */
function OceanoErrorConstructed(message?: string, object?: object) {
  let error = new Error(message);
  return Object.assign(error, object);
}

export { OceanoErrorConstructed };
