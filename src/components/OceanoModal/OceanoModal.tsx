import React, { useEffect, useState } from 'react';
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
  open = !false,
  children,
}) => {
  const [isOpened, setIsOpened] = useState(open);

  useEffect(() => setIsOpened(open), [open]);

  /**
   * It adds a listener for 'ESC' key. When pressed, the modal is closed.
   */
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }, []);

  const closeModal = () => setIsOpened(false);

  return (
    <>
      <AnimatePresence>
        {isOpened && (
          <div data-testid="oceano-modal-wrapper">
            <ModalBackground>
              <motion.div
                key="motion-wrapper-modal-content"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
              >
                <ModalContent>
                  <ModalCloseButton
                    data-testid="oceano-modal-close-button"
                    onClick={closeModal}
                  >
                    <CloseIcon fontSize="inherit" />
                  </ModalCloseButton>
                  <ModalTitle>{title}</ModalTitle>
                  <ModalText>{text}</ModalText>
                  <ModalActions>{children}</ModalActions>
                </ModalContent>
              </motion.div>
            </ModalBackground>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OceanoModal;
