export type FolderDocumentType = {
  /**
   * The UID of the user who owns the folder.
   */
  userUID: string;

  /**
   * The folder where this folder comes from.
   *
   * If 'null' this folder comes from 'root' folder.
   */
  parentFolderId: string | null;

  /**
   * The title of the folder.
   */
  title: string;
};
