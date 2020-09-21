import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Styles
import { StyledNote } from './styles';

const Note = () => {
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

  return (
    <>
      <StyledNote ref={dragAndDropConnectionAttach}></StyledNote>
    </>
  );
};

export default Note;
