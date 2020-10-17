import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';
import theme from '../../styles/theme';

type TypeOceanoButton = {
  styledTheme: string;
};

export const OceanoButton = styled.button<TypeOceanoButton>`
  padding: 10px 20px;
  min-width: 50px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);
  color: #000;
  border: 2px solid #000;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'gray' &&
    css`
      background-color: ${theme.colors.gray};

      ${props.disabled &&
      `
        background-color: ${lighten(0.2, theme.colors.gray)};
        color: ${lighten(0.35, theme.colors.black)};
        border-color: ${lighten(0.35, theme.colors.black)};
      `}
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'yellow' &&
    css`
      background-color: ${theme.colors.yellow};

      ${props.disabled &&
      `
        background-color: ${lighten(0.03, theme.colors.yellow)};
        color: ${lighten(0.35, theme.colors.black)};
        border-color: ${lighten(0.35, theme.colors.black)};
      `}
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'purple' &&
    css`
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.gray};
      border: 2px solid ${theme.colors.gray};

      ${props.disabled &&
      `
        background-color: ${lighten(0.2, theme.colors.secondary)};
        color: ${lighten(0.1, theme.colors.gray)};
        border-color: ${lighten(0.1, theme.colors.gray)};
      `}
    `}

    ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'transparent' &&
    css`
      background-color: transparent;
      color: ${theme.colors.gray};
      border: 2px solid transparent;

      ${props.disabled &&
      `
        color: ${darken(0.2, theme.colors.gray)};
      `}
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
