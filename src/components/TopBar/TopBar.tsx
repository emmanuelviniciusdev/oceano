import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
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
import SwitchLanguage from '../SwitchLanguage/SwitchLanguage';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const TopBar: React.FunctionComponent = () => {
  const translation = useTranslation('TopBar');

  return (
    <>
      <StyledTopBar>
        <TopBarContainer>
          <TextOceano>oceano</TextOceano>

          <WrapperShowDesktopButtons>
            <OceanoButton
              className="button-menu"
              aria-label={translation?.buttonCreateNote?.text}
              text={translation?.buttonCreateNote?.text}
              icon={<AddIcon />}
            />
          </WrapperShowDesktopButtons>

          {/* TODO: When I start with unit testing, implement a box-shadow color switch when
          the user focuses on input search (acessibility questions...). */}
          <WrapperInputSearch>
            <div className="icon">
              <SearchIcon />
            </div>
            <InputSearch
              type="text"
              placeholder={translation?.inputSearch?.placeholder}
            />
          </WrapperInputSearch>

          <WrapperShowDesktopButtons>
            <WrapperButtonsRightSide>
              <SwitchLanguage isNotTransparent />

              <OceanoButton
                className="button-menu"
                aria-label={translation?.buttonSignOut?.ariaLabel}
                text={translation?.buttonSignOut?.text}
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
