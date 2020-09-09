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
import OceanButton from '../OceanButton/OceanButton';

const MobileMenu: React.FunctionComponent = () => {
  return (
    <>
      <WrapperMobileMenu>
        <CloseMenuButton>
          <CloseIcon fontSize="large" />
        </CloseMenuButton>

        <p className="text-oceano">oceano</p>

        <WrapperButtonsMenu>
          <OceanButton
            className="button-menu"
            text="criar uma nota"
            icon={<AddIcon />}
          />

          {/* TODO: Verify the behavior of this button. Is it really going to be a button?  */}
          <OceanButton
            className="button-menu"
            text="português"
            icon={<LanguageIcon />}
          />

          <OceanButton
            className="button-menu"
            text="sair"
            icon={<ExitToAppIcon />}
          />
        </WrapperButtonsMenu>
      </WrapperMobileMenu>
    </>
  );
};

export default MobileMenu;
