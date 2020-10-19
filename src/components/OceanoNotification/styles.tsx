import styled from 'styled-components';
import theme from '../../styles/theme';

// Types
import { TypesOfNotificationType } from '../../types-and-interfaces/components/OceanoNotification.types';

const typeThemes = {
  clownfish: {
    backgroundColor: theme.colors.clownfishBlack,
    borderColor: theme.colors.clownfishOrange,
    color: theme.colors.white,
  },
  warning: {
    backgroundColor: theme.colors.orange,
    borderColor: theme.colors.clownfishOrange,
    color: theme.colors.white,
  },
  error: {
    backgroundColor: theme.colors.red,
    borderColor: theme.colors.strongRed,
    color: theme.colors.white,
  },
};

export const StyledNotification = styled.div<{ type: TypesOfNotificationType }>`
  min-width: 100px;
  min-height: 50px;
  position: relative;
  background-color: ${(props) => typeThemes[props.type].backgroundColor};
  padding: 10px 15px;
  margin-top: 10px;
  border: solid 3px ${(props) => typeThemes[props.type].borderColor};
  border-radius: ${theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NotificationText = styled.div<{ type: TypesOfNotificationType }>`
  margin-left: 10px;
  color: ${(props) => typeThemes[props.type].color};
  font-weight: 500;
  text-align: center;
`;

export const NotificationIcon = styled.div<{ type: TypesOfNotificationType }>`
  color: ${(props) => typeThemes[props.type].color};
  font-size: 23px;
  margin-top: 5px;

  .oceano-bubble-loading {
    margin-top: -5px;
    background-color: ${(props) => typeThemes[props.type].color};
  }
`;
