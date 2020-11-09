import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { AnimatePresence } from 'framer-motion';

// Icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SaveIcon from '@material-ui/icons/Save';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import LayersIcon from '@material-ui/icons/Layers';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import AddIcon from '@material-ui/icons/Add';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

// Styles
import { StyledNoteOrFolder, WrapperBtnSaveTitle } from './styles';
import { StackNotifications } from '../../styles/general';

// Components
import OceanoModal from '../OceanoModal/OceanoModal';
import OceanoContextMenu from '../OceanoContextMenu/OceanoContextMenu';
import OceanoButton from '../OceanoButton/OceanoButton';
import OceanoInputText from '../OceanoInputText/OceanoInputText';
import OceanoNotification from '../OceanoNotification/OceanoNotification';

// Types
import {
  NoteOrFolderType,
  DragAndDropItemType,
  DropActionTypes,
  GetDropActionType,
  NoteOrFolderStringsLowerCasedType,
  CurrentDnDItemsType,
  NoteOrFolderStringsUpperCasedType,
} from '../../types-and-interfaces/components/NoteOrFolder.types';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';
import useGeneralErrors from '../../hooks/useGeneralErros';

// Services
import {
  changePlaces,
  createFolderAndMoveItemsIntoIt,
  deleteItem,
  moveItem,
  updateTitle,
} from '../../services/item';

// Setup
import { AppContext } from '../../store';
import breadcrumbsReducer from '../../store/reducers/breadcrumbs';
import topbarReducer from '../../store/reducers/topBar';

// Utils
import { limitTitleLength } from '../../utils';

