import styled from 'styled-components';
import theme from '../../styles/theme';

export const ButtonSignInWithGoogle = styled.button`
  background-color: ${theme.white};
  color: #000;
  padding: 5px;
  border: 2px solid #000;
  border-radius: 5px;
  min-width: 210px;
  height: 40px;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      margin-left: 10px;
      font-size: 14px;
    }
  }
`;
