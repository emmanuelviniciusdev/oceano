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

      .oceano-bubble-loading {
        background-color: #000 !important;
      }

      ${props.disabled &&
      `
        background-color: ${lighten(0.2, theme.colors.gray)};
        color: ${lighten(0.35, theme.colors.black)};
        border-color: ${lighten(0.35, theme.colors.black)};

        .oceano-bubble-loading {
          background-color: ${lighten(0.35, theme.colors.black)} !important;
        }
      `}
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'yellow' &&
    css`
      background-color: ${theme.colors.yellow};

      .oceano-bubble-loading {
        background-color: #000 !important;
      }

      ${props.disabled &&
      `
        background-color: ${lighten(0.03, theme.colors.yellow)};
        color: ${lighten(0.35, theme.colors.black)};
        border-color: ${lighten(0.35, theme.colors.black)};

        .oceano-bubble-loading {
          background-color: ${lighten(0.35, theme.colors.black)} !important;
        }
      `}
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'purple' &&
    css`
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.gray};
      border: 2px solid ${theme.colors.gray};

      .oceano-bubble-loading {
        background-color: ${theme.colors.gray} !important;
      }

      ${props.disabled &&
      `
        background-color: ${lighten(0.2, theme.colors.secondary)};
        color: ${lighten(0.1, theme.colors.gray)};
        border-color: ${lighten(0.1, theme.colors.gray)};

        .oceano-bubble-loading {
          background-color: ${lighten(0.1, theme.colors.gray)} !important;
        }
      `}
    `}

    ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'transparent' &&
    css`
      background-color: transparent;
      color: ${theme.colors.gray};
      border: 2px solid transparent;

      .oceano-bubble-loading {
        background-color: ${theme.colors.gray} !important;
      }

      ${props.disabled &&
      `
        color: ${darken(0.2, theme.colors.gray)};

        .oceano-bubble-loading {
          background-color: ${darken(0.2, theme.colors.gray)} !important;
        }
      `}
    `}

    ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'transparent-for-light-bg' &&
    css`
      background-color: transparent;
      color: ${theme.colors.black};
      border: 2px solid transparent;

      .oceano-bubble-loading {
        background-color: ${theme.colors.black} !important;
      }

      ${props.disabled &&
      `
        color: ${lighten(0.4, theme.colors.black)};

        .oceano-bubble-loading {
          background-color: ${lighten(0.4, theme.colors.black)} !important;
        }
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
