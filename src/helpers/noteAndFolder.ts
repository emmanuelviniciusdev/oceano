// Services
import {
  getLastFolderFromFolder,
  foldersCollectionRef,
} from '../services/folder';
import { getLastNoteFromFolder, notesCollectionRef } from '../services/note';

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
 * When passing the 'lastOrderId' parameter, only the first items returned that have the value of
 * 'orderId' less than the value of 'lastOrderId' will be returned.
 *
 * @param itemsType The type of items to be fetched from firebase
 * @param userUID User's ID
 * @param limit Amount of data to be returned
 * @param lastOrderId 'orderId' of the last note or folder rendered on the page
 */
async function getAllItemsPagination<T>(
  itemsType: 'notes' | 'folders',
  userUID: string,
  folderId: string | null,
  lastOrderId: number | null,
  limit: number = 6
) {
  try {
    const collectionRef = {
      notes: notesCollectionRef,
      folders: foldersCollectionRef,
    };

    const folderIdFieldNameToApplyFilter = {
      notes: 'folderId',
      folders: 'parentFolderId',
    };

    let fetchedItems = collectionRef[itemsType]()
      .where('userUID', '==', userUID)
      .where(folderIdFieldNameToApplyFilter[itemsType], '==', folderId)
      .orderBy('orderId', 'desc')
      .limit(limit);

    /**
     * Applies 'lastOrderId' sort.
     */
    if (lastOrderId) fetchedItems = fetchedItems.startAfter(lastOrderId);

    return (await fetchedItems.get()).docs.map(
      (doc) => (({ documentId: doc.id, ...doc.data() } as unknown) as T)
    );
  } catch (err) {
    throw err;
  }
}

export { generatesNextOrderId, getAllItemsPagination };
