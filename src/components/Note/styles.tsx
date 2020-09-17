import styled from 'styled-components';
import theme from '../../styles/theme';

export const StyledNote = styled.div`
  width: 350px;
  height: 250px;
  background-color: ${theme.colors.yellow};
  border-radius: ${theme.borderRadius};
  box-shadow: 3px 4px 6px 2px rgba(0, 0, 0, 0.25);
  display: inline-block;
  margin: 0 50px 50px 0;
`;
