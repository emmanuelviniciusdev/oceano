import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

// Styles
import { Content, WrapperBreadcrumbs, WrapperNotes } from './styles';
import { Container } from '../../styles/general';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import TopBar from '../../components/TopBar/TopBar';
import Note from '../../components/Note/Note';

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
            {Array.from({ length: 7 }).map(() => (
              <Note key={Math.random()} />
            ))}
          </WrapperNotes>
        </DndProvider>
      </Container>
    </>
  );
};

export default NotesPage;
