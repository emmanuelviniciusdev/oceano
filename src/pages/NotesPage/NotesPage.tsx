import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

// Styles
import { Content, WrapperBreadcrumbs, WrapperNotes } from './styles';
import { Container } from '../../styles/general';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import TopBar from '../../components/TopBar/TopBar';
import NoteOrFolder from '../../components/NoteOrFolder/NoteOrFolder';

const NotesPage = () => {
  return (
    <>
      <TopBar />

      <Container>
        <Content>
          <WrapperBreadcrumbs>
            <Breadcrumbs />
          </WrapperBreadcrumbs>
        </Content>

        <DndProvider options={HTML5toTouch}>
          <WrapperNotes>
            {Array.from({ length: 7 }).map((v, i) => (
              <NoteOrFolder
                key={Math.random()}
                type={i % 2 === 0 ? 'folder' : 'folder'}
              />
            ))}
          </WrapperNotes>
        </DndProvider>
      </Container>
    </>
  );
};

export default NotesPage;
