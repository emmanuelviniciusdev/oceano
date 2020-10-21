import firebase from '../firebase';
import 'firebase/auth';

// Services
import { checkIfUserExistsInCollectionByUID } from './user';

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
     * // TODO: Implement an email verification flow
     */
    if (method === 'github' && !signInResult.user?.emailVerified) {
      await signInResult.user?.sendEmailVerification();
      console.log('email verification has been sent');
    }

    /**
     * If user does not exist in the collection yet, it means the user
     * did not accept the terms.
     */
    const areTermsAccepted = await checkIfUserExistsInCollectionByUID(
      signInResult.user?.uid
    );

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

export { signInWith };
