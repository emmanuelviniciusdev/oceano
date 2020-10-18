import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Assets
import googleBrands from '../../assets/images/google-brands.svg';

// Styles
import { ButtonSignIn } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Components
import AcceptanceOfTerms from '../AcceptanceOfTerms/AcceptanceOfTerms';

// Services
import { signInWithGogle } from '../../services/auth';

const ButtonSignInWithGoogle = () => {
  const translation = useTranslation('ButtonSignInWithGoogle');
  const history = useHistory();

  const [acceptanceIsOpen, setAcceptanceIsOpen] = useState(false);

  const handleSignIn = async () => {
    try {
      await signInWithGogle();
      history.push('/notas');
    } catch (err) {
      if (err.message === 'oceano-auth/user-did-not-accept-terms') {
        setAcceptanceIsOpen(true);
      }
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
    </>
  );
};

export default ButtonSignInWithGoogle;
