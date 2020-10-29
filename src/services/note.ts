import firebase from '../firebase';
import 'firebase/firestore';

// Types
import {
  NoteDocumentType,
  NoteDocumentWithIDType,
} from '../types-and-interfaces/collections/notes.types';

// Utils
import { OceanoErrorConstructed } from '../utils';

// Services
import { getLastFolderFromFolder } from './folder';

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
 */
async function getLastNoteFromFolder(folderId: string | null) {
  return notes()
    .where('folderId', '==', folderId)
    .orderBy('orderId', 'desc')
    .limit(1)
    .get()
    .then((notes) =>
      !notes.empty ? (notes.docs[0].data() as NoteDocumentType) : null
    );
}

export { updateNote, getNote, createNote, deleteNote, getLastNoteFromFolder };
