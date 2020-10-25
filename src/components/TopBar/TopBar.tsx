import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import { createNote } from '../../services/note';

// Utils
import { doesRouteMatch } from '../../utils';

// Types
import { NoteDocumentType } from '../../types-and-interfaces/collections/notes.types';

// Setup
import { AppContext } from '../../store';

const TopBar: React.FunctionComponent = () => {
  const translation = useTranslation('TopBar');
  const currentLocation = useLocation();
  const history = useHistory();

  const { user: userContext } = useContext(AppContext);

  const [showSignOutErrorMsg, setShowSignOutErrorMsg] = useState(false);
  const [showCreateNoteErrorMsg, setShowCreateNoteErrorMsg] = useState(false);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

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

  const handleCreateNote = async () => {
    setIsCreatingNote(true);

    try {
      if (userContext?.state) {
        const data: NoteDocumentType = {
          userUID: userContext.state.uid,
          folderId: null,
          title: '',
          data: null,
        };

        const noteId = await createNote(data);

        history.push(`/minha-nota/${noteId}`);
      }
    } catch (err) {
      console.error(err);
      setShowCreateNoteErrorMsg(true);
    } finally {
      setIsCreatingNote(false);
    }
  };

  /**
   * Routes where TopBar will not be rendered.
   *
   * Regular expressions generated at:
   * https://forbeslindesay.github.io/express-route-tester/
   */
  const blockedRouteRegExps = [
    /**
     * /pagina-nao-encontrada
     */
    /^\/pagina-nao-encontrada\/?$/i,

    /**
     * /offline
     */
    /^\/offline\/?$/i,
  ];

  return (
    <>
      {!doesRouteMatch(currentLocation.pathname, blockedRouteRegExps) && (
        <>
          <StyledTopBar data-testid="oceano-topbar">
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
                      isLoading={isCreatingNote}
                      disabled={isCreatingNote}
                      onClick={handleCreateNote}
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
                      onClick={() => history.push('/notas')}
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
      )}
    </>
  );
};

export default TopBar;
