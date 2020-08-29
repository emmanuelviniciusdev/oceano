import styled from 'styled-components';
import theme from '../../styles/theme';

export const WrapperSelect = styled.div`
  min-width: 120px;
  /* background: red; */
  display: flex;
  color: ${theme.gray};

  .icon {
    margin-right: 8px;
  }

  select {
    width: 100%;
    background-color: transparent;
    color: inherit;
    font-weight: bold;
    font-size: 16px;
    border: none;
    appearance: none;
    outline-color: ${theme.secondary};
    cursor: pointer;
  }
`;
