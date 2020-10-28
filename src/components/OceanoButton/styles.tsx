import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';
import theme from '../../styles/theme';
import { OceanoButtonThemesType } from '../../types-and-interfaces/components/OceanButton.types';

type TypeOceanoButton = {
  styledTheme: OceanoButtonThemesType;
};

const themes = {
  purple: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.gray,
    borderColor: theme.colors.gray,
    bubbleLoadingBg: theme.colors.gray,
    disabled: {
      backgroundColor: lighten(0.2, theme.colors.secondary),
      color: lighten(0.1, theme.colors.gray),
      borderColor: lighten(0.1, theme.colors.gray),
      bubbleLoadingBg: lighten(0.1, theme.colors.gray),
    },
  },
  yellow: {
    backgroundColor: theme.colors.yellow,
    color: theme.colors.black,
    borderColor: theme.colors.black,
    bubbleLoadingBg: theme.colors.black,
    disabled: {
      backgroundColor: lighten(0.03, theme.colors.yellow),
      color: lighten(0.35, theme.colors.black),
      borderColor: lighten(0.35, theme.colors.black),
      bubbleLoadingBg: lighten(0.35, theme.colors.black),
    },
  },
  gray: {
    backgroundColor: theme.colors.gray,
    color: theme.colors.black,
    borderColor: theme.colors.black,
    bubbleLoadingBg: theme.colors.black,
    disabled: {
      backgroundColor: lighten(0.2, theme.colors.gray),
      color: lighten(0.35, theme.colors.black),
      borderColor: lighten(0.35, theme.colors.black),
      bubbleLoadingBg: lighten(0.35, theme.colors.black),
    },
  },
  transparent: {
    backgroundColor: 'transparent',
    color: theme.colors.gray,
    borderColor: 'transparent',
    bubbleLoadingBg: theme.colors.gray,
    disabled: {
      backgroundColor: 'transparent',
      color: darken(0.2, theme.colors.gray),
      borderColor: 'transparent',
      bubbleLoadingBg: darken(0.2, theme.colors.gray),
    },
  },
  'transparent-for-light-bg': {
    backgroundColor: 'transparent',
    color: theme.colors.black,
    borderColor: 'transparent',
    bubbleLoadingBg: theme.colors.black,
    disabled: {
      backgroundColor: 'transparent',
      color: lighten(0.4, theme.colors.black),
      borderColor: 'transparent',
      bubbleLoadingBg: lighten(0.4, theme.colors.black),
    },
  },
};

export const OceanoButton = styled.button<TypeOceanoButton>`
  padding: 10px 20px;
  min-width: 50px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);

  background-color: ${(props) => themes[props.styledTheme].backgroundColor};
  color: ${(props) => themes[props.styledTheme].color};
  border: 2px solid ${(props) => themes[props.styledTheme].borderColor};

  .oceano-bubble-loading {
    background-color: ${(props) =>
      themes[props.styledTheme].bubbleLoadingBg} !important;
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;

      background-color: ${themes[props.styledTheme].disabled.backgroundColor};
      color: ${themes[props.styledTheme].disabled.color};
      border: 2px solid ${themes[props.styledTheme].disabled.borderColor};

      .oceano-bubble-loading {
        background-color: ${themes[props.styledTheme].disabled
          .bubbleLoadingBg} !important;
      }
    `}

  .button-content {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    font-size: 16px;

    .no-icon {
      width: 24px;
      height: 24px;
      margin-right: -24px;
    }

    .icon {
      display: flex;
      align-items: center;
      margin-right: 8px;
      /* background: gray; */
    }
  }
`;
