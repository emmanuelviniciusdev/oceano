import React, { useContext } from 'react';

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

// Utils
import { joinProviderAndUsername } from '../../utils';

const Breadcrumbs = () => {
  const translation = useTranslation('Breadcrumbs');

  const { user: userContext } = useContext(AppContext);

  const username = joinProviderAndUsername(
    userContext?.state?.providerId,
    userContext?.state?.displayName
  );

  return (
    <>
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
