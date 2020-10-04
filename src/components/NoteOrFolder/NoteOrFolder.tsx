import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Styles
import { StyledNoteOrFolder } from './styles';

// Components
import OceanoModal from '../OceanoModal/OceanoModal';

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
  const translation = useTranslation('NoteOrFolder');

  const [isModalOpened, setIsModalOpened] = useState(false);
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
      setIsModalOpened(true);
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

  const dragAndDropConnectionAttach = (e: HTMLDivElement) => {
    connectDragSource(e);
    connectDropSource(e);
  };

  return (
    <>
      <OceanoModal
        open={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        title={translation?.actionModalLabels?.title}
        text={translation?.actionModalLabels?.actionTexts?.[dropActionType]}
      ></OceanoModal>

      <StyledNoteOrFolder
        ref={dragAndDropConnectionAttach}
        type={type}
        data-testid={type === 'note' ? 'note-item' : 'folder-item'}
      >
        <p>{title || translation?.defaultTitles?.[type]}</p>
      </StyledNoteOrFolder>
    </>
  );
};

export default NoteOrFolder;
