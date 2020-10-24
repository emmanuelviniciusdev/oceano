import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
import { StackNotifications } from '../../styles/general';

// Components
import MobileMenu from '../MobileMenu/MobileMenu';
import OceanoButton from '../OceanoButton/OceanoButton';
import SwitchLanguage from '../SwitchLanguage/SwitchLanguage';
import OceanoNotification from '../OceanoNotification/OceanoNotification';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Services
import { signOut } from '../../services/auth';

// Utils
import { doesRouteMatch } from '../../utils';

const TopBar: React.FunctionComponent = () => {
  const translation = useTranslation('TopBar');
  const currentLocation = useLocation();

  const [showSignOutErrorMsg, setShowSignOutErrorMsg] = useState(false);

  const isMyNotePage = doesRouteMatch(currentLocation.pathname, [
    /^\/minha-nota\/(?:([^\/]+?))\/?$/i,
  ]);

  const handleSignOut = async () => {
    try {
      await signOut();
      /**
       * User will be automatically redirected to '/' by Routes component
       */
    } catch (err) {
      console.error(err);
      setShowSignOutErrorMsg(true);
    }
  };

  return (
    <>
      <StyledTopBar>
        <TopBarContainer isMyNotePage={isMyNotePage}>
          <TextOceano isMyNotePage={isMyNotePage}>oceano</TextOceano>

          {!isMyNotePage && (
            <>
              <WrapperShowDesktopButtons>
                <OceanoButton
                  className="button-menu"
                  aria-label={translation?.buttonCreateNote?.text}
                  text={translation?.buttonCreateNote?.text}
                  icon={<AddIcon />}
                />
              </WrapperShowDesktopButtons>

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
                    onClick={handleSignOut}
                  />
                </WrapperButtonsRightSide>
              </WrapperShowDesktopButtons>

              <OpenMenuButton>
                <MenuIcon fontSize="large" />
              </OpenMenuButton>
            </>
          )}

          {isMyNotePage && (
            <>
              <WrapperButtonsRightSide>
                <OceanoButton
                  className="button-menu"
                  aria-label={translation?.buttonReturnFromMyNotePage?.text}
                  text={translation?.buttonReturnFromMyNotePage?.text}
                  icon={<ArrowBackIcon />}
                />

                <OceanoButton
                  className="button-menu"
                  aria-label={translation?.buttonDeleteFromMyNotePage?.text}
                  text={translation?.buttonDeleteFromMyNotePage?.text}
                  icon={<DeleteForeverIcon />}
                />
              </WrapperButtonsRightSide>
            </>
          )}
        </TopBarContainer>
      </StyledTopBar>

      {/* <MobileMenu /> */}

      <StackNotifications>
        <AnimatePresence>
          {showSignOutErrorMsg && (
            <OceanoNotification
              key="sign-out-error"
              type="error"
              onClose={() => setShowSignOutErrorMsg(false)}
            >
              {translation?.signOutErrorMsg}
            </OceanoNotification>
          )}
        </AnimatePresence>
      </StackNotifications>
    </>
  );
};

export default TopBar;
