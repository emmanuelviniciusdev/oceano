import styled from 'styled-components';
import theme from '../../styles/theme';

export const WrapperSelect = styled.div`
  /* background: red;  */
  min-width: 120px;
  display: flex;
  color: ${theme.gray};
  align-items: center;

  .icon {
    margin-right: 3px;
  }

  select {
    width: 100%;
    background-color: transparent;
    color: inherit;
    font-weight: bold;
    font-size: 16px;
    border: none;
    appearance: none;
    cursor: pointer;
    padding: 10px;
  }
`;
