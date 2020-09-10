import React from 'react';

// Assets
import googleBrands from '../../assets/images/google-brands.svg';

// Styles
import { ButtonSignIn } from '../../styles/general';

const ButtonSignInWithGoogle = () => {
  return (
    <>
      <ButtonSignIn>
        <div>
          <img src={googleBrands} alt="Logo do Google" />
          <p>
            entrar usando o <b>Google</b>
          </p>
        </div>
      </ButtonSignIn>
    </>
  );
};

export default ButtonSignInWithGoogle;
