import firebase from '../firebase';
import 'firebase/firestore';

// Types
import { NoteDocumentType } from '../types-and-interfaces/collections/notes.types';

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

async function getNote(
  noteId: string
): Promise<{ id: string } & NoteDocumentType> {
  try {
    const note = await notes().doc(noteId).get();

    return {
      id: note.id,
      ...(note.data() as NoteDocumentType),
    };
  } catch (err) {
    throw err;
  }
}

export { updateNote, getNote };
