import React from 'react';

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import { WrapperSwitchLanguage, WrapperLogo, BoxIntroduction } from './styles';

// Components
import SwitchLanguage from '../../components/SwitchLanguage/SwitchLanguage';
import ButtonSignInWithGoogle from '../../components/ButtonSignInWithGoogle/ButtonSignInWithGoogle';
import ButtonSignInWithMicrosoft from '../../components/ButtonSignInWithMicrosoft/ButtonSignInWithMicrosoft';

const IndexPage = () => {
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
          <h1>iniciar sessão</h1>

          <div className="btns-login">
            <ButtonSignInWithGoogle />
            <ButtonSignInWithMicrosoft />
          </div>
        </div>

        <hr />

        <div className="introduction">
          <p>
            suas anotações <b>salvas</b> nas profundezas do <b>inexplorável.</b>
          </p>
          <p>
            diga <b>adeus</b> às suas antigas notinhas de papel e dê um{' '}
            <b>olá</b> ao <b>oceano.</b>
          </p>
          <p>
            <b>experimente.</b>
          </p>
        </div>
      </BoxIntroduction>
    </>
  );
};

export default IndexPage;
