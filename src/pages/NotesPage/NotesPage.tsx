import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Styles
import { Content, WrapperBreadcrumbs, WrapperNotes } from './styles';
import { Container } from '../../styles/general';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import NotesAndFolders from '../../components/NotesAndFolders/NotesAndFolders';

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
            <NotesAndFolders />
          </WrapperNotes>
        </DndProvider>
      </Container>
    </>
  );
};

export default NotesPage;
