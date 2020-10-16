import styled, { createGlobalStyle } from 'styled-components';
import theme from '../../styles/theme';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.yellow} !important;
  }
`;

export const Content = styled.div`
  /* background-color: gray; */
  color: ${theme.colors.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

export const TurtleImg = styled.img`
  width: 320px;

  @media (min-width: 600px) {
    width: 400px;
  }

  @media (min-width: 960px) {
    width: 510px;
  }
`;

export const TextContent = styled.div`
  margin-top: 50px;
  text-align: center;
`;

export const OfflineText = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-between;
  /* background: gray; */

  h1 {
    font-size: 42px;
    font-weight: 900;
  }

  .icon {
    font-size: 36px;
    margin-top: 9px;
  }

  @media (min-width: 600px) {
    width: 455px;

    h1 {
      font-size: 60px;
    }

    .icon {
      font-size: 50px;
      margin-top: 14px;
    }
  }

  @media (min-width: 960px) {
    width: 725px;

    h1 {
      font-size: 96px;
    }

    .icon {
      font-size: 80px;
      margin-top: 26px;
    }
  }
`;

export const TryingReconnectionText = styled.h2`
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;

  @media (min-width: 600px) {
    font-size: 20px;
  }

  @media (min-width: 960px) {
    font-size: 24px;
  }
`;

export const OceanoTextAtBottom = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.gray};
  margin-top: 80px;
  user-select: none;

  @media (min-width: 960px) {
    font-size: 36px;
  }

  @media (min-height: 780px) {
    margin-top: 0;
    position: fixed;
    bottom: 20px;
  }
`;
