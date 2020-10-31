import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Styles
import { MotionDivWrapperNoteOrFolder } from './styles';

// Components
import NoteOrFolder from '../NoteOrFolder/NoteOrFolder';

// Types
import { NotesAndFoldersType } from '../../types-and-interfaces/components/NotesAndFolders.types';
import {
  NoteDocumentWithIDAndItemTypeType,
  NoteDocumentWithIDType,
} from '../../types-and-interfaces/collections/notes.types';
import {
  FolderDocumentWithIDAndItemTypeType,
  FolderDocumentWithIDType,
} from '../../types-and-interfaces/collections/folders.types';

// Helpers
import { getAllItemsPagination } from '../../helpers/noteAndFolder';

// Factories
import { joinNotesAndFoldersArrays } from '../../factories/noteAndFolder';

// tests
import { AppContext } from '../../store';

const NotesAndFolders: React.FunctionComponent<NotesAndFoldersType> = ({
  folderId,
}) => {
  const { user: userContext } = useContext(AppContext);

  const [fetchedItems, setFetchedItems] = useState<
    (NoteDocumentWithIDAndItemTypeType | FolderDocumentWithIDAndItemTypeType)[]
  >();
  const [lastOrderIdNote, setLastOrderIdNote] = useState<number | null>(null);
  const [lastOrderIdFolder, setLastOrderIdFolder] = useState<number | null>(
    null
  );

  /**
   * Fetches all notes and folders from API "on demand".
   *
   * @param search The word to be searched
   */
  const searchItems = async (search?: string) => {
    if (!userContext?.state) return;

    try {
      const limit = 6;

      let notes = await getAllItemsPagination<NoteDocumentWithIDType>(
        'notes',
        userContext.state.uid,
        null,
        lastOrderIdNote,
        limit
      );

      let folders = await getAllItemsPagination<FolderDocumentWithIDType>(
        'folders',
        userContext.state.uid,
        null,
        lastOrderIdFolder,
        limit
      );

      /**
       * If the amount of notes or folders brought from API is less than that defined
       * in the limit, it tries to fetch more data to fill the entire page.
       */
      if (folders.length < limit && notes.length === limit) {
        notes = await getAllItemsPagination<NoteDocumentWithIDType>(
          'notes',
          userContext.state.uid,
          null,
          lastOrderIdNote,
          limit + (limit - folders.length)
        );
      } else if (notes.length < limit && folders.length === limit) {
        folders = await getAllItemsPagination<FolderDocumentWithIDType>(
          'folders',
          userContext.state.uid,
          null,
          lastOrderIdFolder,
          limit + (limit - notes.length)
        );
      }

      const joinedFetchedItems = joinNotesAndFoldersArrays(notes, folders);

      setFetchedItems((items) =>
        items ? [...items, ...joinedFetchedItems] : joinedFetchedItems
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    searchItems();
  }, []);

  /**
   * Sets the new 'lastOrderIdNote' and 'lastOrderIdFolder' whenever 'fetchedItems'
   * changes.
   */
  useEffect(() => {
    if (fetchedItems) {
      const notes = fetchedItems.filter((item) => item.itemType === 'note');
      const folders = fetchedItems.filter((item) => item.itemType === 'folder');

      /**
       * We just need to get the last items from arrays because the data are
       * already sorted.
       */
      const lastOrderIdNoteRef = notes[notes.length - 1].orderId;
      const lastOrderIdFolderRef = folders[folders.length - 1].orderId;

      setLastOrderIdNote(lastOrderIdNoteRef);
      setLastOrderIdFolder(lastOrderIdFolderRef);
    }
  }, [fetchedItems]);

  return (
    <>
      {fetchedItems &&
        fetchedItems.map((item, arrayIndex) => (
          <MotionDivWrapperNoteOrFolder key={arrayIndex}>
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              variants={{
                initial: {
                  opacity: 0,
                  scale: 1.2,
                },
                animate: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: arrayIndex % 2 === 0 ? 0.4 : 0.5,
                  },
                },
              }}
            >
              {/* Remember that 'item' can be of type 'NoteDocumentWithIDAndItemTypeType' or
              'FolderDocumentWithIDAndItemTypeType' */}
              <NoteOrFolder
                id={item.documentId}
                type={item.itemType}
                title={item.title || undefined}
              />
            </motion.div>
          </MotionDivWrapperNoteOrFolder>
        ))}
      {/* {Array.from({ length: 7 }).map((v, arrayIndex) => (
        <MotionDivWrapperNoteOrFolder key={arrayIndex}>
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            variants={{
              initial: {
                opacity: 0,
                scale: 1.2,
              },
              animate: {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: arrayIndex % 2 === 0 ? 0.4 : 0.5,
                },
              },
            }}
          >
            <NoteOrFolder
              id={String(Math.random())}
              type={arrayIndex % 2 === 0 ? 'note' : 'folder'}
              title={arrayIndex === 1 ? 'Minha nova super pasta!!!' : undefined}
            />
          </motion.div>
        </MotionDivWrapperNoteOrFolder>
      ))} */}
    </>
  );
};

export default NotesAndFolders;
