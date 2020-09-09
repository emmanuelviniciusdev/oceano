import styled, { css } from 'styled-components';
import theme from '../../styles/theme';

type TypeStyledOceanButton = {
  styledTheme: string;
};

export const StyledOceanButton = styled.button<TypeStyledOceanButton>`
  padding: 10px 20px;
  min-width: 130px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: #000;
  border: 2px solid #000;

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'gray' &&
    css`
      background-color: ${theme.gray};
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'yellow' &&
    css`
      background-color: ${theme.yellow};
    `}

  ${(props) =>
    props.styledTheme &&
    props.styledTheme === 'purple' &&
    css`
      background-color: ${theme.secondary};
      color: ${theme.gray};
      border: 2px solid ${theme.gray};
    `}

  .button-content {
    display: flex;
    align-items: center;
    font-size: 16px;

    .icon {
      display: flex;
      align-items: center;
      margin-right: 8px;
      /* background: gray; */
    }
  }
`;
