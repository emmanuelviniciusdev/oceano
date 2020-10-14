import React, { useEffect } from 'react';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import MyNote from '../../components/MyNote/MyNote';

// Styles
import { GlobalStyle, WrapperBreadcrumbs, WrapperContent } from './styles';

const MyNotePage = () => {
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
