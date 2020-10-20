import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import ButtonSignInWithGoogle from '../../components/ButtonSignInWithGoogle/ButtonSignInWithGoogle';
import ButtonSignInWithGithub from '../../components/ButtonSignInWithGithub/ButtonSignInWithGithub';
import OceanoNotification from '../OceanoNotification/OceanoNotification';
import AcceptanceOfTerms from '../AcceptanceOfTerms/AcceptanceOfTerms';

// Services
import { signInWith } from '../../services/auth';

// Styles
import { StackNotifications } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Types
import { SignInMethodType } from '../../types-and-interfaces/components/SignInMethods.types';

const SignInMethods = () => {
  const translation = useTranslation('SignInMethods');

  const history = useHistory();

  const [acceptanceIsOpen, setAcceptanceIsOpen] = useState(false);
  const [showUnknownSigInError, setShowUnknownSignInError] = useState(false);
  const [
    accountExistsWithThisEmailError,
    setAccountExistsWithThisEmailError,
  ] = useState<string>();
  const [signingInWith, setSigningInWith] = useState<SignInMethodType>();

  const handleSignInWith = async (method: SignInMethodType) => {
    if (!method) return;

    setSigningInWith(method);

    try {
      await signInWith(method);
      history.push('/notas');
    } catch (err) {
      /**
       * Errors that need to be treated
       */
      if (err.code === 'oceano-auth/user-did-not-accept-terms') {
        setAcceptanceIsOpen(true);
        return;
      }

      if (
        err.code === 'auth/account-exists-with-different-credential' &&
        err.email
      ) {
        setAccountExistsWithThisEmailError(err.email);
        return;
      }

      /**
       * Errors that don't need to be treated
       */
      const errorCodesToIgnore = [
        'auth/popup-closed-by-user',
        'auth/cancelled-popup-request',
      ];
      if (errorCodesToIgnore.includes(err.code)) return;

      /**
       * Unknown errors
       */
      console.error(err);
      setShowUnknownSignInError(true);
    }
  };

  return (
    <>
      <ButtonSignInWithGoogle onClick={() => handleSignInWith('google')} />
      <ButtonSignInWithGithub onClick={() => handleSignInWith('github')} />

      {acceptanceIsOpen && signingInWith && (
        <AcceptanceOfTerms
          authType={signingInWith}
          onClose={() => setAcceptanceIsOpen(false)}
        />
      )}

      <StackNotifications>
        <AnimatePresence>
          {showUnknownSigInError && (
            <OceanoNotification
              key="sign-in-unknown-error"
              type="error"
              onClose={() => setShowUnknownSignInError(false)}
            >
              <span>
                {translation?.unknownSignInErrorMsg} <b>{signingInWith}</b>
              </span>
            </OceanoNotification>
          )}
          {accountExistsWithThisEmailError && (
            <OceanoNotification
              key="sign-in-account-already-exists-error"
              type="error"
              timeout={10000}
              onClose={() => setAccountExistsWithThisEmailError(undefined)}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: translation?.accountExistsWithThisEmailErrorMsg(
                    accountExistsWithThisEmailError
                  ),
                }}
              />
            </OceanoNotification>
          )}
        </AnimatePresence>
      </StackNotifications>
    </>
  );
};

export default SignInMethods;
