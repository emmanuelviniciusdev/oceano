import React, { useContext, useEffect } from 'react';

// Icons
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FaceIcon from '@material-ui/icons/Face';

// Styles
import { Content } from './styles';

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

// Services
import { getBreadcrumbs } from '../../services/item';

const Breadcrumbs: React.FunctionComponent<BreadcrumbsType> = ({
  folderId,
}) => {
  const translation = useTranslation('Breadcrumbs');

  const { user: userContext, breadcrumbs: breadcrumbsContext } = useContext(
    AppContext
  );

  const username = joinProviderAndUsername(
    userContext?.state?.providerId,
    userContext?.state?.displayName
  );

  const currentFolderContext = breadcrumbsContext?.state.currentFolder;
  const previousFoldersContext = breadcrumbsContext?.state.previousFolders;

  useEffect(() => {
    /**
     * If 'folderId' property from component is not null but 'currentFolder' property from the
     * context is, it means the user entered the page directly.
     *
     * So, the breadcrumbs will be fetched from the API.
     */
    if (folderId && !currentFolderContext && breadcrumbsContext) {
      (async () => {
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
        }
      })();
    }
  }, []);

  useEffect(() => {
    console.log('test');
  }, [folderId]);

  return (
    <>
      <p>{JSON.stringify(currentFolderContext)}</p>
      <br />
      <p>{JSON.stringify(previousFoldersContext)}</p>

      <Content>
        <OceanoButton
          text={username}
          aria-label={username}
          icon={<FaceIcon />}
          theme="gray"
        />
        {Array.from({ length: 1 }).map(() => (
          <OceanoButton
            key={Math.random()}
            text="Minha pasta muito louca"
            icon={<FolderOpenIcon />}
            theme="yellow"
          />
        ))}
      </Content>
    </>
  );
};

export default Breadcrumbs;
