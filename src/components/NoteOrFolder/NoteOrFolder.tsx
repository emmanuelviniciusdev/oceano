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

// Services
import { createFolderAndMoveItemsIntoIt } from '../../services/item';

// Setup
import { AppContext } from '../../store';
import breadcrumbsReducer from '../../store/reducers/breadcrumbs';
import topbarReducer from '../../store/reducers/topBar';

// Utils
import { limitTitleLength } from '../../utils';

const NoteOrFolder: React.FunctionComponent<NoteOrFolderType> = ({
  id,
  parentFolderId,
  type,
  title,
}) => {
  const isComponentUnmounted = useRef(false);

  const noteOrFolderRef = useRef<HTMLDivElement | null>(null);
  const textareaToEditTitleRef = useRef<HTMLTextAreaElement | null>(null);

  const translation = useTranslation('NoteOrFolder');

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
  const [isRenaming, setIsRenaming] = useState(false);
  const [isCreatingNewFolder, setIsCreatingNewFolder] = useState(false);
  const [dropActionType, setDropActionType] = useState<DropActionTypes | ''>(
    ''
  );
  const [currentDnDItems, setCurrentDnDItems] = useState<CurrentDnDItemsType>();
  const [newFolderTitle, setNewFolderTitle] = useState<string>('');

  /**
   * Error states
   */
  const [creatingNewFolderError, setCreatingNewFolderError] = useState(false);

  const [, connectDragSource] = useDrag({
    item: { id, type: type.toUpperCase() } as DragAndDropItemType,
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
    if (!breadcrumbsContext) return;

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

  const renameNoteOrFolder = () => {
    setIsRenaming(false);
    console.log('on rename...');
  };

  const deleteNoteOrFolder = () => {
    setIsDeleteModalOpened(false);
    console.log('on delete...');
  };

  const handleCreateNewFolder = async () => {
    if (!userContext?.state?.uid || !currentDnDItems) return;

    setIsCreatingNewFolder(true);

    try {
      const newFolderId = await createFolderAndMoveItemsIntoIt(
        newFolderTitle,
        userContext.state.uid,
        null,
        currentDnDItems.draggingItem.id,
        currentDnDItems.droppingItem.id
      );

      history.push('/notas/' + newFolderId);
    } catch (err) {
      console.error(err);

      if (!isComponentUnmounted.current) {
        setCreatingNewFolderError(true);
        setIsCreateNewFolderModalOpened(false);
      }
    } finally {
      if (!isComponentUnmounted.current) setIsCreatingNewFolder(false);
    }
  };

  const handleMoveItemIntoFolder = () => {
    console.log(currentDnDItems);
  };

  const handleSwapItems = () => {
    console.log(currentDnDItems);
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
            onClick={handleSwapItems}
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
          />
        </OceanoModal>
      )}

      <StackNotifications>
        <AnimatePresence>
          {creatingNewFolderError && (
            <OceanoNotification
              key="creating-new-folder-error"
              type="error"
              timeout={10000}
            >
              {translation?.errorCreatingNewFolderMsg}
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
              defaultValue={defaultTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  renameNoteOrFolder();
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
              />
            </WrapperBtnSaveTitle>
          </>
        ) : (
          <p>{limitTitleLength(defaultTitle, 45) || defaultTitle}</p>
        )}
      </StyledNoteOrFolder>
    </>
  );
};

export default NoteOrFolder;
