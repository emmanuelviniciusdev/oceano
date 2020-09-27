import React from 'react';
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
  children,
}) => {
  return (
    <>
      <ModalBackground>
        <ModalContent>
          <ModalCloseButton>
            <CloseIcon fontSize="inherit" />
          </ModalCloseButton>
          <ModalTitle>{title}</ModalTitle>
          <ModalText>{text}</ModalText>
          <ModalActions>{children}</ModalActions>
        </ModalContent>
      </ModalBackground>
    </>
  );
};

export default OceanoModal;
