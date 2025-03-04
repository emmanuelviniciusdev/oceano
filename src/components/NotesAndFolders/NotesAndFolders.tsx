import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Assets
import cryingYellowSeahorse from '../../assets/images/crying-yellow-seahorse.png';
import octopus2 from '../../assets/images/octopus-2.png';

// Styles
import {
  BoxResult,
  BoxResultImage,
  BoxResultText,
  BoxResultTitle,
  MotionDivWrapperNoteOrFolder,
  WrapperOceanoCard,
} from './styles';
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
import { DragAndDropItemType } from '../../types-and-interfaces/components/NoteOrFolder.types';

const NotesAndFolders: React.FunctionComponent<NotesAndFoldersType> = ({
  folderId,
}) => {
  const translation = useTranslation('NotesAndFolders');

  const {
    user: userContext,
    topBar: topBarContext,
    breadcrumbs: breadcrumbsContext,
  } = useContext(AppContext);

  const [fetchedItems, setFetchedItems] = useState<ItemDocumenttWithIDType[]>();
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [errorLoadingItems, setErrorLoadingItems] = useState(false);

  /**
   * Fetches all item from API "on demand".
   *
   * @param search The word to be searched
   * @param lastOrderId 'orderId' of the last note or folder rendered on the page
   * @param parentFolderId Folder's ID where the items belong
   * @param accumulateItems Defines if items will be accumulated in the rendering or not
   */
  const searchItems = async (
    search?: string,
    lastOrderId?: number,
    parentFolderId?: string,
    accumulateItems?: boolean
  ) => {
    if (!userContext?.state?.uid) return;

    setIsLoadingItems(true);

    try {
      const items = await getAllItemsPagination(
        userContext?.state?.uid,
        parentFolderId || null,
        search || null,
        lastOrderId || null,
        9
      );

      setFetchedItems((alreadyFetchedItems) =>
        accumulateItems ? [...(alreadyFetchedItems || []), ...items] : items
      );
    } catch (err) {
      console.error(err);
      setErrorLoadingItems(true);
    } finally {
      setIsLoadingItems(false);
    }
  };
  /**
   * Searches for items whenever the searched term or the current folder
   * changes.
   */
  useLayoutEffect(() => {
    searchItems(
      topBarContext?.state?.searchedTerm,
      undefined,
      breadcrumbsContext?.state.currentFolder?.id
    );
  }, [
    topBarContext?.state?.searchedTerm,
    breadcrumbsContext?.state.currentFolder,
  ]);

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
            fetchedItems[fetchedItems.length - 1].orderId || undefined,
            breadcrumbsContext?.state.currentFolder?.id,
            true
          );
        }
      }
    };

    return () => {
      window.onscroll = null;
    };
  }, [fetchedItems]);

  const handleChangePlaces = (
    item1: DragAndDropItemType,
    item2: DragAndDropItemType
  ) => {
    setFetchedItems((items) => {
      if (items) {
        const findIndex = (documentId: string) =>
          items.findIndex((item) => item.documentId === documentId);

        const item1Index = findIndex(item1.id);
        const item2Index = findIndex(item2.id);

        if (item1Index !== -1 && item2Index !== -1) {
          const newItem1 = { ...items[item2Index], orderId: item1.orderId };
          const newItem2 = { ...items[item1Index], orderId: item2.orderId };

          items[item1Index] = newItem1;
          items[item2Index] = newItem2;
        }

        return [...items];
      }
    });
  };

  const handleDeleteItem = (itemId: string) =>
    setFetchedItems(
      (items) => items && items.filter((item) => item.documentId !== itemId)
    );

  return (
    <>
      {/* Error loading items */}
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

      {/* No results */}
      {!isLoadingItems && fetchedItems && fetchedItems.length === 0 && (
        <>
          {topBarContext?.state?.searchedTerm ? (
            // Search not found
            <>
              <BoxResult>
                <BoxResultTitle
                  dangerouslySetInnerHTML={{
                    __html: translation?.boxNoResults?.title,
                  }}
                />
                <BoxResultText
                  dangerouslySetInnerHTML={{
                    __html: translation?.boxNoResults?.text,
                  }}
                />
                <BoxResultImage
                  style={{ width: '180px' }}
                  src={cryingYellowSeahorse}
                  title={translation?.boxNoResults?.image?.alt}
                  alt={translation?.boxNoResults?.image?.alt}
                />
              </BoxResult>
            </>
          ) : (
            // No created notes
            <>
              <BoxResult>
                <BoxResultTitle
                  dangerouslySetInnerHTML={{
                    __html: translation?.boxNoCreatedNotes?.title(
                      userContext?.state?.displayName
                    ),
                  }}
                />
                <BoxResultText
                  dangerouslySetInnerHTML={{
                    __html: translation?.boxNoCreatedNotes?.text,
                  }}
                />
                <BoxResultImage
                  style={{ width: '180px' }}
                  src={octopus2}
                  title={translation?.boxNoCreatedNotes?.image?.alt}
                  alt={translation?.boxNoCreatedNotes?.image?.alt}
                />
              </BoxResult>
            </>
          )}
        </>
      )}

      {/* Results */}
      {fetchedItems &&
        fetchedItems.length > 0 &&
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
                parentFolderId={item.parentFolderId}
                orderId={item.orderId}
                type={item.type}
                title={item.title || undefined}
                onChangePlaces={handleChangePlaces}
                onDeleteItem={handleDeleteItem}
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
