import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import MyNote from '../../components/MyNote/MyNote';
import OceanoButton from '../../components/OceanoButton/OceanoButton';

// Icons
import FolderIcon from '@material-ui/icons/Folder';
import FaceIcon from '@material-ui/icons/Face';

// Types
import { MyNotePageRouteParamsType } from '../../types-and-interfaces/pages/MyNotePage.types';

// Styles
import { GlobalStyle, WrapperInformations, WrapperContent } from './styles';

// Setup
import { AppContext } from '../../store';

// Utils
import { joinProviderAndUsername } from '../../utils';

const MyNotePage = () => {
  const {} = useParams<MyNotePageRouteParamsType>();

  const { user: userContext } = useContext(AppContext);

  useEffect(() => {
    document.title = 'oceano — Sobre todas as coisas que...';
  }, []);

  const username = joinProviderAndUsername(
    userContext?.state?.providerId,
    userContext?.state?.displayName
  );

  return (
    <>
      <GlobalStyle />

      <WrapperContent>
        <WrapperInformations>
          <OceanoButton
            icon={<FaceIcon />}
            text={username}
            aria-label={username}
            theme="gray"
            disabled
          />
          <OceanoButton
            icon={<FolderIcon />}
            text="pasta atual"
            aria-label="pasta atual"
            theme="yellow"
            disabled
          />
        </WrapperInformations>

        <MyNote />
      </WrapperContent>
    </>
  );
};

export default MyNotePage;
