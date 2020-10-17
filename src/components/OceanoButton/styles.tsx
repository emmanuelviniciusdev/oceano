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
    props.styledTheme &&
    props.styledTheme === 'gray' &&
    css`
      background-color: ${theme.colors.gray};
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'yellow' &&
    css`
      background-color: ${theme.colors.yellow};
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'purple' &&
    css`
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.gray};
      border: 2px solid ${theme.colors.gray};
    `}

    ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'transparent' &&
    css`
      background-color: transparent;
      color: ${theme.colors.gray};
      border: 2px solid transparent;
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
