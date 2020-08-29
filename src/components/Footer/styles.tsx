import styled from 'styled-components';
import theme from '../../styles/theme';

export const Footer = styled.footer`
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  background: ${theme.strongPrimary};
`;
