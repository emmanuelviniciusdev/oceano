import styled from 'styled-components';
import theme from '../../styles/theme';
import { OceanoCardThemesType } from '../../types-and-interfaces/components/OceanoCard.types';

export const StyledOceanoCard = styled.div<{
  oceanoCardTheme: OceanoCardThemesType;
}>`
  width: 100%;
  padding: 30px;
  box-shadow: 3px 4px 6px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: ${(props) =>
    theme.predefinedThemes[props.oceanoCardTheme].backgroundColor};
  color: ${(props) => theme.predefinedThemes[props.oceanoCardTheme].color};
  border: solid 10px
    ${(props) => theme.predefinedThemes[props.oceanoCardTheme].borderColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const WrapperIcon = styled.div`
  margin-bottom: 30px;
  font-size: 60px;
`;

export const WrapperText = styled.div<{
  oceanoCardTheme: OceanoCardThemesType;
}>`
  text-align: center;
  color: ${(props) => theme.predefinedThemes[props.oceanoCardTheme].color};
  margin-bottom: 45px;
`;

export const WrapperActions = styled.div<{
  oceanoCardTheme: OceanoCardThemesType;
}>`
  text-align: center;

  button {
    color: ${(props) => theme.predefinedThemes[props.oceanoCardTheme].color};
    display: inline-block;
    margin: 0 10px 15px 0;
  }
`;
