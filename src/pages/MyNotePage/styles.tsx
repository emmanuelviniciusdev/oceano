import styled, { createGlobalStyle } from 'styled-components';
import clownfish from '../../assets/images/clownfish.png';
import theme from '../../styles/theme';

export const GlobalStyle = createGlobalStyle`
    body {
        background-image: url(${clownfish});
        background-size: 300px 200px;
    }
`;

export const WrapperContent = styled.div`
  margin-top: 100px;
  /* background: green; */
`;

export const WrapperBreadcrumbs = styled.div`
  margin-left: 20px;
`;

export const WrapperContentEditor = styled.div`
  width: 100%;
  height: 600px;
  background-color: ${theme.colors.yellow};
  display: flex;
  justify-content: center;
  border-radius: 10px 10px 0 0;

  .title-textarea {
    width: 90%;
    background-color: transparent;
    font-size: 24px;
    font-weight: bold;
    padding: 20px;
    margin: 20px 0;
    border: none;
    border-radius: ${theme.borderRadius};
    resize: none;
    outline: none;

    :focus {
      background-color: ${theme.colors.slightlyStrongYellow};
    }
  }

  @media (min-width: 960px) {
    width: 90%;
    margin: 0 auto;
    border: solid 8px #000;
    border-radius: ${theme.borderRadius};
  }
`;
