// Services
import {
  getLastFolderFromFolder,
  foldersCollectionRef,
} from '../services/folder';
import { getLastNoteFromFolder, notesCollectionRef } from '../services/note';

// Types
import { NoteDocumentWithIDType } from '../types-and-interfaces/collections/notes.types';
import { FolderDocumentWithIDType } from '../types-and-interfaces/collections/folders.types';

/**
 * Generates the next 'orderId' of a folder based on the 'orderId' property of the last
 * items from 'folders' and 'notes' collections.
 *
 * @param folderId Folder document's ID
 * @param userUID User's ID
 */
async function generatesNextOrderId(folderId: string | null, userUID: string) {
  try {
    const lastOrderIdNote =
      (await getLastNoteFromFolder(folderId, userUID))?.orderId || 0;
    const lastOrderIdFolder =
      (await getLastFolderFromFolder(folderId, userUID))?.orderId || 0;

    return Math.max(lastOrderIdNote, lastOrderIdFolder) + 1;
  } catch (err) {
    throw err;
  }
}

/**
 * Gets items "on demand" based on 'lastOrderId'.
 *
 * When passing the 'lastOrderId' parameter, the first items returned that have the value of
 * 'orderId' less than the value of 'lastOrderId' will be returned.
 *
 * @param collectionRef Reference to 'notes' or 'folders' firebase collection
 * @param userUID User's ID
 * @param lastOrderId 'orderId' of the last note or folder rendered on the page
 * @param limit Amount of data to be returned
 */
async function getAllItemsPagination<T>(
  collectionRef: firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  >,
  userUID: string,
  limit: number,
  lastOrderId?: number
) {
  try {
    let fetchedItems = collectionRef
      .where('userUID', '==', userUID)
      .orderBy('orderId', 'desc')
      .limit(limit);

    if (lastOrderId) fetchedItems = fetchedItems.startAfter(lastOrderId);

    return (await fetchedItems.get()).docs.map(
      (doc) => (({ documentId: doc.id, ...doc.data() } as unknown) as T)
    );
  } catch (err) {
    throw err;
  }
}

/**
 * Abstraction of 'getAllItemsPagination'
 *
 * @param userUID User's ID
 * @param lastOrderId 'orderId' of the last note rendered on the page
 * @param limit Amount of data to be returned
 */
function getAllNotesPagination(
  userUID: string,
  lastOrderId?: number,
  limit: number = 5
) {
  return getAllItemsPagination<NoteDocumentWithIDType>(
    notesCollectionRef(),
    userUID,
    limit,
    lastOrderId
  );
}

/**
 * Abstraction of 'getAllItemsPagination'
 *
 * @param userUID User's ID
 * @param lastOrderId 'orderId' of the last folder rendered on the page
 * @param limit Amount of data to be returned
 */
function getAllFoldersPagination(
  userUID: string,
  lastOrderId?: number,
  limit: number = 5
) {
  return getAllItemsPagination<FolderDocumentWithIDType>(
    foldersCollectionRef(),
    userUID,
    limit,
    lastOrderId
  );
}

export { generatesNextOrderId, getAllNotesPagination, getAllFoldersPagination };
