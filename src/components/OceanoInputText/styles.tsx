import { darken, lighten } from 'polished';
import styled from 'styled-components';
import theme from '../../styles/theme';

// Types
import { OceanoInputThemesType } from '../../types-and-interfaces/components/OceanoInputText.types';

const styledThemes = {
  transparent: {
    color: theme.colors.gray,
    disabled: {
      color: darken(0.2, theme.colors.gray),
    },
  },
  'transparent-for-light-bg': {
    color: theme.colors.black,
    disabled: {
      color: lighten(0.4, theme.colors.black),
    },
  },
};

export const StyledOceanoInputText = styled.input<{
  styledTheme: OceanoInputThemesType;
}>`
  background-color: transparent;
  color: ${(props) => styledThemes[props.styledTheme].color};
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: ${theme.borderRadius};
  padding: 15px;
  font-size: 16px;
  font-weight: 500;

  :disabled {
    cursor: not-allowed;
    color: ${(props) => styledThemes[props.styledTheme].disabled.color};
  }
`;
