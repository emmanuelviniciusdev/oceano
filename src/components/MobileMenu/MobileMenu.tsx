import React, { useEffect, useRef, useState } from 'react';
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

// Types
import { MobileMenuType } from '../../types-and-interfaces/components/MobileMenu';

const MobileMenu: React.FunctionComponent<MobileMenuType> = ({
  onClose,
  onCreateNote,
  onSignOut,
}) => {
  const isComponentUnmounted = useRef(false);

  const translation = useTranslation('TopBar');

  const [isCreatingNote, setIsCreatingNote] = useState(false);

  useEffect(() => {
    return () => {
      setIsCreatingNote(false);
      isComponentUnmounted.current = true;
    };
  }, []);

  return (
    <>
      <WrapperMobileMenu>
        <CloseMenuButton onClick={onClose}>
          <CloseIcon fontSize="large" />
        </CloseMenuButton>

        <p className="text-oceano">oceano</p>

        <WrapperButtonsMenu>
          <OceanoButton
            className="button-menu"
            aria-label={translation?.buttonCreateNote?.text}
            text={translation?.buttonCreateNote?.text}
            icon={<AddIcon />}
            onClick={() => {
              setIsCreatingNote(true);
              onCreateNote();
            }}
            disabled={isCreatingNote}
            isLoading={isCreatingNote}
          />

          <SwitchLanguage isNotTransparent />

          <OceanoButton
            className="button-menu"
            aria-label={translation?.buttonSignOut?.ariaLabel}
            text={translation?.buttonSignOut?.text}
            icon={<ExitToAppIcon />}
            onClick={onSignOut}
          />
        </WrapperButtonsMenu>
      </WrapperMobileMenu>
    </>
  );
};

export default MobileMenu;
