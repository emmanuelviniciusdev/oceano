import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';

// Styles
import {
  Content,
  MotionDivWrapperNoteOrFolder,
  WrapperBreadcrumbs,
  WrapperNotes,
} from './styles';
import { Container } from '../../styles/general';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import NoteOrFolder from '../../components/NoteOrFolder/NoteOrFolder';

const NotesPage = () => {
  return (
    <>
      <Container>
        <Content>
          <WrapperBreadcrumbs>
            <Breadcrumbs />
          </WrapperBreadcrumbs>
        </Content>

        <DndProvider backend={HTML5Backend}>
          <WrapperNotes>
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
                  />
                </motion.div>
              </MotionDivWrapperNoteOrFolder>
            ))}
          </WrapperNotes>
        </DndProvider>
      </Container>
    </>
  );
};

export default NotesPage;
