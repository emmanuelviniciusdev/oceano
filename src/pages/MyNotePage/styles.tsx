import styled, { createGlobalStyle } from 'styled-components';
import clownfish from '../../assets/images/clownfish.png';

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

export const WrapperInformations = styled.div`
  /* background: burlywood; */
  width: 100%;
  margin-bottom: 30px;

  button {
    margin-right: 10px;
  }

  @media (min-width: 960px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 30px;
  }
`;
