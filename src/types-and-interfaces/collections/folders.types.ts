import { DocumentIDType, FirebaseTimestamps } from '../firebase.types';

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

  /**
   * This is a reference number to the order position in the parent
   * folder.
   */
  orderId: number | null;

  /**
   * Date that user created the folder.
   */
  createdAt: Date | FirebaseTimestamps;
};

export type FolderDocumentWithIDType = DocumentIDType & FolderDocumentType;
