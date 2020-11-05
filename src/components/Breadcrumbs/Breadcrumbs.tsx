import React, { useContext, useEffect, useRef, useState } from 'react';
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
import topBarReducer from '../../store/reducers/topBar';

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
  const isComponentUnmounted = useRef(false);

  const translation = useTranslation('Breadcrumbs');

  const history = useHistory();

  const {
    user: userContext,
    breadcrumbs: breadcrumbsContext,
    topBar: topBarContext,
  } = useContext(AppContext);

  const [isLoadingBreadcrumbs, setIsLoadingBreadcrumbs] = useState(false);
  const [errorLoadingBreadcrumbs, setErrorLoadingBreadcrumbs] = useState(false);

  const username = joinProviderAndUsername(
    userContext?.state?.providerId,
    userContext?.state?.displayName
  );

  const previousFoldersContext = breadcrumbsContext?.state.previousFolders;

  const fetchBreadcrumbs = async (folderId: string | null) => {
    if (!breadcrumbsContext) return;

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
      if (!isComponentUnmounted.current) setErrorLoadingBreadcrumbs(true);
    } finally {
      if (!isComponentUnmounted.current) setIsLoadingBreadcrumbs(false);
    }
  };

  useEffect(() => {
    fetchBreadcrumbs(folderId);

    return () => {
      isComponentUnmounted.current = true;
    };
  }, [folderId]);

  const handleSwapFolder = (folder: FolderType, folderIndex: number) => {
    /**
     * Empties searched term
     */
    topBarContext?.dispatch(topBarReducer.actionCreators.setSearchedTerm(''));

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
                data-testid="breadcrumbs-button-root-folder"
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
                data-testid="breadcrumbs-button-normal-folder"
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
