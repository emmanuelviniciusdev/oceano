import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import { MotionDivWrapperNoteOrFolder, WrapperOceanoCard } from './styles';
import { StackNotifications, OceanoBubbleLoading } from '../../styles/general';

// Components
import NoteOrFolder from '../NoteOrFolder/NoteOrFolder';
import OceanoCard from '../OceanoCard/OceanoCard';
import OceanoNotification from '../OceanoNotification/OceanoNotification';

// Types
import { NotesAndFoldersType } from '../../types-and-interfaces/components/NotesAndFolders.types';
import { ItemDocumenttWithIDType } from '../../types-and-interfaces/collections/items.types';

// Services
import { getAllItemsPagination } from '../../services/item';

// Setup
import { AppContext } from '../../store';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const NotesAndFolders: React.FunctionComponent<NotesAndFoldersType> = ({
  folderId,
}) => {
  const translation = useTranslation('NotesAndFolders');

  const { user: userContext, topBar: topBarContext } = useContext(AppContext);

  const [fetchedItems, setFetchedItems] = useState<ItemDocumenttWithIDType[]>();
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [errorLoadingItems, setErrorLoadingItems] = useState(false);

  /**
   * Fetches all item from API "on demand".
   *
   * @param search The word to be searched
   */
  const searchItems = async (search?: string, lastOrderId?: number) => {
    if (!userContext?.state?.uid) return;

    setIsLoadingItems(true);

    try {
      const items = await getAllItemsPagination(
        userContext?.state?.uid,
        null,
        search || null,
        lastOrderId || null,
        9
      );

      /**
       * // FIXME: Rendering bugs
       *
       * 1. When the user searches for something and then clear the search input,
       * the item that the user has been searched appears as the first rendered
       * item.
       *
       * 2. Sometimes when the user searches for something, as much as there is
       * some result, it doesn't appear.
       */
      setFetchedItems((alreadyFetchedItems) =>
        !search ? [...(alreadyFetchedItems || []), ...items] : items
      );
    } catch (err) {
      console.error(err);
      setErrorLoadingItems(true);
    } finally {
      setIsLoadingItems(false);
    }
  };

  /**
   * Triggers 'searchItems()' whenever the searched term changes.
   */
  useEffect(() => {
    searchItems(topBarContext?.state?.searchedTerm);
  }, [topBarContext?.state?.searchedTerm]);

  /**
   * Listens to 'window.onscroll' event.
   */
  useEffect(() => {
    window.onscroll = () => {
      /**
       * Sums '100' to scrollHeight because of the margin bottom of 100px in the
       * parent container (App.tsx).
       */
      if (
        window.pageYOffset + window.innerHeight >=
        document.body.scrollHeight + 100
      ) {
        if (fetchedItems && fetchedItems.length > 0) {
          /**
           * In order to have the last 'orderId', we just need to get the last item from array
           * because the data is already sorted in descending order.
           */
          searchItems(
            topBarContext?.state?.searchedTerm,
            fetchedItems[fetchedItems.length - 1].orderId || undefined
          );
        }
      }
    };

    return () => {
      window.onscroll = null;
    };
  }, [fetchedItems]);

  return (
    <>
      {errorLoadingItems && (
        <WrapperOceanoCard>
          <OceanoCard
            theme="error"
            text={translation?.errorLoadingItemsMsg(
              userContext?.state?.displayName
            )}
          ></OceanoCard>
        </WrapperOceanoCard>
      )}

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

      <StackNotifications>
        <AnimatePresence>
          {isLoadingItems && (
            <OceanoNotification
              key="indicator-loading-items"
              type="clownfish"
              icon={
                <OceanoBubbleLoading
                  className="oceano-bubble-loading"
                  width={24}
                  height={24}
                />
              }
              timeout={2000}
            >
              {translation?.loadingItemsMsg}
            </OceanoNotification>
          )}
        </AnimatePresence>
      </StackNotifications>
    </>
  );
};

export default NotesAndFolders;
