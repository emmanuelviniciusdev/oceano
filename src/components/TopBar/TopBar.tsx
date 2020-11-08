import React, { useContext, useEffect, useRef, useState } from 'react';
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
import OceanoModal from '../OceanoModal/OceanoModal';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Services
import { signOut } from '../../services/auth';
import {
  createItem,
  deleteItem,
  getLastItemFromFolder,
} from '../../services/item';

// Utils
import { doesRouteMatch } from '../../utils';

// Types
import { ItemDocumentType } from '../../types-and-interfaces/collections/items.types';

// Setup
import { AppContext } from '../../store';
import topBarReducer from '../../store/reducers/topBar';

const TopBar: React.FunctionComponent = () => {
  const translation = useTranslation('TopBar');
  const currentLocation = useLocation();
  const history = useHistory();

  const {
    user: userContext,
    myNote: myNoteContext,
    topBar: topBarContext,
    breadcrumbs: breadcrumbsContext,
  } = useContext(AppContext);

  const [showSignOutErrorMsg, setShowSignOutErrorMsg] = useState(false);
  const [showCreateNoteErrorMsg, setShowCreateNoteErrorMsg] = useState(false);
  const [showDeleteNoteErrorMsg, setShowDeleteNoteErrorMsg] = useState(false);
  const [showModalDeleteNote, setShowModalDeleteNote] = useState(false);

  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [isDeletingNote, setIsDeletingNote] = useState(false);

  const searchItemsInputRef = useRef<HTMLInputElement | null>(null);
  const searchItemsTimeoutRef = useRef<number>();

  const isMyNotePage = doesRouteMatch(currentLocation.pathname, [
    /^\/minha-nota\/(?:([^\/]+?))\/?$/i, //eslint-disable-line
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
        const parentFolderId =
          breadcrumbsContext?.state.currentFolder?.id || null;

        const nextOrderId =
          ((await getLastItemFromFolder(parentFolderId, userContext.state.uid))
            ?.orderId || 0) + 1;

        const data: ItemDocumentType = {
          userUID: userContext.state.uid,
          parentFolderId,
          type: 'note',
          title: '',
          data: null,
          orderId: nextOrderId,
          createdAt: new Date(),
        };

        const noteId = await createItem(data);

        history.push(`/minha-nota/${noteId}`);
      }
    } catch (err) {
      console.error(err);
      setShowCreateNoteErrorMsg(true);
    } finally {
      setIsCreatingNote(false);
    }
  };

  const handleBack = () => {
    if (!myNoteContext?.state) {
      history.push('/notas');
      return;
    }

    const { parentFolderId } = myNoteContext.state;

    history.push(parentFolderId ? `/notas/${parentFolderId}` : '/notas');
  };

  const handleDeleteNote = async () => {
    if (!myNoteContext?.state) return;

    setIsDeletingNote(true);

    try {
      const { noteId, parentFolderId } = myNoteContext.state;
      await deleteItem(noteId);
      history.push(parentFolderId ? `/notas/${parentFolderId}` : '/notas');
    } catch (err) {
      console.error(err);
      setShowDeleteNoteErrorMsg(true);
    } finally {
      setIsDeletingNote(false);
      setShowModalDeleteNote(false);
    }
  };

  const handleSearchItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    clearTimeout(searchItemsTimeoutRef.current);

    searchItemsTimeoutRef.current = setTimeout(() => {
      topBarContext?.dispatch(
        topBarReducer.actionCreators.setSearchedTerm(value)
      );
    }, 500);
  };

  /**
   * Empties search input
   */
  useEffect(() => {
    if (
      topBarContext?.state?.searchedTerm === '' &&
      searchItemsInputRef.current
    )
      searchItemsInputRef.current.value = '';
  }, [topBarContext?.state?.searchedTerm]);

  /**
   * Routes where TopBar will not be rendered.
   *
   * Regular expressions generated at:
   * https://forbeslindesay.github.io/express-route-tester/
   */
  const blockedRouteRegExps = [
    /**
     * Homepage
     */
    /^\/?$/i, //eslint-disable-line

    /**
     * /pagina-nao-encontrada
     */
    /^\/pagina-nao-encontrada\/?$/i, //eslint-disable-line

    /**
     * /offline
     */
    /^\/offline\/?$/i, //eslint-disable-line

    /**
     * /termos/:termsType
     */
    /^\/termos\/(?:([^\/]+?))\/?$/i, //eslint-disable-line
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
                      ref={(instance) =>
                        (searchItemsInputRef.current = instance)
                      }
                      type="text"
                      placeholder={translation?.inputSearch?.placeholder}
                      onChange={handleSearchItems}
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
                      onClick={handleBack}
                    />

                    <OceanoButton
                      className="button-menu"
                      aria-label={translation?.buttonDeleteFromMyNotePage?.text}
                      text={translation?.buttonDeleteFromMyNotePage?.text}
                      icon={<DeleteForeverIcon />}
                      onClick={() => setShowModalDeleteNote(true)}
                    />
                  </WrapperButtonsRightSide>
                </>
              )}
            </TopBarContainer>
          </StyledTopBar>

          {/* <MobileMenu /> */}

          {isMyNotePage && showModalDeleteNote && (
            <OceanoModal
              title={translation?.modalDeleteNote?.title}
              text={translation?.modalDeleteNote?.actionText}
              onClose={() => setShowModalDeleteNote(false)}
            >
              <OceanoButton
                style={{ width: 'auto' }}
                icon={<DeleteForeverIcon />}
                text={translation?.modalDeleteNote?.buttonConfirmDelete?.text}
                aria-label={
                  translation?.modalDeleteNote?.buttonConfirmDelete?.text
                }
                disabled={isDeletingNote}
                isLoading={isDeletingNote}
                onClick={handleDeleteNote}
              />
            </OceanoModal>
          )}

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

              {showCreateNoteErrorMsg && (
                <OceanoNotification
                  key="create-note-error"
                  type="error"
                  onClose={() => setShowCreateNoteErrorMsg(false)}
                >
                  {translation?.createNoteErrorMsg}
                </OceanoNotification>
              )}

              {isMyNotePage && showDeleteNoteErrorMsg && (
                <OceanoNotification
                  key="delete-note-error"
                  type="error"
                  onClose={() => setShowDeleteNoteErrorMsg(false)}
                >
                  {translation?.deleteNoteErrorMsg}
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
