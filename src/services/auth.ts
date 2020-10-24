import firebase from '../firebase';
import 'firebase/auth';

// Services
import { checkIfUserExistsInCollectionByUID } from './user';

// Utils
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

function sendUserEmailVerification() {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    unsubscribe();

    if (!user) {
      console.error(
        'cannot send email verification because the user is not logged in'
      );
      return;
    }

    user.sendEmailVerification().catch((err) => {
      console.error(err);
      console.log('error sending email verification');
    });
  });
}

export { signInWith, signOut, sendUserEmailVerification };
