import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Assets
import googleBrands from '../../assets/images/google-brands.svg';

// Styles
import { ButtonSignIn, StackNotifications } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Components
import AcceptanceOfTerms from '../AcceptanceOfTerms/AcceptanceOfTerms';
import OceanoNotification from '../OceanoNotification/OceanoNotification';

// Services
import { signInWithGogle } from '../../services/auth';

const ButtonSignInWithGoogle = () => {
  const translation = useTranslation('ButtonSignInWithGoogle');
  const history = useHistory();

  const [acceptanceIsOpen, setAcceptanceIsOpen] = useState(false);
  const [showUnknownSigInError, setShowUnknownSignInError] = useState(false);

  const handleSignIn = async () => {
    try {
      await signInWithGogle();
      history.push('/notas');
    } catch (err) {
      if (err.code === 'oceano-auth/user-did-not-accept-terms') {
        setAcceptanceIsOpen(true);
        return;
      }

      if (err.code === 'auth/popup-closed-by-user') return;

      console.error(err);
      setShowUnknownSignInError(true);
    }
  };

  return (
    <>
      <ButtonSignIn onClick={handleSignIn}>
        <div>
          <img src={googleBrands} alt={translation?.altImg} />
          <p dangerouslySetInnerHTML={{ __html: translation?.text }}></p>
        </div>
      </ButtonSignIn>

      {acceptanceIsOpen && (
        <AcceptanceOfTerms
          authType="google"
          onClose={() => setAcceptanceIsOpen(false)}
        />
      )}

      <StackNotifications>
        <AnimatePresence>
          {showUnknownSigInError && (
            <OceanoNotification
              type="error"
              onClose={() => setShowUnknownSignInError(false)}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: translation?.unknownSignInErrorMsg,
                }}
              ></span>
            </OceanoNotification>
          )}
        </AnimatePresence>
      </StackNotifications>
    </>
  );
};

export default ButtonSignInWithGoogle;
