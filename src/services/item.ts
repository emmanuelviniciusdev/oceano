import firebase from '../firebase';
import 'firebase/firestore';

// Types
import {
  ItemDocumentType,
  ItemDocumenttWithIDType,
} from '../types-and-interfaces/collections/items.types';

// Utils
import { OceanoErrorConstructed } from '../utils';

const items = () => firebase.firestore().collection('items');

/**
 * Updates items's data
 *
 * @param itemId Item's document ID
 * @param data Item's data
 */
export function updateItem(itemId: string, data: ItemDocumentType) {
  return items().doc(itemId).update(data);
}

/**
 * Gets data of an item
 *
 * @param itemId Item's document ID
 */
export async function getItem(
  itemId: string
): Promise<ItemDocumenttWithIDType> {
  try {
    const item = await items().doc(itemId).get();

    if (!item.exists) {
      throw OceanoErrorConstructed(undefined, {
        code: 'oceano-item/item-does-not-exist',
      });
    }

    // TODO: Throw an exception in case 'userUID' doesn't correspond to the logged in user.

    return {
      documentId: item.id,
      ...(item.data() as ItemDocumentType),
    };
  } catch (err) {
    throw err;
  }
}

/**
 * Creates an item and returns the document ID
 *
 * @param data The items's data
 */
export function createItem(data: ItemDocumentType) {
  return items()
    .add(data)
    .then((item) => item.id);
}

/**
 * Deletes an item
 *
 * @param itemId Note's document ID
 */
export function deleteItem(itemId: string) {
  return items().doc(itemId).delete();
}

/**
 * Get the last item from a folder based on item's 'orderId' property.
 *
 * The higher 'orderId' value indicates the last item.
 *
 * @param parentFolderId Folder's document ID
 * @param userUID User's ID
 */
export async function getLastItemFromFolder(
  parentFolderId: string | null,
  userUID: string
) {
  return items()
    .where('userUID', '==', userUID)
    .where('parentFolderId', '==', parentFolderId)
    .orderBy('orderId', 'desc')
    .limit(1)
    .get()
    .then((items) =>
      !items.empty ? (items.docs[0].data() as ItemDocumentType) : null
    );
}

/**
 * Gets items "on demand" based on 'lastOrderId'.
 *
 * When passing the 'lastOrderId' parameter, only the first items returned that have the value of
 * 'orderId' less than the value of 'lastOrderId' will be returned.
 *
 * @param userUID User's ID
 * @param parentFolderId Folder's ID where the items belong
 * @param limit Amount of data to be returned
 * @param lastOrderId 'orderId' of the last note or folder rendered on the page
 */
export async function getAllItemsPagination(
  userUID: string,
  parentFolderId: string | null,
  lastOrderId: number | null,
  limit: number
) {
  try {
    let fetchedItems = items()
      .where('userUID', '==', userUID)
      .where('parentFolderId', '==', parentFolderId)
      .orderBy('orderId', 'desc')
      .limit(limit);

    /**
     * Applies 'lastOrderId' sort.
     */
    if (lastOrderId) fetchedItems = fetchedItems.startAfter(lastOrderId);

    return (await fetchedItems.get()).docs.map(
      (doc) =>
        ({ documentId: doc.id, ...doc.data() } as ItemDocumenttWithIDType)
    );
  } catch (err) {
    throw err;
  }
}
