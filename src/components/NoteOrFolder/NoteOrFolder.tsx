import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SaveIcon from '@material-ui/icons/Save';

// Styles
import { StyledNoteOrFolder, WrapperBtnSaveTitle } from './styles';

// Components
import OceanoModal from '../OceanoModal/OceanoModal';
import OceanoContextMenu from '../OceanoContextMenu/OceanoContextMenu';
import OceanoButton from '../OceanoButton/OceanoButton';

// Types
import {
  NoteOrFolderType,
  DragAndDropItemType,
  DropActionTypes,
  GetDropActionType,
  NoteOrFolderStringsLowerCasedType,
} from '../../types-and-interfaces/components/NoteOrFolder.types';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const NoteOrFolder: React.FunctionComponent<NoteOrFolderType> = ({
  id,
  type = 'note',
  title,
}) => {
  const noteOrFolderRef = useRef<HTMLDivElement | null>(null);
  const textareaToEditTitleRef = useRef<HTMLTextAreaElement | null>(null);

  const translation = useTranslation('NoteOrFolder');

  const [isDnDModalOpened, setIsDnDModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [dropActionType, setDropActionType] = useState<DropActionTypes | ''>(
    ''
  );

  const [, connectDragSource] = useDrag({
    item: { type: type.toUpperCase(), id } as DragAndDropItemType,
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

  /**
   * Titles in general
   */
  const defaultTitle = title || translation?.defaultTitles?.[type];
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

  return (
    <>
      {isDnDModalOpened && (
        <OceanoModal
          onClose={() => setIsDnDModalOpened(false)}
          title={translation?.actionDnDModalLabels?.title}
          text={
            translation?.actionDnDModalLabels?.actionTexts?.[dropActionType]
          }
        ></OceanoModal>
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

      <OceanoContextMenu componentRef={noteOrFolderRef.current}>
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
      >
        {isRenaming /*|| title === 'Minha nova super pasta!!!'*/ ? (
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
          <p>{defaultTitle}</p>
        )}
      </StyledNoteOrFolder>
    </>
  );
};

export default NoteOrFolder;
