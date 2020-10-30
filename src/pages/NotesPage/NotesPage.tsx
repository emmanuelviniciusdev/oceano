import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

// Styles
import { Content, WrapperBreadcrumbs, WrapperNotes } from './styles';
import { Container } from '../../styles/general';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import NotesAndFolders from '../../components/NotesAndFolders/NotesAndFolders';

// Types
import { NotesPageRouteParamsType } from '../../types-and-interfaces/pages/NotesPage.types';

const NotesPage = () => {
  const { folderId } = useParams<NotesPageRouteParamsType>();

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
            <NotesAndFolders folderId={folderId || null} />
          </WrapperNotes>
        </DndProvider>
      </Container>
    </>
  );
};

export default NotesPage;
