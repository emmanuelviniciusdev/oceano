import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

// Styles
import { MotionDivWrapperNoteOrFolder } from './styles';

// Components
import NoteOrFolder from '../NoteOrFolder/NoteOrFolder';

// Types
import { NotesAndFoldersType } from '../../types-and-interfaces/components/NotesAndFolders.types';

// tests
import {
  getAllFoldersPagination,
  getAllNotesPagination,
} from '../../helpers/noteAndFolder';
import { AppContext } from '../../store';

const NotesAndFolders: React.FunctionComponent<NotesAndFoldersType> = ({
  folderId,
}) => {
  const { user: userContext } = useContext(AppContext);

  useEffect(() => {
    if (!userContext?.state) return;

    getAllFoldersPagination(userContext.state.uid)
      .then((docs) => console.log(docs))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {Array.from({ length: 7 }).map((v, arrayIndex) => (
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
              id={String(Math.random())}
              type={arrayIndex % 2 === 0 ? 'note' : 'folder'}
              title={arrayIndex === 1 ? 'Minha nova super pasta!!!' : undefined}
            />
          </motion.div>
        </MotionDivWrapperNoteOrFolder>
      ))}
    </>
  );
};

export default NotesAndFolders;
