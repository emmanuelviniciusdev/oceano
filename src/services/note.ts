import firebase from '../firebase';
import 'firebase/firestore';

// Types
import {
  NoteDocumentType,
  NoteDocumentWithIDType,
} from '../types-and-interfaces/collections/notes.types';

// Utils
import { OceanoErrorConstructed } from '../utils';

const notes = () => firebase.firestore().collection('notes');

/**
 * Updates note's data
 *
 * @param noteId Note's document ID
 * @param data Note's data
 */
function updateNote(noteId: string, data: NoteDocumentType) {
  return notes().doc(noteId).update(data);
}

/**
 * // TODO: Filter by user UID
 *
 * Gets note's data
 *
 * @param noteId Note's document ID
 */
async function getNote(noteId: string): Promise<NoteDocumentWithIDType> {
  try {
    const note = await notes().doc(noteId).get();

    if (!note.exists) {
      throw OceanoErrorConstructed(undefined, {
        code: 'oceano-note/note-does-not-exist',
      });
    }

    return {
      documentId: note.id,
      ...(note.data() as NoteDocumentType),
    };
  } catch (err) {
    throw err;
  }
}

/**
 * Gets all notes "on demand" based on 'lastOrderId'.
 *
 * When passing the 'lastOrderId' parameter, the first items returned that have the value of
 * 'orderId' less than the value of 'lastOrderId' will be returned.
 *
 * @param userUID User's ID
 * @param lastOrderId 'orderId' of the last note rendered on the page
 * @param limit Amount of data to be returned
 */
async function getAllNotesPagination(
  userUID: string,
  lastOrderId?: number,
  limit: number = 5
) {
  try {
    let fetchedNotes = notes()
      .where('userUID', '==', userUID)
      .orderBy('orderId', 'desc')
      .limit(limit);

    if (lastOrderId) fetchedNotes = fetchedNotes.startAfter(lastOrderId);

    return (await fetchedNotes.get()).docs.map(
      (doc) => ({ documentId: doc.id, ...doc.data() } as NoteDocumentWithIDType)
    );
  } catch (err) {
    throw err;
  }
}

/**
 * Creates a note and returns the document ID
 *
 * @param data The note's data
 */
function createNote(data: NoteDocumentType) {
  return notes()
    .add(data)
    .then((note) => note.id);
}

/**
 * Deletes a note
 *
 * @param noteId Note's document ID
 */
function deleteNote(noteId: string) {
  return notes().doc(noteId).delete();
}

/**
 * Get the last note from a folder based on note's 'orderId' property.
 *
 * The higher 'orderId' value indicates the last note.
 *
 * @param folderId Folder's document ID
 * @param userUID User's ID
 */
async function getLastNoteFromFolder(folderId: string | null, userUID: string) {
  return notes()
    .where('userUID', '==', userUID)
    .where('folderId', '==', folderId)
    .orderBy('orderId', 'desc')
    .limit(1)
    .get()
    .then((notes) =>
      !notes.empty ? (notes.docs[0].data() as NoteDocumentType) : null
    );
}

export {
  notes as notesCollectionRef,
  updateNote,
  getNote,
  createNote,
  deleteNote,
  getLastNoteFromFolder,
  getAllNotesPagination,
};
