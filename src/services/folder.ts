import firebase from '../firebase';
import 'firebase/firestore';

// Types
import { FolderDocumentType } from '../types-and-interfaces/collections/folders.types';

const folders = () => firebase.firestore().collection('folders');

/**
 * // TODO: Abstract this to an unique helper
 *
 * Get the last folder from a parent folder based on folder's 'orderId' property.
 *
 * The higher 'orderId' value indicates the last folder.
 *
 * @param parentFolderId Document ID of the parent folder
 * @param userUID User's ID
 */
async function getLastFolderFromFolder(
  parentFolderId: string | null,
  userUID: string
) {
  return folders()
    .where('userUID', '==', userUID)
    .where('parentFolderId', '==', parentFolderId)
    .orderBy('orderId', 'desc')
    .limit(1)
    .get()
    .then((folders) =>
      !folders.empty ? (folders.docs[0].data() as FolderDocumentType) : null
    );
}

export { folders as foldersCollectionRef, getLastFolderFromFolder };
