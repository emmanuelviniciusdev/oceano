import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import MyNote from '../../components/MyNote/MyNote';
import OceanoButton from '../../components/OceanoButton/OceanoButton';

// Icons
import FolderIcon from '@material-ui/icons/Folder';
import FaceIcon from '@material-ui/icons/Face';

// Types
import { MyNotePageRouteParamsType } from '../../types-and-interfaces/pages/MyNotePage.types';
import { ItemDocumenttWithIDType } from '../../types-and-interfaces/collections/items.types';

// Styles
import { GlobalStyle, WrapperInformations, WrapperContent } from './styles';

// Setup
import { AppContext } from '../../store';
import myNoteReducer from '../../store/reducers/myNote';

// Utils
import {
  joinProviderAndUsername,
  limitTitleLength,
  setPageTitle,
} from '../../utils';

// Services
import { getItem } from '../../services/item';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const MyNotePage = () => {
  const translation = useTranslation('MyNotePage');

  const history = useHistory();

  const { noteId } = useParams<MyNotePageRouteParamsType>();

  const { user: userContext, myNote: myNoteContext } = useContext(AppContext);

  const [noteDocumentData, setNoteDocumentData] = useState<
    ItemDocumenttWithIDType
  >();
  const [noteParentFolderTitle, setNoteParentFolderTitle] = useState<string>();

  const username = joinProviderAndUsername(
    userContext?.state?.providerId,
    userContext?.state?.displayName
  );

  useEffect(() => {
    (async () => {
      try {
        const noteData = await getItem(noteId);

        setNoteDocumentData(noteData);
        // setPageTitle(noteData.title, false);

        myNoteContext?.dispatch(myNoteReducer.actionCreators.setNoteId(noteId));
        myNoteContext?.dispatch(
          myNoteReducer.actionCreators.setParentFolderId(
            noteData.parentFolderId
          )
        );
      } catch (err) {
        // if (err.code === 'oceano-item/item-does-not-exist') {
        //   history.push('/pagina-nao-encontrada');
        //   return;
        // }

        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!noteDocumentData) return;

      let parentFolderTitle = !noteDocumentData.parentFolderId
        ? translation?.rootFolderTitle
        : (await getItem(noteDocumentData.parentFolderId)).title ||
          translation?.folderDefaultTitle;

      setNoteParentFolderTitle(parentFolderTitle);
    })();
  }, [translation, noteDocumentData]);

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
            text={limitTitleLength(noteParentFolderTitle || '', 40)}
            aria-label={limitTitleLength(noteParentFolderTitle || '', 40)}
            theme={
              noteDocumentData?.parentFolderId === null ? 'gray' : 'yellow'
            }
            disabled
          />
        </WrapperInformations>

        <MyNote noteId={noteId} />
      </WrapperContent>
    </>
  );
};

export default MyNotePage;
