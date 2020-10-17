import React, { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CloseIcon from '@material-ui/icons/Close';

// Styles
import {
  ModalActions,
  ModalBackground,
  ModalCloseButton,
  ModalContent,
  ModalText,
  ModalTitle,
} from './styles';

// Types
import { OceanoModalType } from '../../types-and-interfaces/components/OceanoModal.types';

const OceanoModal: React.FunctionComponent<OceanoModalType> = ({
  title,
  text,
  onClose,
  children,
}) => {
  const checkIfEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  /**
   * It adds a listener for 'ESC' key. When pressed, the modal is closed.
   */
  useEffect(() => {
    window.addEventListener('keydown', checkIfEscape, false);

    return () => {
      window.removeEventListener('keydown', checkIfEscape, false);
    };
  }, [checkIfEscape]);

  return (
    <>
      <AnimatePresence>
        <div data-testid="oceano-modal-wrapper">
          <ModalBackground>
            <motion.div
              key="motion-wrapper-modal-content"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <ModalContent data-testid="oceano-modal-content">
                <ModalCloseButton
                  data-testid="oceano-modal-close-button"
                  onClick={() => onClose && onClose()}
                >
                  <CloseIcon fontSize="inherit" />
                </ModalCloseButton>
                <ModalTitle data-testid="oceano-modal-title">
                  {title}
                </ModalTitle>
                <ModalText data-testid="oceano-modal-text">{text}</ModalText>
                <ModalActions data-testid="oceano-modal-actions">
                  {children}
                </ModalActions>
              </ModalContent>
            </motion.div>
          </ModalBackground>
        </div>
      </AnimatePresence>
    </>
  );
};

export default OceanoModal;
