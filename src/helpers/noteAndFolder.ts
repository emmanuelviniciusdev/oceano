// Services
import { getLastFolderFromFolder } from '../services/folder';
import { getLastNoteFromFolder } from '../services/note';

/**
 * Generates the next 'orderId' based on the 'orderId' property of the last items from
 * 'folders' and 'notes' collections.
 *
 * @param folderId Folder document's ID
 */
async function generatesNextOrderId(folderId: string | null) {
  try {
    const lastOrderIdNote =
      (await getLastNoteFromFolder(folderId))?.orderId || 0;
    const lastOrderIdFolder =
      (await getLastFolderFromFolder(folderId))?.orderId || 0;

    return Math.max(lastOrderIdNote, lastOrderIdFolder) + 1;
  } catch (err) {
    throw err;
  }
}

export { generatesNextOrderId };
