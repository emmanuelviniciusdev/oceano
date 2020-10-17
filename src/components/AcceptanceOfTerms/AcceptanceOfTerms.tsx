import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Icons
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

// Components
import OceanoButton from '../OceanoButton/OceanoButton';
import TextTermsOfUse from '../TextTermsOfUse/TextTermsOfUse';
import TextPrivacyPolicy from '../TextPrivacyPolicy/TextPrivacyPolicy';

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

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

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
  const translation = useTranslation('AcceptanceOfTerms');

  const [contentType, setContentType] = useState<TypeOfContentType>(
    'terms-of-use'
  );
  const [userAcceptTerms, setUserAcceptTerms] = useState(false);

  const checkIfEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', checkIfEscape, false);

    return () => {
      window.removeEventListener('keydown', checkIfEscape, false);
    };
  }, [checkIfEscape]);

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
                      checked={userAcceptTerms}
                      onChange={() => setUserAcceptTerms(!userAcceptTerms)}
                    />
                    <label htmlFor="checkbox-acceptance">
                      li e aceito os <b>termos de uso</b> e a{' '}
                      <b>política de privacidade</b>
                    </label>
                  </div>
                  <OceanoButton
                    icon={<ArrowBackIcon />}
                    text={translation?.buttonReturn?.text}
                    aria-label={translation?.buttonReturn?.text}
                    onClick={() => setContentType('terms-of-use')}
                  />
                  <OceanoButton
                    disabled={!userAcceptTerms}
                    icon={<ArrowRightAltIcon />}
                    text={`${translation?.buttonCreateAccount?.text} ${authType}`}
                    aria-label={`${translation?.buttonCreateAccount?.text} ${authType}`}
                  />
                </>
              )}
            </ActionContent>
          </Content>
        </WrapperContent>
      </Background>
    </div>
  );
};

export default AcceptanceOfTerms;
