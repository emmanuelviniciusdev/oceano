import { OutputData } from '@editorjs/editorjs';
import { DocumentIDType, FirebaseTimestamps } from '../firebase.types';

export type ItemDocumentType = {
  /**
   * The UID of the user who owns the item.
   */
  userUID: string;

  /**
   * The folder where this item comes from.
   *
   * If 'null' this item comes from 'root' folder.
   */
  parentFolderId: string | null;

  /**
   * Indicates the type of the item.
   */
  type: 'note' | 'folder';

  /**
   * The title of the item.
   */
  title: string;

  /**
   * Title's keywords to perform an 'array-contains' search.
   */
  titleKeywords?: string[];

  /**
   * This property is for keeping the note data if the item is of 'note' type.
   *
   * This is based on 'OutputData' from 'editorjs'.
   */
  data?: OutputData | null;

  /**
   * This is a reference number to the order position in the parent
   * folder.
   */
  orderId: number;

  /**
   * Date that user created the item.
   */
  createdAt: Date | FirebaseTimestamps;
};

export type ItemDocumenttWithIDType = DocumentIDType & ItemDocumentType;
