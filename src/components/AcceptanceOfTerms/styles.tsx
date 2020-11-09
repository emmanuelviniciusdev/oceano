import styled from 'styled-components';
import theme from '../../styles/theme';

export const ButtonClose = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 36px;
  line-height: 1.35;
  color: ${theme.colors.gray};
  background: transparent;
  border: none;
`;

export const Background = styled.div`
  background-color: ${theme.colors.primary};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: scroll;

  @media (min-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const WrapperContent = styled.div`
  /* background: green; */
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 100px;

  @media (min-width: 960px) {
    width: 650px;
    height: 100 !important;
    margin: 0;
    margin-top: -60px;
  }
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
  h2,
  p,
  li {
    color: ${theme.colors.gray};
  }

  @media (min-width: 600px) {
    width: 100%;
  }
`;

export const WrapperTerms = styled.div`
  /* background: gray; */
  margin-top: 20px;
  height: 400px;
  overflow-y: scroll;
  font-weight: 500;
  padding-right: 15px;

  p {
    font-size: 14px;
    color: ${theme.colors.gray};
    margin-bottom: 15px;
  }

  ul {
    list-style-type: disc !important;
    margin: 0 0 15px 40px;
  }
`;

export const ActionContent = styled.div`
  /* background: green; */
  margin-top: 20px;

  button {
    margin: 0 10px 10px 0 !important;
    display: block;
  }

  .wrapper-checkbox-acceptance {
    /* background: green; */
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    input {
      margin-right: 10px;
    }

    label {
      cursor: pointer;
      text-align: left;
      color: ${theme.colors.gray};
    }
  }

  @media (min-width: 600px) {
    button {
      display: inline-block;
    }
  }
`;
