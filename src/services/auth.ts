import firebase from '../firebase';
import 'firebase/auth';

// Services
import { checkIfUserExistsInCollectionByUID } from './user';
import { OceanoErrorConstructed } from '../utils';

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
      throw OceanoErrorConstructed(undefined, {
        code: 'oceano-auth/user-did-not-verify-email',
      });
    }

    if (!areTermsAccepted) {
      throw OceanoErrorConstructed(undefined, {
        code: 'oceano-auth/user-did-not-accept-terms',
      });
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
