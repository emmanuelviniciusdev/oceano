import React from 'react';
import FolderOpen from '@material-ui/icons/FolderOpen';
import Folder from '@material-ui/icons/Folder';

// Styles
import { Content } from './styles';

// Components
import OceanoButton from '../OceanoButton/OceanoButton';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const Breadcrumbs = () => {
  const translation = useTranslation('Breadcrumbs');

  return (
    <>
      <Content>
        <OceanoButton
          text={translation?.homeButton?.text}
          aria-label={translation?.homeButton?.text}
          icon={<Folder />}
          theme="gray"
        />
        {Array.from({ length: 1 }).map(() => (
          <OceanoButton
            key={Math.random()}
            text="Minha pasta muito louca"
            icon={<FolderOpen />}
            theme="yellow"
          />
        ))}
      </Content>
    </>
  );
};

export default Breadcrumbs;
