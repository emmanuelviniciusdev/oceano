import styled from 'styled-components';
import theme from '../../styles/theme';
import { readableColor } from 'polished';

export const WrapperSwitchLanguage = styled.div`
  /* background: green; */
  display: flex;

  div {
    margin-left: auto;
    margin-top: 15px;
    margin-right: 10px;
  }
`;

export const WrapperLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
  /* background: red; */

  @media (min-width: 600px) {
    img {
      width: 360px;
    }
  }

  @media (min-width: 960px) {
    margin-top: 15px;
  }
`;

export const BoxIntroduction = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 35px;
  border-radius: 5px;
  background-color: ${theme.colors.yellow};
  color: ${readableColor(theme.colors.yellow)};
  display: flex;
  flex-direction: column;
  box-shadow: 3px 4px 6px 2px rgba(0, 0, 0, 0.25);

  .login,
  .introduction {
    padding: 35px;
  }

  .login {
    text-align: center;

    h1 {
      font-size: 28px;
      font-weight: 900;
    }

    .btn-login {
      margin: 0 auto;
      margin-top: 10px;
    }
  }

  .introduction p {
    font-size: 22px;
    text-align: right;
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  hr {
    width: 100%;
    border: 2px solid black;
    margin: 15px 0;
  }

  @media (min-width: 600px) {
    width: 450px;

    .introduction p {
      /* background: green; */
      font-size: 24px;
    }
  }

  @media (min-width: 960px) {
    width: 710px;
    min-height: 350px;
    margin-top: 45px;
    flex-direction: row-reverse;

    .login h1 {
      text-align: justify;
    }

    hr {
      width: auto;
      margin: 0 10px;
    }
  }
`;
