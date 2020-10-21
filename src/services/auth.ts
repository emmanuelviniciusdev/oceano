import firebase from '../firebase';
import 'firebase/auth';

// Services
import { checkIfUserExistsInCollectionByUID } from './user';

/**
 * It authenticates user with the given login method
 *
 * @param method Login method
 */
async function signInWith(method: 'google' | 'github') {
  if (!method) return;

  const providers = {
    google: firebase.auth.GoogleAuthProvider,
    github: firebase.auth.GithubAuthProvider,
  };

  try {
    const provider = new providers[method]();
    const signInResult = await firebase.auth().signInWithPopup(provider);

    /**
     * If user does not exist in the collection yet, it means the user
     * did not accept the terms.
     */
    const areTermsAccepted = await checkIfUserExistsInCollectionByUID(
      signInResult.user?.uid
    );

    if (areTermsAccepted && !signInResult.user?.emailVerified) {
      // TODO: Implement an abstraction for this
      let error = new Error();
      error = Object.assign(error, {
        code: 'oceano-auth/user-did-not-verify-email',
      });

      throw error;
    }

    if (!areTermsAccepted) {
      // TODO: Implement an abstraction for this
      let error = new Error();
      error = Object.assign(error, {
        code: 'oceano-auth/user-did-not-accept-terms',
      });

      throw error;
    }

    return signInResult.user;
  } catch (err) {
    throw err;
  }
}

/**
 * It signs out user
 */
function signOut() {
  return firebase.auth().signOut();
}

export { signInWith, signOut };
