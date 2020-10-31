import firebase from '../firebase';
import 'firebase/firestore';

// Types
import { UserCollectionType } from '../types-and-interfaces/collections/users.types';

const users = () => firebase.firestore().collection('users');

/**
 * Get all user data
 *
 * @param uid User UID
 */
export async function getUserByUID(uid?: string) {
  try {
    return (await users().doc(uid).get()).data();
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * If it returns 'true' the user exists.
 * Otherwise, the user does not exist.
 *
 * @param uid User UID
 */
export async function checkIfUserExistsInCollectionByUID(uid?: string) {
  try {
    return (await getUserByUID(uid)) !== undefined;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Register user into 'users' collection.
 *
 * @param uid User UID
 * @param data Essential user data
 */
export async function registerUser(uid: string, data: UserCollectionType) {
  try {
    await users().doc(uid).set(data);
  } catch (err) {
    throw err;
  }
}
