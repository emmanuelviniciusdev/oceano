import styled from 'styled-components';
import theme from '../../styles/theme';

export const WrapperContent = styled.div`
  margin-top: 10vh;
  text-align: center;

  .not-found-code {
    font-size: 96px;
    font-weight: 900;
    color: ${theme.strongPrimary};
  }

  h1,
  h2 {
    color: ${theme.gray};
    margin-bottom: 10px;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 20px;
  }

  .button-return {
    margin-top: 20px;
  }

  @media (min-width: 600px) {
    .not-found-code {
      font-size: 144px;
    }

    h1 {
      font-size: 35px;
    }
  }
`;
