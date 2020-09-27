import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import LayersIcon from '@material-ui/icons/Layers';
import AutorenewIcon from '@material-ui/icons/Autorenew';

// Styles
import { Content, WrapperBreadcrumbs, WrapperNotes } from './styles';
import { Container } from '../../styles/general';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import TopBar from '../../components/TopBar/TopBar';
import NoteOrFolder from '../../components/NoteOrFolder/NoteOrFolder';
import OceanoModal from '../../components/OceanoModal/OceanoModal';
import OceanoButton from '../../components/OceanoButton/OceanoButton';

const NotesPage = () => {
  return (
    <>
      <OceanoModal
        title="o que você deseja fazer?"
        text="* você acabou de arrastar uma nota para cima de uma pasta"
      >
        <OceanoButton
          text="inserir nota dentro da pasta"
          icon={<LayersIcon />}
        />
        <OceanoButton text="trocar itens de lugar" icon={<AutorenewIcon />} />
      </OceanoModal>

      <TopBar />

      <Container>
        <Content>
          <WrapperBreadcrumbs>
            <Breadcrumbs />
          </WrapperBreadcrumbs>
        </Content>

        <DndProvider backend={HTML5Backend}>
          <WrapperNotes>
            {Array.from({ length: 7 }).map((v, i) => (
              <NoteOrFolder
                key={Math.random()}
                type={i % 2 === 0 ? 'note' : 'folder'}
              />
            ))}
          </WrapperNotes>
        </DndProvider>
      </Container>
    </>
  );
};

export default NotesPage;
