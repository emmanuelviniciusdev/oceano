import React from 'react';

// Assets
import googleBrands from '../../assets/images/google-brands.svg';

// Styles
import { ButtonSignIn } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const ButtonSignInWithGoogle: React.FunctionComponent<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = ({ ...props }) => {
  const translation = useTranslation('ButtonSignInWithGoogle');

  return (
    <ButtonSignIn {...props}>
      <div>
        <img src={googleBrands} alt={translation?.altImg} />
        <p dangerouslySetInnerHTML={{ __html: translation?.text }}></p>
      </div>
    </ButtonSignIn>
  );
};

export default ButtonSignInWithGoogle;
