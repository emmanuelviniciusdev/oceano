import React from 'react';

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import { WrapperSwitchLanguage, WrapperLogo, BoxIntroduction } from './styles';

// Components
import SwitchLanguage from '../../components/SwitchLanguage/SwitchLanguage';
import ButtonSignInWithGoogle from '../../components/ButtonSignInWithGoogle/ButtonSignInWithGoogle';
import ButtonSignInWithGithub from '../../components/ButtonSignInWithGithub/ButtonSignInWithGithub';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

const IndexPage = () => {
  const translation = useTranslation('IndexPage');

  return (
    <>
      <WrapperSwitchLanguage>
        <div>
          <SwitchLanguage />
        </div>
      </WrapperSwitchLanguage>
      <WrapperLogo>
        <img src={logo} alt="oceano" />
      </WrapperLogo>
      <BoxIntroduction>
        <div className="login">
          <h1>{translation?.signIn?.title}</h1>

          <div className="btns-login">
            <ButtonSignInWithGoogle />
            <ButtonSignInWithGithub />
          </div>
        </div>

        <hr />

        <div className="introduction">
          <p
            dangerouslySetInnerHTML={{
              __html: translation?.presentation?.paragraph1,
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: translation?.presentation?.paragraph2,
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: translation?.presentation?.paragraph3,
            }}
          ></p>
        </div>
      </BoxIntroduction>
    </>
  );
};

export default IndexPage;
