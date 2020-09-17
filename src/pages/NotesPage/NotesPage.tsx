import React from 'react';

// Styles
import { Content, WrapperNotes } from './styles';
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
          <Breadcrumbs />

          <WrapperNotes>
            <Note />
          </WrapperNotes>
        </Content>
      </Container>
    </>
  );
};

export default NotesPage;
