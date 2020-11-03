import { transparentize } from 'polished';
import styled from 'styled-components';
import theme from '../../styles/theme';

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${transparentize(0.6, theme.colors.primary)};
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 30px 40px;
  background-color: ${theme.colors.primary};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 960px) {
    width: 400px;
    height: auto;
    padding: 40px 50px;
    border-radius: ${theme.borderRadius};
    box-shadow: 3px 4px 6px 2px rgba(0, 0, 0, 0.25);
  }
`;

export const ModalTitle = styled.p`
  font-weight: bold;
  color: ${theme.colors.gray};
  text-align: center;
  font-size: 48px;

  @media (min-width: 700px) {
    width: 70%;
  }

  @media (min-width: 960px) {
    width: 100%;
    font-size: 36px;
  }
`;

export const ModalText = styled.p`
  font-size: 24px;
  text-align: center;
  color: ${theme.colors.gray};
  margin-top: 20px;

  @media (min-width: 650px) {
    width: 70%;
  }

  @media (min-width: 960px) {
    width: 100%;
    font-size: 18px;
  }
`;

export const ModalActions = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: center;

  button,
  input {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  @media (min-width: 450px) {
    width: 65%;
  }

  @media (min-width: 570px) {
    width: 50%;
  }

  @media (min-width: 800px) {
    width: 40%;
  }

  @media (min-width: 900px) {
    width: 35%;
  }

  @media (min-width: 960px) {
    width: 100%;
  }
`;

export const ModalCloseButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  color: ${theme.colors.gray};
  font-size: 28px;
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
`;
