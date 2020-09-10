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

          {/* TODO: Verify the behavior of this button. Is it really going to be a button?  */}
          <OceanoButton
            className="button-menu"
            aria-label="selecionar idioma"
            text="português"
            icon={<LanguageIcon />}
          />

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
