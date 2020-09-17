import React from 'react';

// Styles
import { StyledNote } from './styles';

const Note = () => {
  return (
    <>
      {Array.from({ length: 7 }).map(() => (
        <StyledNote></StyledNote>
      ))}
    </>
  );
};

export default Note;
