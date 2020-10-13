import React, { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// Components
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

// Styles
import {
  GlobalStyle,
  WrapperBreadcrumbs,
  WrapperContent,
  WrapperContentEditor,
} from './styles';

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

        <WrapperContentEditor>
          <TextareaAutosize
            className="title-textarea"
            defaultValue="clique para começar a editar..."
            placeholder="título"
          />
        </WrapperContentEditor>
      </WrapperContent>
    </>
  );
};

export default MyNotePage;
