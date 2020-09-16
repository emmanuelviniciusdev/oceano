import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';
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

const MobileMenu: React.FunctionComponent = () => {
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
            aria-label="criar uma nota"
            text="criar uma nota"
            icon={<AddIcon />}
          />

          <SwitchLanguage isNotTransparent />

          <OceanoButton
            className="button-menu"
            aria-label="sair do oceano"
            text="sair"
            icon={<ExitToAppIcon />}
          />
        </WrapperButtonsMenu>
      </WrapperMobileMenu>
    </>
  );
};

export default MobileMenu;
