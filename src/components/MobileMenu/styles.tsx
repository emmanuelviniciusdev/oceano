import styled from 'styled-components';
import theme from '../../styles/theme';

export const WrapperMobileMenu = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: ${theme.colors.secondary};
  text-align: center;

  .text-oceano {
    font-size: 36px;
    font-weight: bold;
    color: ${theme.colors.gray};
    margin-top: 30px;
  }
`;

export const CloseMenuButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.gray};
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const WrapperButtonsMenu = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;

  .button-menu {
    width: 100%;
    margin-bottom: 15px;
  }
`;
