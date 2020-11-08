export type NoteOrFolderStringsLowerCasedType = 'note' | 'folder';
export type NoteOrFolderStringsUpperCasedType = 'NOTE' | 'FOLDER';

export type NoteOrFolderType = {
  /**
   * Item's document ID
   */
  id: string;

  /**
   * Item's parent folder ID
   */
  parentFolderId: string | null;

  /**
   * Item's order ID
   */
  orderId: number;

  /**
   * Item's type
   */
  type: NoteOrFolderStringsLowerCasedType;

  /**
   * Item's title
   */
  title?: string;

  /**
   * Triggers when two items change their places
   * in the folder
   */
  onChangePlaces: (
    item1: DragAndDropItemType,
    item2: DragAndDropItemType
  ) => void;

  /**
   * Triggers when an item is deleted
   */
  onDeleteItem: (itemId: string) => void;
};

export type DropActionTypes =
  | 'dropping-note-over-folder'
  | 'dropping-note-over-note'
  | 'dropping-folder-over-note'
  | 'dropping-folder-over-folder';

export type DragAndDropItemType = {
  type: NoteOrFolderStringsUpperCasedType;
  id: string;
  orderId: number;
};

export type GetDropActionType = (
  draggingItemType: NoteOrFolderStringsLowerCasedType,
  droppingItemType: NoteOrFolderStringsLowerCasedType
) => DropActionTypes | undefined;

export type CurrentDnDItemsType = {
  draggingItem: DragAndDropItemType;
  droppingItem: DragAndDropItemType;
};
