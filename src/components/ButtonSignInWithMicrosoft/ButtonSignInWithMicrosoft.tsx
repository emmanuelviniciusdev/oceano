import React from 'react';

// Assets
import microsoftBox from '../../assets/images/microsoft-box.png';

// Styles
import { ButtonSignIn } from '../../styles/general';

const ButtonSignInWithMicrosoft = () => {
  return (
    <>
      <ButtonSignIn>
        <div>
          <img src={microsoftBox} alt="Logo da Microsoft" />
          <p>
            entrar usando a <b>Microsoft</b>
          </p>
        </div>
      </ButtonSignIn>
    </>
  );
};

export default ButtonSignInWithMicrosoft;
