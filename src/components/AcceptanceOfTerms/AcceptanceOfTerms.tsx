import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

// Icons
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

// Components
import OceanoButton from '../OceanoButton/OceanoButton';
import TextTermsOfUse from '../TextTermsOfUse/TextTermsOfUse';
import TextPrivacyPolicy from '../TextPrivacyPolicy/TextPrivacyPolicy';
import OceanoNotification from '../OceanoNotification/OceanoNotification';

// Types
import {
  AcceptanceOfTermsType,
  ContentComponentType,
  TypeOfContentType,
} from '../../types-and-interfaces/components/AcceptanceOfTerms.types';

// Styles
import {
  WrapperTerms,
  Background,
  Content,
  WrapperContent,
  ActionContent,
  ButtonClose,
} from './styles';
import { StackNotifications } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Setup
import { AppContext } from '../../store';

// Services
import { registerUser } from '../../services/user';

const contentEffectVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

const TermsOfUseContent = ({ translation, type }: ContentComponentType) => (
  <>
    <motion.div
      initial="initial"
      animate="animate"
      variants={contentEffectVariants}
    >
      <h1>{translation?.[type]?.title}</h1>
      <WrapperTerms>
        <TextTermsOfUse />
      </WrapperTerms>
    </motion.div>
  </>
);

const PrivacyPolicyContent = ({ translation, type }: ContentComponentType) => (
  <>
    <motion.div
      initial="initial"
      animate="animate"
      variants={contentEffectVariants}
    >
      <h1>{translation?.[type]?.title}</h1>
      <WrapperTerms>
        <TextPrivacyPolicy />
      </WrapperTerms>
    </motion.div>
  </>
);

const AcceptanceOfTerms: React.FunctionComponent<AcceptanceOfTermsType> = ({
  authType,
  onClose,
}) => {
  const isComponentUnmounted = useRef(false);

  const translation = useTranslation('AcceptanceOfTerms');
  const history = useHistory();
  const { user: userContext } = useContext(AppContext);

  const [contentType, setContentType] = useState<TypeOfContentType>(
    'terms-of-use'
  );
  const [userAcceptTerms, setUserAcceptTerms] = useState(false);
  const [isRegisteringUser, setIsRegisteringUser] = useState(false);
  const [
    showNotAuthenticatedUserError,
    setShowNotAuthenticatedUserError,
  ] = useState(false);
  const [showFinishingSignUpError, setShowFinishingSignUpError] = useState(
    false
  );

  const checkIfEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  const continueWithUserRegistration = async () => {
    if (!userContext?.state) {
      setShowNotAuthenticatedUserError(true);
      return;
    }

    setIsRegisteringUser(true);

    try {
      /**
       * Save user data into 'users' collection
       */
      await registerUser(userContext.state.uid, {
        email: userContext.state.email,
        displayName: userContext.state.displayName,
      });

      if (onClose) onClose();

      history.push('/notas');
    } catch (err) {
      console.error(err);
      setShowFinishingSignUpError(true);
    } finally {
      if (!isComponentUnmounted.current) setIsRegisteringUser(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', checkIfEscape, false);

    return () => {
      window.removeEventListener('keydown', checkIfEscape, false);
    };
  }, [checkIfEscape]);

  useEffect(() => {
    return () => {
      isComponentUnmounted.current = true;
    };
  }, []);

  return (
    <div data-testid="modal-acceptance-of-terms">
      <Background>
        <ButtonClose
          title={translation?.buttonClose?.title}
          aria-label={translation?.buttonClose?.title}
          data-testid="close-button"
          onClick={() => onClose && onClose()}
        >
          <CloseIcon fontSize="inherit" />
        </ButtonClose>

        <WrapperContent>
          <Content>
            {contentType === 'terms-of-use' && (
              <TermsOfUseContent translation={translation} type={contentType} />
            )}
            {contentType === 'privacy-policy' && (
              <PrivacyPolicyContent
                translation={translation}
                type={contentType}
              />
            )}

            <ActionContent>
              {contentType === 'terms-of-use' && (
                <OceanoButton
                  icon={<ArrowForwardIcon />}
                  text={translation?.buttonNext?.text}
                  aria-label={translation?.buttonNext?.text}
                  onClick={() => setContentType('privacy-policy')}
                />
              )}

              {contentType === 'privacy-policy' && (
                <>
                  <div className="wrapper-checkbox-acceptance">
                    <input
                      type="checkbox"
                      id="checkbox-acceptance"
                      data-testid="checkbox-acceptance"
                      checked={userAcceptTerms}
                      onChange={() => setUserAcceptTerms(!userAcceptTerms)}
                    />
                    <label
                      htmlFor="checkbox-acceptance"
                      dangerouslySetInnerHTML={{
                        __html: translation?.termsAcceptanceText,
                      }}
                    />
                  </div>
                  <OceanoButton
                    icon={<ArrowBackIcon />}
                    text={translation?.buttonReturn?.text}
                    aria-label={translation?.buttonReturn?.text}
                    onClick={() => setContentType('terms-of-use')}
                  />
                  <OceanoButton
                    isLoading={isRegisteringUser}
                    disabled={!userAcceptTerms || isRegisteringUser}
                    icon={<ArrowRightAltIcon />}
                    text={`${translation?.buttonCreateAccount?.text} ${authType}`}
                    aria-label={`${translation?.buttonCreateAccount?.text} ${authType}`}
                    onClick={continueWithUserRegistration}
                  />
                </>
              )}
            </ActionContent>
          </Content>
        </WrapperContent>
      </Background>

      <StackNotifications>
        <AnimatePresence>
          {showNotAuthenticatedUserError && (
            <OceanoNotification
              key="user-not-authenticated"
              type="error"
              onClose={() => setShowNotAuthenticatedUserError(false)}
            >
              {translation?.notAuthenticatedUserErrorMsg}
            </OceanoNotification>
          )}
          {showFinishingSignUpError && (
            <OceanoNotification
              key="finishing-sign-up-error"
              type="error"
              onClose={() => setShowFinishingSignUpError(false)}
            >
              {translation?.finishingSignUpErrorMsg}
            </OceanoNotification>
          )}
        </AnimatePresence>
      </StackNotifications>
    </div>
  );
};

export default AcceptanceOfTerms;
