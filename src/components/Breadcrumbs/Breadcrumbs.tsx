import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Icons
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderIcon from '@material-ui/icons/Folder';
import FaceIcon from '@material-ui/icons/Face';

// Styles
import { Content, WrapperOceanoNotification } from './styles';

// Components
import OceanoButton from '../OceanoButton/OceanoButton';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Setup
import { AppContext } from '../../store';
import breadcrumbsReducer from '../../store/reducers/breadcrumbs';

// Utils
import { joinProviderAndUsername } from '../../utils';

// Types
import { BreadcrumbsType } from '../../types-and-interfaces/components/Breadcrumbs.types';
import { FolderType } from '../../types-and-interfaces/store/reducers/breadcrumbs.types';

// Services
import { getBreadcrumbs } from '../../services/item';
import OceanoNotification from '../OceanoNotification/OceanoNotification';

const Breadcrumbs: React.FunctionComponent<BreadcrumbsType> = ({
  folderId,
}) => {
  const translation = useTranslation('Breadcrumbs');

  const history = useHistory();

  const { user: userContext, breadcrumbs: breadcrumbsContext } = useContext(
    AppContext
  );

  const [isLoadingBreadcrumbs, setIsLoadingBreadcrumbs] = useState(false);
  const [errorLoadingBreadcrumbs, setErrorLoadingBreadcrumbs] = useState(false);

  const username = joinProviderAndUsername(
    userContext?.state?.providerId,
    userContext?.state?.displayName
  );

  const currentFolderContext = breadcrumbsContext?.state.currentFolder;
  const previousFoldersContext = breadcrumbsContext?.state.previousFolders;

  useEffect(() => {
    if (!breadcrumbsContext) return;

    /**
     * If 'folderId' property from component is not null but 'currentFolder' property from the
     * context is, it means the user entered the page directly.
     *
     * So, the breadcrumbs will be fetched from the API.
     */
    if (folderId && !currentFolderContext) {
      (async () => {
        setIsLoadingBreadcrumbs(true);

        try {
          const breadcrumbsFromAPI = await getBreadcrumbs(folderId);

          breadcrumbsContext.dispatch(
            breadcrumbsReducer.actionCreators.setCurrentFolder(
              breadcrumbsFromAPI.currentFolder
            )
          );

          breadcrumbsContext.dispatch(
            breadcrumbsReducer.actionCreators.setPreviousFolders(
              breadcrumbsFromAPI.previousFolders
            )
          );
        } catch (err) {
          console.error(err);
          setErrorLoadingBreadcrumbs(true);
        } finally {
          setIsLoadingBreadcrumbs(false);
        }
      })();
    }
  }, []);

  const handleSwapFolder = (folder: FolderType, folderIndex: number) => {
    if (!breadcrumbsContext) return;

    breadcrumbsContext.dispatch(
      breadcrumbsReducer.actionCreators.setCurrentFolder(folder)
    );

    breadcrumbsContext.dispatch(
      breadcrumbsReducer.actionCreators.setPreviousFolders(
        [...(previousFoldersContext || [])].splice(0, folderIndex + 1)
      )
    );

    history.push(folder?.id ? `/notas/${folder?.id}` : '/notas');
  };

  return (
    <>
      <Content>
        {errorLoadingBreadcrumbs && (
          <WrapperOceanoNotification>
            <OceanoNotification type="error">
              {translation?.errorLoadingBreadcrumbsMsg}
            </OceanoNotification>
          </WrapperOceanoNotification>
        )}

        {isLoadingBreadcrumbs && (
          <OceanoButton
            text={translation?.loadingBreadcrumbsMsg}
            aria-label={translation?.loadingBreadcrumbsMsg}
            theme="yellow"
            isLoading
            disabled
          />
        )}

        {!isLoadingBreadcrumbs &&
          !errorLoadingBreadcrumbs &&
          previousFoldersContext?.map((folder, folderIndex, foldersArray) => {
            const isOpenedFolder = foldersArray.length === folderIndex + 1;

            return !folder ? (
              <OceanoButton
                key={folderIndex}
                text={username}
                aria-label={username}
                icon={<FaceIcon />}
                theme="gray"
                onClick={() => handleSwapFolder(folder, folderIndex)}
                disabled={foldersArray.length === 1 && foldersArray[0] === null}
              />
            ) : (
              <OceanoButton
                key={folderIndex}
                text={folder.title}
                icon={isOpenedFolder ? <FolderOpenIcon /> : <FolderIcon />}
                theme="yellow"
                onClick={() => handleSwapFolder(folder, folderIndex)}
                disabled={isOpenedFolder}
              />
            );
          })}
      </Content>
    </>
  );
};

export default Breadcrumbs;
