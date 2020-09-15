import React from 'react';

// Assets
import microsoftBox from '../../assets/images/microsoft-box.png';

// Styles
import { ButtonSignIn } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const ButtonSignInWithMicrosoft = () => {
  const translation = useTranslation('ButtonSignInWithMicrosoft');

  return (
    <>
      <ButtonSignIn>
        <div>
          <img src={microsoftBox} alt={translation?.altImg} />
          <p dangerouslySetInnerHTML={{ __html: translation?.text }}></p>
        </div>
      </ButtonSignIn>
    </>
  );
};

export default ButtonSignInWithMicrosoft;
