import { OutputData } from '@editorjs/editorjs';

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
  title: string | undefined;

  /**
   * The note's data based on 'OutputData' from 'editorjs'.
   */
  data: OutputData | undefined;
};

export type NoteDocumentWithIDType = { documentId: string } & NoteDocumentType;
