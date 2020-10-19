import React from 'react';

// Assets
import githubImg from '../../assets/images/github.webp';

// Styles
import { ButtonSignIn } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const ButtonSignInWithGithub = () => {
  const translation = useTranslation('ButtonSignInWithGithub');

  return (
    <>
      <ButtonSignIn>
        <div>
          <img src={githubImg} alt={translation?.altImg} />
          <p dangerouslySetInnerHTML={{ __html: translation?.text }}></p>
        </div>
      </ButtonSignIn>
    </>
  );
};

export default ButtonSignInWithGithub;
