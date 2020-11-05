import styled from 'styled-components';

export const Content = styled.div`
  /* background: green; */
  padding-bottom: 30px;

  button {
    margin: 0 10px 10px 0;
  }
`;

export const WrapperOceanoNotification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;

  @media (min-width: 600px) {
    margin-right: 0;
  }
`;
