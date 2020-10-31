import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Styles
import { MotionDivWrapperNoteOrFolder } from './styles';

// Components
import NoteOrFolder from '../NoteOrFolder/NoteOrFolder';

// Types
import { NotesAndFoldersType } from '../../types-and-interfaces/components/NotesAndFolders.types';
import { ItemDocumenttWithIDType } from '../../types-and-interfaces/collections/items.types';

// Services
import { getAllItemsPagination } from '../../services/item';

// tests
import { AppContext } from '../../store';

const NotesAndFolders: React.FunctionComponent<NotesAndFoldersType> = ({
  folderId,
}) => {
  const { user: userContext } = useContext(AppContext);

  const [fetchedItems, setFetchedItems] = useState<ItemDocumenttWithIDType[]>();
  const [lastOrderId, setLastOrderId] = useState<number | null>(null);

  /**
   * Fetches all item from API "on demand".
   *
   * @param search The word to be searched
   */
  const searchItems = async (search?: string) => {
    if (!userContext?.state) return;

    try {
      const items = await getAllItemsPagination(
        userContext.state.uid,
        null,
        lastOrderId,
        12
      );

      setFetchedItems((stateItems) =>
        stateItems ? [...stateItems, ...items] : items
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    searchItems();
  }, []);

  /**
   * Sets the new 'lastOrderId' whenever 'fetchedItems' changes.
   */
  useEffect(() => {
    if (fetchedItems) {
      /**
       * We just need to get the last item from array because the data are
       * already sorted in descending order.
       */
      setLastOrderId(fetchedItems[fetchedItems.length - 1].orderId);
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
              <NoteOrFolder
                id={item.documentId}
                type={item.type}
                title={item.title || undefined}
              />
            </motion.div>
          </MotionDivWrapperNoteOrFolder>
        ))}
    </>
  );
};

export default NotesAndFolders;
