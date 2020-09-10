import styled from 'styled-components';
import theme from './theme';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  /* background: green; */
`;

export const ButtonSignIn = styled.button`
  background-color: ${theme.colors.white};
  color: #000;
  padding: 5px;
  border: 2px solid #000;
  border-radius: 5px;
  min-width: 240px;
  height: 40px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 20px;
      height: 20px;
    }

    p {
      margin-left: 10px;
      font-size: 14px;
    }
  }
`;
