import styled from 'styled-components';
import theme from '../../styles/theme';

export const Background = styled.div`
  background-color: ${theme.colors.primary};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: scroll;
`;

export const ButtonClose = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 36px;
  line-height: 1.35;
  color: ${theme.colors.gray};
  background: transparent;
  border: none;
`;

export const WrapperContent = styled.div`
  /* background: gray; */
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 100px;
`;

export const Content = styled.div`
  /* background: #ccc; */
  text-align: justify;

  h1 {
    font-size: 36px !important;
    font-weight: 900 !important;
    text-align: left;
    color: ${theme.colors.gray};
  }
`;

export const WrapperTerms = styled.div`
  /* background: gray; */
  margin-top: 20px;
  height: 400px;
  overflow-y: scroll;
  font-weight: 500;

  p {
    font-size: 14px;
    color: ${theme.colors.gray};
    margin-bottom: 15px;
  }
`;

export const ActionContent = styled.div`
  margin-top: 20px;

  button {
    margin: 0 10px 10px 0 !important;
  }

  .wrapper-checkbox-acceptance {
    /* background: green; */
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input {
      margin-right: 15px;
    }

    label {
      text-align: left;
      color: ${theme.colors.gray};
    }
  }
`;
