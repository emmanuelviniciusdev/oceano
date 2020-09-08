import styled from 'styled-components';
import theme from '../../styles/theme';

export const Button = styled.button`
  padding: 10px 20px;
  min-width: 130px;
  color: ${theme.gray};
  font-weight: bold;
  background-color: ${theme.secondary};
  border-radius: 5px;
  border: 2px solid ${theme.gray};
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);
  cursor: pointer;

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
