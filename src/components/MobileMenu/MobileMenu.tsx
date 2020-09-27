import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Styles
import {
  WrapperMobileMenu,
  CloseMenuButton,
  WrapperButtonsMenu,
} from './styles';

// Components
import OceanoButton from '../OceanoButton/OceanoButton';
import SwitchLanguage from '../SwitchLanguage/SwitchLanguage';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const MobileMenu: React.FunctionComponent = () => {
  const translation = useTranslation('TopBar');

  return (
    <>
      <WrapperMobileMenu>
        <CloseMenuButton>
          <CloseIcon fontSize="large" />
        </CloseMenuButton>

        <p className="text-oceano">oceano</p>

        <WrapperButtonsMenu>
          <OceanoButton
            className="button-menu"
            aria-label={translation?.buttonCreateNote?.text}
            text={translation?.buttonCreateNote?.text}
            icon={<AddIcon />}
          />

          <SwitchLanguage isNotTransparent />

          <OceanoButton
            className="button-menu"
            aria-label={translation?.buttonSignOut?.ariaLabel}
            text={translation?.buttonSignOut?.text}
            icon={<ExitToAppIcon />}
          />
        </WrapperButtonsMenu>
      </WrapperMobileMenu>
    </>
  );
};

export default MobileMenu;