const NoteOrFolder: React.FunctionComponent<NoteOrFolderType> = ({
  id,
  parentFolderId,
  orderId,
  type,
  title,
  onChangePlaces,
  onDeleteItem,
}) => {
  const isComponentUnmounted = useRef(false);

  const noteOrFolderRef = useRef<HTMLDivElement | null>(null);
  const textareaToEditTitleRef = useRef<HTMLTextAreaElement | null>(null);

  const translation = useTranslation('NoteOrFolder');
  const {
    getErrorsBy,
    addGeneralError,
    removeGeneralErrorBy,
  } = useGeneralErrors();

  const {
    user: userContext,
    breadcrumbs: breadcrumbsContext,
    topBar: topBarContext,
  } = useContext(AppContext);

  const history = useHistory();

  /**
   * Modals' states
   */
  const [isDnDModalOpened, setIsDnDModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [
    isCreateNewFolderModalOpened,
    setIsCreateNewFolderModalOpened,
  ] = useState(false);

  /**
   * Common states
   */
  const [updatedTitle, setUpdatedTitle] = useState<string>();
  const [isRenaming, setIsRenaming] = useState(false);
  const [isRenamingLoading, setIsRenamingLoading] = useState(false);
  const [isCreatingNewFolder, setIsCreatingNewFolder] = useState(false);
  const [isChangingPlaces, setIsChangingPlaces] = useState(false);
  const [isMovingItem, setIsMovingItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [dropActionType, setDropActionType] = useState<DropActionTypes | ''>(
    ''
  );
  const [currentDnDItems, setCurrentDnDItems] = useState<CurrentDnDItemsType>();
  const [newFolderTitle, setNewFolderTitle] = useState<string>('');

  const [, connectDragSource] = useDrag({
    item: { id, type: type.toUpperCase(), orderId } as DragAndDropItemType,
  });

  const [, connectDropSource] = useDrop({
    accept: ['NOTE', 'FOLDER'],
    drop: (item: DragAndDropItemType) => {
      /**
       * The props from 'item' is from the dragging item.
       * The props from the component itself is from the dropping item.
       */
      if (item.id === id) return;

      const returnedDropActionType = getDropActionType(
        item.type.toLowerCase() as NoteOrFolderStringsLowerCasedType,
        type
      );

      if (!returnedDropActionType) return;

      setDropActionType(returnedDropActionType);
      setCurrentDnDItems({
        draggingItem: item,
        droppingItem: {
          id,
          orderId,
          type: type.toUpperCase() as NoteOrFolderStringsUpperCasedType,
        },
      });
      setIsDnDModalOpened(true);
    },
  });

  const getDropActionType: GetDropActionType = (
    draggingItemType: NoteOrFolderStringsLowerCasedType,
    droppingItemType: NoteOrFolderStringsLowerCasedType
  ) => {
    if (draggingItemType === 'note' && droppingItemType === 'note')
      return 'dropping-note-over-note';

    if (draggingItemType === 'note' && droppingItemType === 'folder')
      return 'dropping-note-over-folder';

    if (draggingItemType === 'folder' && droppingItemType === 'folder')
      return 'dropping-folder-over-folder';

    if (draggingItemType === 'folder' && droppingItemType === 'note')
      return 'dropping-folder-over-note';
  };

  const openItem = (middleClick: boolean = false) => {
    if (!breadcrumbsContext || isRenaming) return;

    if (type === 'folder') {
      /**
       * The current folder will be the folder that user just clicked on (the
       * component itself).
       */
      const currentFolder = {
        id,
        parentFolderId,
        title,
      };

      /**
       * Dispatches the data for the Breadcrumbs.
       */
      breadcrumbsContext.dispatch(
        breadcrumbsReducer.actionCreators.setPreviousFolders([
          ...breadcrumbsContext.state.previousFolders,
          currentFolder,
        ])
      );

      breadcrumbsContext.dispatch(
        breadcrumbsReducer.actionCreators.setCurrentFolder(currentFolder)
      );
    }

    const pushUrls = {
      note: `/minha-nota/${id}`,
      folder: `/notas/${id}`,
    };

    if (middleClick) {
      window.open(window.location.origin + '/#' + pushUrls[type], '__blank');
      return;
    }

    /**
     * Empties search term only if 'openItem()' was not triggered by a middle click.
     */
    topBarContext?.dispatch(topbarReducer.actionCreators.setSearchedTerm(''));

    history.push(pushUrls[type]);
  };

  const dragAndDropConnectionAttach = (e: HTMLDivElement | null) => {
    connectDragSource(e);
    connectDropSource(e);
  };

  const onNoteOrFolderRef = (e: HTMLDivElement | null) => {
    noteOrFolderRef.current = e;
    dragAndDropConnectionAttach(e);
  };

  const renameNoteOrFolder = async () => {
    if (!textareaToEditTitleRef.current) return;

    const newTitle = textareaToEditTitleRef.current.value;

    if (title === newTitle) {
      setIsRenaming(false);
      return;
    }

    setIsRenamingLoading(true);

    try {
      await updateTitle(id, newTitle);
      setUpdatedTitle(newTitle);
    } catch (err) {
      console.error(err);
      if (!isComponentUnmounted.current) {
        addGeneralError('errorRenamingItem');
      }
    } finally {
      if (!isComponentUnmounted.current) {
        setIsRenamingLoading(false);
        setIsRenaming(false);
      }
    }
  };

  const deleteNoteOrFolder = async () => {
    if (!userContext?.state) return;

    setIsDeletingItem(true);

    try {
      await deleteItem(userContext.state.uid, id, type);
      onDeleteItem(id);
    } catch (err) {
      console.error(err);
      if (!isComponentUnmounted.current) {
        addGeneralError('errorDeletingItem');
      }
    } finally {
      if (!isComponentUnmounted.current) {
        setIsDeletingItem(false);
        setIsDeleteModalOpened(false);
      }
    }
  };

  const handleCreateNewFolder = async () => {
    if (!userContext?.state?.uid || !currentDnDItems) return;

    setIsCreatingNewFolder(true);

    try {
      const newFolderId = await createFolderAndMoveItemsIntoIt(
        newFolderTitle,
        userContext.state.uid,
        breadcrumbsContext?.state.currentFolder?.id || null,
        currentDnDItems.draggingItem.id,
        currentDnDItems.droppingItem.id
      );

      history.push('/notas/' + newFolderId);
    } catch (err) {
      console.error(err);

      if (!isComponentUnmounted.current) {
        addGeneralError('errorCreatingNewFolder');
        setIsCreateNewFolderModalOpened(false);
      }
    } finally {
      if (!isComponentUnmounted.current) setIsCreatingNewFolder(false);
    }
  };

  const handleMoveItemIntoFolder = async () => {
    if (
      !currentDnDItems ||
      (currentDnDItems.draggingItem.type === 'NOTE' &&
        currentDnDItems.droppingItem.type === 'NOTE')
    )
      return;

    setIsMovingItem(true);

    try {
      const { draggingItem, droppingItem } = currentDnDItems;

      const itemToBeMoved =
        draggingItem.type === 'FOLDER' && droppingItem.type === 'NOTE'
          ? droppingItem
          : draggingItem;

      const newParentFolder =
        draggingItem.type === 'FOLDER' && droppingItem.type === 'NOTE'
          ? draggingItem
          : droppingItem;

      await moveItem(itemToBeMoved.id, newParentFolder.id);

      history.push(`/notas/${newParentFolder.id}`);
    } catch (err) {
      console.error(err);
      addGeneralError('errorMovingItem');
    } finally {
      if (!isComponentUnmounted.current) {
        setIsMovingItem(false);
        setIsDnDModalOpened(false);
      }
    }
  };

  const handleChangePlaces = async () => {
    if (!currentDnDItems) return;

    setIsChangingPlaces(true);

    try {
      const item1 = currentDnDItems.draggingItem;
      const item2 = currentDnDItems.droppingItem;

      await changePlaces(item1, item2);
      onChangePlaces(item1, item2);
    } catch (err) {
      console.error(err);

      if (!isComponentUnmounted.current) addGeneralError('errorChangePlaces');
    } finally {
      if (!isComponentUnmounted.current) {
        setIsChangingPlaces(false);
        setIsDnDModalOpened(false);
      }
    }
  };

  /**
   * Titles in general
   */
  const defaultTitle = title || translation?.defaultTitles?.[type];
  const contextMenuOpenInNewTabBtnTitle =
    translation?.actionContextmenuLabels?.openInNewTab;
  const contextMenuRenameBtnTitle =
    translation?.actionContextmenuLabels?.[
      type === 'note' ? 'renameNote' : 'renameFolder'
    ];
  const contextMenuDeleteBtnTitle =
    translation?.actionContextmenuLabels?.[
      type === 'note' ? 'deleteNote' : 'deleteFolder'
    ];
  const modalDeleteTitles =
    translation?.actionDeleteModalLabels?.[
      type === 'note' ? 'deletingNote' : 'deletingFolder'
    ];

  useEffect(() => {
    return () => {
      isComponentUnmounted.current = true;
    };
  }, []);

  return (
    <>
      {isDnDModalOpened && (
        <OceanoModal
          onClose={() => setIsDnDModalOpened(false)}
          title={translation?.actionDnDModalLabels?.title}
          text={
            translation?.actionDnDModalLabels?.actionTexts?.[dropActionType]
          }
        >
          <OceanoButton
            style={{ width: 'auto' }}
            icon={<CreateNewFolderIcon />}
            text={
              translation?.actionDnDModalLabels?.actions?.buttonCreateNewFolder
                ?.text
            }
            aria-label={
              translation?.actionDnDModalLabels?.actions?.buttonCreateNewFolder
                ?.text
            }
            onClick={() => {
              setIsDnDModalOpened(false);
              setIsCreateNewFolderModalOpened(true);
            }}
          />
          {dropActionType !== 'dropping-note-over-note' && (
            <OceanoButton
              style={{ width: 'auto' }}
              icon={<LayersIcon />}
              text={
                translation?.actionDnDModalLabels?.actions?.buttonMoveIntoFolder
                  ?.text
              }
              aria-label={
                translation?.actionDnDModalLabels?.actions?.buttonMoveIntoFolder
                  ?.text
              }
              onClick={handleMoveItemIntoFolder}
              disabled={isMovingItem}
              isLoading={isMovingItem}
            />
          )}
          <OceanoButton
            style={{ width: 'auto' }}
            icon={<AutorenewIcon />}
            text={
              translation?.actionDnDModalLabels?.actions?.buttonSwapItems?.text
            }
            aria-label={
              translation?.actionDnDModalLabels?.actions?.buttonSwapItems?.text
            }
            onClick={handleChangePlaces}
            disabled={isChangingPlaces}
            isLoading={isChangingPlaces}
          />
        </OceanoModal>
      )}

      {isCreateNewFolderModalOpened && (
        <OceanoModal
          onClose={() => setIsCreateNewFolderModalOpened(false)}
          title={translation?.actionCreateNewFolderModalLabels?.title}
        >
          <OceanoInputText
            autoFocus
            placeholder={
              translation?.actionCreateNewFolderModalLabels?.actions
                ?.inputFolderTitle?.placeholder
            }
            value={newFolderTitle}
            onChange={(event) => setNewFolderTitle(event.target.value)}
            onKeyDown={(event) =>
              event.key === 'Enter' && handleCreateNewFolder()
            }
            disabled={isCreatingNewFolder}
          />
          <OceanoButton
            style={{ width: 'auto' }}
            icon={<AddIcon />}
            text={
              translation?.actionCreateNewFolderModalLabels?.actions
                ?.buttonCreateNewFolder.text
            }
            aria-label={
              translation?.actionCreateNewFolderModalLabels?.actions
                ?.buttonCreateNewFolder.text
            }
            onClick={handleCreateNewFolder}
            disabled={isCreatingNewFolder}
            isLoading={isCreatingNewFolder}
          />
        </OceanoModal>
      )}

      {isDeleteModalOpened && (
        <OceanoModal
          onClose={() => setIsDeleteModalOpened(false)}
          title={modalDeleteTitles?.title}
          text={modalDeleteTitles?.actionText}
        >
          <OceanoButton
            theme="purple"
            style={{ width: 'auto' }}
            icon={<DeleteForeverIcon />}
            text={modalDeleteTitles?.buttonConfirmDelete?.text}
            aria-label={modalDeleteTitles?.buttonConfirmDelete?.text}
            onClick={deleteNoteOrFolder}
            disabled={isDeletingItem}
            isLoading={isDeletingItem}
          />
        </OceanoModal>
      )}

      <StackNotifications>
        <AnimatePresence>
          {getErrorsBy('name', 'errorCreatingNewFolder').length > 0 && (
            <OceanoNotification
              key={Math.random()}
              type="error"
              timeout={10000}
              onClose={() =>
                removeGeneralErrorBy('name', 'errorCreatingNewFolder')
              }
            >
              {translation?.errorCreatingNewFolderMsg}
            </OceanoNotification>
          )}
          {getErrorsBy('name', 'errorChangePlaces').length > 0 && (
            <OceanoNotification
              key={Math.random()}
              type="error"
              timeout={10000}
              onClose={() => removeGeneralErrorBy('name', 'errorChangePlaces')}
            >
              {translation?.errorChangePlacesMsg}
            </OceanoNotification>
          )}
          {getErrorsBy('name', 'errorMovingItem').length > 0 && (
            <OceanoNotification
              key={Math.random()}
              type="error"
              timeout={10000}
              onClose={() => removeGeneralErrorBy('name', 'errorMovingItem')}
            >
              {translation?.errorMovingItemMsg}
            </OceanoNotification>
          )}
          {getErrorsBy('name', 'errorDeletingItem').length > 0 && (
            <OceanoNotification
              key={Math.random()}
              type="error"
              timeout={10000}
              onClose={() => removeGeneralErrorBy('name', 'errorDeletingItem')}
            >
              {translation?.errorDeletingItemMsg}
            </OceanoNotification>
          )}
          {getErrorsBy('name', 'errorRenamingItem').length > 0 && (
            <OceanoNotification
              key={Math.random()}
              type="error"
              timeout={10000}
              onClose={() => removeGeneralErrorBy('name', 'errorRenamingItem')}
            >
              {translation?.errorRenamingItemMsg}
            </OceanoNotification>
          )}
        </AnimatePresence>
      </StackNotifications>

      <OceanoContextMenu componentRef={noteOrFolderRef.current}>
        <OceanoButton
          theme="transparent"
          icon={<OpenInNewIcon />}
          text={contextMenuOpenInNewTabBtnTitle}
          aria-label={contextMenuOpenInNewTabBtnTitle}
          onClick={() => openItem(true)}
        />
        <OceanoButton
          theme="transparent"
          icon={<TextFieldsIcon />}
          text={contextMenuRenameBtnTitle}
          aria-label={contextMenuRenameBtnTitle}
          onClick={() => {
            setIsRenaming(true);

            /**
             * This setTimeout 0 is a way to get around the delay of the DOM
             * in rendering textarea after call 'setRenaming(true)'
             */
            setTimeout(() => {
              textareaToEditTitleRef.current?.focus();
              textareaToEditTitleRef.current?.select();
            }, 0);
          }}
        />
        <OceanoButton
          theme="transparent"
          icon={<DeleteForeverIcon />}
          text={contextMenuDeleteBtnTitle}
          aria-label={contextMenuDeleteBtnTitle}
          onClick={() => setIsDeleteModalOpened(true)}
        />
      </OceanoContextMenu>

      <StyledNoteOrFolder
        ref={onNoteOrFolderRef}
        type={type}
        data-testid={type === 'note' ? 'note-item' : 'folder-item'}
        onClick={() => openItem()}
        onAuxClick={(event) => event.button === 1 && openItem(true)}
      >
        {isRenaming ? (
          <>
            <textarea
              ref={textareaToEditTitleRef}
              defaultValue={updatedTitle || defaultTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  renameNoteOrFolder();
                } else if (e.key === 'Escape') {
                  e.preventDefault();
                  setIsRenaming(false);
                }
              }}
            />

            <WrapperBtnSaveTitle>
              <OceanoButton
                theme={type === 'note' ? 'yellow' : 'transparent'}
                icon={<SaveIcon />}
                text={translation?.buttonSaveEditTitle?.text}
                aria-label={translation?.buttonSaveEditTitle?.text}
                onClick={renameNoteOrFolder}
                disabled={isRenamingLoading}
                isLoading={isRenamingLoading}
              />
            </WrapperBtnSaveTitle>
          </>
        ) : (
          <p>
            {updatedTitle
              ? limitTitleLength(updatedTitle, 45)
              : limitTitleLength(defaultTitle, 45)}
          </p>
        )}
      </StyledNoteOrFolder>
    </>
  );
};

export default NoteOrFolder;
