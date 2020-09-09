import React from 'react';

// Assets
import googleBrands from '../../assets/images/google-brands.svg';

// Styles
import { ButtonSignInWithGoogle as StyledButtonSignInWithGoogle } from './styles';

const ButtonSignInWithGoogle = () => {
  return (
    <>
      <StyledButtonSignInWithGoogle>
        <div>
          <img src={googleBrands} alt="Letra G representando Google" />
          <p>
            Entrar usando o <b>Google</b>
          </p>
        </div>
      </StyledButtonSignInWithGoogle>
    </>
  );
};

export default ButtonSignInWithGoogle;
