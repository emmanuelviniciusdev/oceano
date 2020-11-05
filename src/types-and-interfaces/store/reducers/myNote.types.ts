export type MyNoteStateType = {
  /**
   * The note's ID
   */
  noteId: string;

  /**
   * The parent folder's ID of the note
   */
  parentFolderId: string | null;
};
