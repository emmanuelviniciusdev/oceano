import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Styles
import { StyledNoteOrFolder } from './styles';

// Types
import { NoteOrFolderType } from '../../types-and-interfaces/components/NoteOrFolder.types';

const NoteOrFolder: React.FunctionComponent<NoteOrFolderType> = ({
  type = 'note',
}) => {
  const [, connectDragSource] = useDrag({
    item: { type: 'NOTE' },
  });

  const [, connectDropSource] = useDrop({
    accept: 'NOTE',
    hover: (item) => {
      console.log(item);
      console.log('i am dragging uhuuu');
    },
  });

  const dragAndDropConnectionAttach = (e: HTMLDivElement) => {
    connectDragSource(e);
    connectDropSource(e);
  };

  const defaultNoteOrFolderTitles = {
    note: 'clique para começar a editar...',
    folder: 'minha nova pasta...',
  };

  return (
    <>
      <StyledNoteOrFolder ref={dragAndDropConnectionAttach} type={type}>
        <textarea defaultValue={defaultNoteOrFolderTitles[type]} disabled />
      </StyledNoteOrFolder>
    </>
  );
};

export default NoteOrFolder;
