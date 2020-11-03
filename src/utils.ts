/**
 *
 * Any kind of extremely general function or variable that can be used in multiple
 * parts of the application can be placed here.
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
export function OceanoErrorConstructed(message?: string, object?: object) {
  let error = new Error(message);
  return Object.assign(error, object);
}

/**
 * It goes through every entry of the given route regular expressions and checks
 * if route pathname matches some of these routes.
 *
 * Route regular expresions can be generated at:
 * https://forbeslindesay.github.io/express-route-tester/
 *
 * @param routePathname The route pathname
 * @param routeRegExps An array of route regular expressions
 */
export function doesRouteMatch(routePathname: string, routeRegExps: RegExp[]) {
  /**
   * If the return is greater than 0, so 'routePathname' corresponds to some route
   */
  return routeRegExps.filter((regExp) => regExp.test(routePathname)).length > 0;
}

/**
 * It returns something like this: [github] João Baptista
 *
 * @param provider Provider ID
 * @param username User name
 */
export function joinProviderAndUsername(
  provider?: string | null,
  username?: string | null
) {
  if (!provider || !username) return '';

  const providers = {
    'google.com': '[google]',
    'github.com': '[github]',
  };

  return `${providers[provider as keyof typeof providers] || ''} ${username}`;
}

/**
 * It defines a title to the page after 'oceano' prefix.
 *
 * @param title The title of the page
 */
export const setPageTitle = (title?: string) => {
  const prefix = 'oceano';
  document.title = title ? prefix + ' — ' + title : prefix;
};

/**
 * Generates an array containing the keywords of the title to be used
 * in the search engine with firebase.
 *
 * @param title The note's title
 */
export const generateTitleKeywords = (title: string) => {
  let keywords: string[] = [];

  const wordsArray = title.split(' ');
  const transformedWordsArray = [...wordsArray];

  wordsArray.forEach((word, index) => {
    if (index > 0) {
      transformedWordsArray.shift();
    }

    let currentWord = '';

    transformedWordsArray
      .join(' ')
      .toLowerCase()
      .split('')
      .forEach((letter) => {
        currentWord += letter;
        keywords.push(currentWord);
      });
  });

  return keywords;
};
