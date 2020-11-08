import React, { useRef } from 'react';
import { createDndContext, DndProvider } from 'react-dnd';
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
  const DnDManagerRef = useRef(createDndContext(HTML5Backend));

  const { folderId } = useParams<NotesPageRouteParamsType>();

  return (
    <>
      <Container>
        <Content>
          <WrapperBreadcrumbs>
            <Breadcrumbs folderId={folderId || null} />
          </WrapperBreadcrumbs>
        </Content>

        {DnDManagerRef.current.dragDropManager && (
          <DndProvider manager={DnDManagerRef.current.dragDropManager}>
            <WrapperNotes>
              <NotesAndFolders folderId={folderId || null} />
            </WrapperNotes>
          </DndProvider>
        )}
      </Container>
    </>
  );
};

export default NotesPage;
