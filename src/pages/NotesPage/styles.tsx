import styled from 'styled-components';

export const Content = styled.div`
  /* background: green; */
  width: 100%;
  display: block;
  margin: 0 auto;
  margin-top: 100px;
`;

export const WrapperBreadcrumbs = styled.div`
  margin-left: 20px;
`;

export const WrapperNotes = styled.div`
  /* background: gray; */
  text-align: center;

  div {
    display: inline-block;
    margin: 0 auto;
    margin-bottom: 25px;
  }

  @media (min-width: 700px) {
    div {
      margin: 0 15px 30px 15px;
    }
  }

  @media (min-width: 800px) {
    div {
      margin: 0 25px 50px 25px;
    }
  }
`;
