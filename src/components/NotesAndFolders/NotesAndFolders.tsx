import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Styles
import { MotionDivWrapperNoteOrFolder } from './styles';

// Components
import NoteOrFolder from '../NoteOrFolder/NoteOrFolder';

// Services
import { getLastNoteFromFolder } from '../../services/note';
import { getLastFolderFromFolder } from '../../services/folder';

const NotesAndFolders: React.FunctionComponent = () => {
  useEffect(() => {
    // getLastFolderFromFolder(null)
    //   .then((d) => console.log(d))
    //   .catch((err) => console.error(err));
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
