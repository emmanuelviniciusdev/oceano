import React from 'react';

// Assets
import googleBrands from '../../assets/images/google-brands.svg';

// Styles
import { ButtonSignIn } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const ButtonSignInWithGoogle = () => {
  const translation = useTranslation('ButtonSignInWithGoogle');

  return (
    <>
      <ButtonSignIn>
        <div>
          <img src={googleBrands} alt={translation?.altImg} />
          <p dangerouslySetInnerHTML={{ __html: translation?.text }}></p>
        </div>
      </ButtonSignIn>
    </>
  );
};

export default ButtonSignInWithGoogle;
