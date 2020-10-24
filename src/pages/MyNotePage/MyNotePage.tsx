import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import MyNote from '../../components/MyNote/MyNote';

// Types
import { MyNotePageRouteParamsType } from '../../types-and-interfaces/pages/MyNotePage.types';

// Styles
import { GlobalStyle, WrapperBreadcrumbs, WrapperContent } from './styles';

const MyNotePage = () => {
  const { noteId } = useParams<MyNotePageRouteParamsType>();

  useEffect(() => {
    document.title = 'oceano — Sobre todas as coisas que...';
  }, []);

  return (
    <>
      <GlobalStyle />

      <WrapperContent>
        <WrapperBreadcrumbs>
          <Breadcrumbs />
        </WrapperBreadcrumbs>

        <MyNote />
      </WrapperContent>
    </>
  );
};

export default MyNotePage;
