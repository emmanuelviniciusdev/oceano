import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import ButtonSignInWithGoogle from '../../components/ButtonSignInWithGoogle/ButtonSignInWithGoogle';
import ButtonSignInWithGithub from '../../components/ButtonSignInWithGithub/ButtonSignInWithGithub';
import OceanoNotification from '../OceanoNotification/OceanoNotification';
import AcceptanceOfTerms from '../AcceptanceOfTerms/AcceptanceOfTerms';

// Services
import { signInWith, signOut } from '../../services/auth';

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
  const [
    warningEmailVerificationIsOpen,
    setWarningEmailVerificationIsOpen,
  ] = useState(false);
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
      /**
       * If everything is ok user will be redirected automatically to '/notas'
       * by Routes component
       */
    } catch (err) {
      /**
       * Errors that need to be treated
       */
      if (err.code === 'oceano-auth/user-did-not-accept-terms') {
        setAcceptanceIsOpen(true);
        return;
      }

      if (err.code === 'oceano-auth/user-did-not-verify-email') {
        await signOut();
        setWarningEmailVerificationIsOpen(true);
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
      await signOut();
      console.error(err);
      setShowUnknownSignInError(true);
    }
  };

  return (
    <>
      <ButtonSignInWithGoogle onClick={() => handleSignInWith('google')} />

      {/*
          // TODO: Fix bug related to login with Github.
          
          If the user signs in with a Google account that uses the same email address used
          by Github account and then user tries to sign in with Github again, Firebase will block
          the sign in. This can be fixed 'linking multiple auth providers'.

          Check it out: https://firebase.google.com/docs/auth/web/account-linking
      */}
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
          {warningEmailVerificationIsOpen && (
            <OceanoNotification
              key="warning-email-verification"
              type="warning"
              timeout={10000}
              onClose={() => setWarningEmailVerificationIsOpen(false)}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: translation?.warningEmailVerificationMsg(
                    signingInWith
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
