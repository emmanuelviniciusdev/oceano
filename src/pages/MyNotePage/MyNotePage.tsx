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
import myNoteReducer from '../../store/reducers/myNote';

// Utils
import { joinProviderAndUsername } from '../../utils';

const MyNotePage = () => {
  const { noteId } = useParams<MyNotePageRouteParamsType>();

  const { user: userContext, myNote: myNoteContext } = useContext(AppContext);

  const username = joinProviderAndUsername(
    userContext?.state?.providerId,
    userContext?.state?.displayName
  );

  useEffect(() => {
    myNoteContext?.dispatch(myNoteReducer.actionCreators.setNoteId(noteId));
  }, []);

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

        <MyNote noteId={noteId} />
      </WrapperContent>
    </>
  );
};

export default MyNotePage;
