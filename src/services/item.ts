import firebase from '../firebase';
import 'firebase/firestore';

// Types
import {
  ItemDocumentType,
  ItemDocumenttWithIDType,
} from '../types-and-interfaces/collections/items.types';
import {
  BreadcrumbsStateType,
  FolderType,
} from '../types-and-interfaces/store/reducers/breadcrumbs.types';

// Utils
import { generateTitleKeywords, OceanoErrorConstructed } from '../utils';
import { DragAndDropItemType } from '../types-and-interfaces/components/NoteOrFolder.types';
import { firestore } from 'firebase';

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
 * Deletes an item.
 *
 * If the item is a folder it deletes all of its children too.
 *
 * @param itemId Item's document ID
 * @param type Item's type
 */
export async function deleteItem(
  itemId: string,
  type: 'note' | 'folder' = 'note'
) {
  try {
    // if (type === 'note') {
    //   await items().doc(itemId).delete();
    //   return;
    // }

    _deleteFolder(itemId);
  } catch (err) {
    throw err;
  }
}

async function _deleteFolder(itemId: string) {
  try {
    // await items().doc(itemId).delete();

    let relatedItems: Array<firestore.DocumentData> = [];

    const getRelatedItems = async (itemId: string) => {
      const myItems = await items().where('parentFolderId', '==', itemId).get();

      myItems.docs.forEach(async (doc) => {
        if ((doc.data() as ItemDocumentType).type === 'folder') {
          await getRelatedItems(doc.id);
        }
      });

      console.log(myItems.docs);

      relatedItems.push(myItems.docs);
    };

    await getRelatedItems(itemId);

    relatedItems.forEach((v) => console.log(v));

    // const getRelatedItems = async (itemId: string) => {
    //   return await items()
    //     .where('parentFolderId', '==', itemId)
    //     .get()
    //     .then((result) => {
    //       result.forEach(async (item) => {
    //         console.log(item);

    //         relatedItems.push(item);

    //         /**
    //          * If the current item is a folder we get all the children of this
    //          * current item as well.
    //          */
    //         if ((item.data() as ItemDocumentType).type === 'folder') {
    //           const recurItems = await getRelatedItems(item.id);
    //           relatedItems = [...recurItems, ...relatedItems];
    //         }
    //       });

    //       return relatedItems;
    //     });
    // };
  } catch (err) {
    throw err;
  }
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
 * @param searchedTerm When some string is passed, items will be filtered by this term
 * @param limit Amount of data to be returned
 * @param lastOrderId 'orderId' of the last note or folder rendered on the page
 */
export async function getAllItemsPagination(
  userUID: string,
  parentFolderId: string | null,
  searchedTerm: string | null,
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

    /**
     * Applies 'array-contains' search.
     */
    if (searchedTerm) {
      fetchedItems = fetchedItems.where(
        'titleKeywords',
        'array-contains',
        searchedTerm.toLowerCase()
      );
    }

    return (await fetchedItems.get()).docs.map(
      (doc) =>
        ({ documentId: doc.id, ...doc.data() } as ItemDocumenttWithIDType)
    );
  } catch (err) {
    throw err;
  }
}

/**
 * Creates a folder and moves both dragging and dropping items
 * into it.
 *
 * The document ID of the new folder is returned.
 *
 * @param userUID Folder's title
 * @param userUID User's ID
 * @param parentFolderId Folder's ID where the items belong
 * @param draggingItemId The item's ID that was dragged
 * @param droppingItemId The item's ID that receives the dragged item
 */
export async function createFolderAndMoveItemsIntoIt(
  title: string,
  userUID: string,
  parentFolderId: string | null,
  draggingItemId: string,
  droppingItemId: string
) {
  try {
    const nextOrderId =
      ((await getLastItemFromFolder(parentFolderId, userUID))?.orderId || 0) +
      1;

    /**
     * Create the new folder
     */
    const newParentFolderId = await createItem({
      userUID,
      parentFolderId,
      type: 'folder',
      title,
      titleKeywords: generateTitleKeywords(title),
      orderId: nextOrderId,
      createdAt: new Date(),
    });

    /**
     * Move items into the new folder
     */
    await items()
      .doc(draggingItemId)
      .update('parentFolderId', newParentFolderId);
    await items()
      .doc(droppingItemId)
      .update('parentFolderId', newParentFolderId);

    return newParentFolderId;
  } catch (err) {
    throw err;
  }
}

/**
 * Returns an object containing the breadcrumbs already formated.
 *
 * @param folderId Current folder's document ID
 */
export async function getBreadcrumbs(
  folderId: string | null
): Promise<BreadcrumbsStateType> {
  try {
    if (!folderId) {
      return {
        currentFolder: null,
        previousFolders: [null],
      };
    }

    let folderRef = await items().doc(folderId).get();

    const previousFolders: FolderType[] = [];
    const currentFolder = {
      id: folderRef.id,
      parentFolderId: folderRef.data()?.parentFolderId,
      title: folderRef.data()?.title,
    };

    /**
     * Adds the current folder to the previous folders array.
     */
    previousFolders.push(currentFolder);

    /**
     * Keeps fetching the folders until it reaches the last folder for the
     * breadcrumbs (the folder which its 'parentFolderId' property is null).
     */
    while (folderRef.data()?.parentFolderId) {
      folderRef = await items().doc(folderRef.data()?.parentFolderId).get();

      previousFolders.push({
        id: folderRef.id,
        parentFolderId: folderRef.data()?.parentFolderId,
        title: folderRef.data()?.title,
      });
    }

    return {
      currentFolder,
      /**
       * The 'null' value is to represent the root folder and the array is reversed to stay
       * in tune with the order of the breadcrumbs.
       */
      previousFolders: [null, ...previousFolders.reverse()],
    };
  } catch (err) {
    throw err;
  }
}

/**
 * Takes two items and change their places in the folder by attributing 'item1.orderId'
 * to 'item2.orderId' and vice-versa.
 *
 * @param item1 Item 1
 * @param item2 Item 2
 */
export async function changePlaces(
  item1: DragAndDropItemType,
  item2: DragAndDropItemType
) {
  try {
    await items().doc(item1.id).update({ orderId: item2.orderId });
    await items().doc(item2.id).update({ orderId: item1.orderId });
  } catch (err) {
    throw err;
  }
}

/**
 * Moves an item to another folder.
 *
 * @param itemToBeMovedId Document ID of the item to be moved into another folder
 * @param newParentFolderId Document ID of the folder that item is being moved to
 */
export async function moveItem(
  itemToBeMovedId: string,
  newParentFolderId: string | null
) {
  return items()
    .doc(itemToBeMovedId)
    .update({ parentFolderId: newParentFolderId });
}
