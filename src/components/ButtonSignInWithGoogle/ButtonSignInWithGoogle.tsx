import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Assets
import googleBrands from '../../assets/images/google-brands.svg';

// Styles
import { ButtonSignIn } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';
import AcceptanceOfTerms from '../AcceptanceOfTerms/AcceptanceOfTerms';

// Components

const ButtonSignInWithGoogle = () => {
  const translation = useTranslation('ButtonSignInWithGoogle');
  const [acceptanceIsOpen, setAcceptanceIsOpen] = useState(false);

  return (
    <>
      <ButtonSignIn onClick={() => setAcceptanceIsOpen(true)}>
        <div>
          <img src={googleBrands} alt={translation?.altImg} />
          <p dangerouslySetInnerHTML={{ __html: translation?.text }}></p>
        </div>
      </ButtonSignIn>

      {!acceptanceIsOpen && <AcceptanceOfTerms />}
    </>
  );
};

export default ButtonSignInWithGoogle;
