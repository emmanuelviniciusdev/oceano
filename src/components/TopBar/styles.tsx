import styled, { css } from 'styled-components';
import theme from '../../styles/theme';
import { TopBarStyleType } from '../../types-and-interfaces/components/TopBar.types';

export const TopBar = styled.nav`
  width: 100%;
  height: 70px;
  background-color: ${theme.colors.secondary};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px;
  z-index: 2;
`;

export const WrapperShowDesktopButtons = styled.div`
  display: none;

  @media (min-width: 960px) {
    display: block;
  }
`;

export const TopBarContainer = styled.div<TopBarStyleType>`
  width: 100%;
  max-width: 1300px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${(props) =>
    props.isMyNotePage &&
    css`
      justify-content: flex-end;

      @media (min-width: 960px) {
        justify-content: space-between;
        padding: 0 60px;
      }

      @media (min-width: 1300px) {
        padding: 0 30px;
      }
    `}
`;

export const WrapperInputSearch = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  background-color: ${theme.colors.secondary};
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);
  border-radius: ${theme.borderRadius};
  padding: 10px;

  .icon {
    /* background: gray; */
    color: ${theme.colors.gray};
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-top: -5px;
  }

  @media (min-width: 960px) {
    width: 40%;
  }
`;

export const InputSearch = styled.input`
  width: 100%;
  background-color: transparent;
  /* background-color: green; */
  color: ${theme.colors.gray};
  border: none;
  font-weight: 500;
  font-size: 16px;
  outline: none !important;

  ::placeholder {
    color: ${theme.colors.gray};
  }
`;

export const WrapperButtonsRightSide = styled.div`
  button {
    margin-right: 10px;
  }
`;

export const OpenMenuButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.gray};
  border: none;

  @media (min-width: 960px) {
    display: none;
  }
`;

export const TextOceano = styled.p<TopBarStyleType>`
  user-select: none;
  font-weight: bold;
  font-size: 24px;
  color: ${theme.colors.gray};
  display: none;

  ${(props) =>
    props.isMyNotePage &&
    css`
      @media (min-width: 960px) {
        display: block;
      }
    `}

  @media (min-width: 1280px) {
    display: block;
  }
`;
