export type NoteOrFolderStringsLowerCasedType = 'note' | 'folder';
export type NoteOrFolderStringsUpperCasedType = 'NOTE' | 'FOLDER';

export type NoteOrFolderType = {
  id: string;
  parentFolderId: string | null;
  type: NoteOrFolderStringsLowerCasedType;
  title?: string;
};

export type DropActionTypes =
  | 'dropping-note-over-folder'
  | 'dropping-note-over-note'
  | 'dropping-folder-over-note'
  | 'dropping-folder-over-folder';

export type DragAndDropItemType = {
  type: NoteOrFolderStringsUpperCasedType;
  id: string;
};

export type GetDropActionType = (
  draggingItemType: NoteOrFolderStringsLowerCasedType,
  droppingItemType: NoteOrFolderStringsLowerCasedType
) => DropActionTypes | undefined;

export type CurrentDnDItemsType = {
  draggingItem: DragAndDropItemType;
  droppingItem: DragAndDropItemType;
};
