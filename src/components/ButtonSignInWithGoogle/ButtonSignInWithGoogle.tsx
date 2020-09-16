import React from 'react';
import { useHistory } from 'react-router-dom';

// Assets
import googleBrands from '../../assets/images/google-brands.svg';

// Styles
import { ButtonSignIn } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const ButtonSignInWithGoogle = () => {
  const translation = useTranslation('ButtonSignInWithGoogle');
  const history = useHistory();

  return (
    <>
      <ButtonSignIn onClick={() => history.push('notas')}>
        <div>
          <img src={googleBrands} alt={translation?.altImg} />
          <p dangerouslySetInnerHTML={{ __html: translation?.text }}></p>
        </div>
      </ButtonSignIn>
    </>
  );
};

export default ButtonSignInWithGoogle;
