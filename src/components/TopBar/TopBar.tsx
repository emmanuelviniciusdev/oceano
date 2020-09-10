import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Styles
import {
  TopBar as StyledTopBar,
  InputSearch,
  WrapperInputSearch,
  OpenMenuButton,
  TopBarContainer,
  TextOceano,
  WrapperButtonsRightSide,
  WrapperShowDesktopButtons,
} from './styles';

// Components
import MobileMenu from '../MobileMenu/MobileMenu';
import OceanoButton from '../OceanoButton/OceanoButton';

const TopBar: React.FunctionComponent = () => {
  return (
    <>
      <StyledTopBar>
        <TopBarContainer>
          <TextOceano>oceano</TextOceano>

          <WrapperShowDesktopButtons>
            <OceanoButton
              className="button-menu"
              aria-label="criar uma nota"
              text="criar uma nota"
              icon={<AddIcon />}
            />
          </WrapperShowDesktopButtons>

          {/* TODO: When I start with unit testing, implement a box-shadow color switch when
          the user focuses on input search (acessibility questions...). */}
          <WrapperInputSearch>
            <div className="icon">
              <SearchIcon />
            </div>
            <InputSearch type="text" placeholder="procurando algo?" />
          </WrapperInputSearch>

          <WrapperShowDesktopButtons>
            <WrapperButtonsRightSide>
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
            </WrapperButtonsRightSide>
          </WrapperShowDesktopButtons>

          <OpenMenuButton>
            <MenuIcon fontSize="large" />
          </OpenMenuButton>
        </TopBarContainer>
      </StyledTopBar>

      {/* <MobileMenu /> */}
    </>
  );
};

export default TopBar;
