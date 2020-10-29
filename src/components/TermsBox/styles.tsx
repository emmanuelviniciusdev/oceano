import styled from 'styled-components';
import theme from '../../styles/theme';

export const WrapperStyledTermsBox = styled.div`
  /* background: green; */
  width: 100%;
  height: 100vh;

  @media (min-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (max-height: 660px) {
    margin: 100px 0 100px 0 !important;
  }
`;

export const StyledTermsBox = styled.div`
  width: 100%;
  padding: 35px;
  border-radius: 10px;
  background-color: ${theme.colors.yellow};
  box-shadow: 3px 4px 6px 2px rgba(0, 0, 0, 0.25);
  margin: 70px 0 70px 0;

  h1 {
    color: ${theme.colors.black};
    font-size: 36px;
    font-weight: 900;
  }

  @media (min-width: 600px) {
    padding: 50px;
  }

  @media (min-width: 960px) {
    margin: 0 !important;
    width: 85%;
    padding: 60px;
    border: 10px solid ${theme.colors.black};
  }
`;

export const TermsContent = styled.div`
  /* background: gray; */
  margin-top: 20px;
  max-height: 400px;
  overflow-y: scroll;
  font-weight: 500;

  p {
    font-size: 14px;
    color: ${theme.colors.black};
    margin-bottom: 15px;
  }
`;

export const ActionContent = styled.div`
  /* background: green; */
  margin-top: 20px;

  button {
    margin: 0 10px 10px 0 !important;
    display: block;
  }

  @media (min-width: 600px) {
    button {
      display: inline-block;
    }
  }

  @media (min-width: 1280px) {
    margin-top: 40px;
  }
`;
