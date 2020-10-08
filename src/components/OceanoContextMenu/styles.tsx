import styled from 'styled-components';
import theme from '../../styles/theme';
import { Coordinates } from '../../types-and-interfaces/components/OceanoContextMenu.types';

export const StyledOceanoContextMenu = styled.div<Coordinates>`
  padding: 20px;
  background-color: ${theme.colors.strongPrimary};
  position: absolute;
  z-index: 1;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);
  border: solid 5px ${theme.colors.gray};
  border-radius: ${theme.borderRadius};
  left: ${(props) => props.xPosition}px;
  top: ${(props) => props.yPosition}px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin-bottom: 12px;
  }
  button:last-child {
    margin: 0;
  }
`;
