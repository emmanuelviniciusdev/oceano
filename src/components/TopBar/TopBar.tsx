import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

// Styles
import {
  TopBar as StyledTopBar,
  InputSearch,
  WrapperInputSearch,
  OpenMenuButton,
} from './styles';

// Components
import MobileMenu from '../MobileMenu/MobileMenu';

const TopBar: React.FunctionComponent = () => {
  return (
    <>
      <StyledTopBar>
        {/* TODO: When I start with unit testing, implement a box-shadow color switch when
        the user focuses on input search (acessibility questions...). */}
        <WrapperInputSearch>
          <div className="icon">
            <SearchIcon />
          </div>
          <InputSearch type="text" placeholder="Procurando algo?" />
        </WrapperInputSearch>

        <OpenMenuButton>
          <MenuIcon fontSize="large" />
        </OpenMenuButton>
      </StyledTopBar>

      {/* <MobileMenu /> */}
    </>
  );
};

export default TopBar;
