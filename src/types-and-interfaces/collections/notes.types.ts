import { OutputData } from '@editorjs/editorjs';
import { FirebaseTimestamps } from '../firebase.types';

export type NoteDocumentType = {
  /**
   * The UID of the user who owns the note.
   */
  userUID: string;

  /**
   * The folder where this note comes from.
   *
   * If 'null' the note comes from 'root' folder.
   */
  folderId: string | null;

  /**
   * The note's title.
   */
  title: string | undefined | null;

  /**
   * The note's data based on 'OutputData' from 'editorjs'.
   */
  data: OutputData | undefined | null;

  /**
   * This is a reference number to the order position in the parent
   * folder.
   */
  orderId: number | null;

  /**
   * Date that user created the note.
   */
  createdAt: Date | FirebaseTimestamps;
};

export type NoteDocumentWithIDType = { documentId: string } & NoteDocumentType;
