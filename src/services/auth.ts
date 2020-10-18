import firebase from '../firebase';
import 'firebase/auth';

// Services
import { checkIfUserExistsInCollectionByUID } from './user';

async function signInWithGogle() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  try {
    const signInResult = await firebase.auth().signInWithPopup(googleProvider);

    /**
     * If user does not exist in the collection yet, it means the user
     * did not accept the terms.
     */
    const areTermsAccepted = await checkIfUserExistsInCollectionByUID(
      signInResult.user?.uid
    );

    if (!areTermsAccepted) {
      throw new Error('oceano-auth/user-did-not-accept-terms');
    }

    return signInResult.user;
  } catch (err) {
    throw err;
  }
}

export { signInWithGogle };
