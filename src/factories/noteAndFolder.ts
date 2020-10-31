// Types
import {
  FolderDocumentWithIDAndItemTypeType,
  FolderDocumentWithIDType,
} from '../types-and-interfaces/collections/folders.types';
import {
  NoteDocumentWithIDAndItemTypeType,
  NoteDocumentWithIDType,
} from '../types-and-interfaces/collections/notes.types';

/**
 * This function joins both 'notes' and 'folders' arrays and sort them in
 * descending order by 'orderId' property.
 *
 * @param notes Array of notes
 * @param folders Array of folders
 */
function joinNotesAndFoldersArrays(
  notes: NoteDocumentWithIDType[],
  folders: FolderDocumentWithIDType[]
) {
  /**
   * Place the 'itemType' property on both arrays and transform their types to
   * identify them.
   */
  const notesWithType = notes.map((note) => ({
    ...note,
    itemType: 'note',
  })) as NoteDocumentWithIDAndItemTypeType[];

  const foldersWithType = folders.map((folder) => ({
    ...folder,
    itemType: 'folder',
  })) as FolderDocumentWithIDAndItemTypeType[];

  /**
   * Returns the arrays joined and ordered by the 'orderId' property in descending
   * order.
   */
  return [...notesWithType, ...foldersWithType].sort(
    (a, b) => (b.orderId || 0) - (a.orderId || 0)
  );
}

export { joinNotesAndFoldersArrays };
