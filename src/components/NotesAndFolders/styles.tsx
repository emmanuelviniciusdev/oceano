import styled from 'styled-components';
import theme from '../../styles/theme';

export const MotionDivWrapperNoteOrFolder = styled.div`
  display: inline-block;
  margin: 0 auto;
  margin-bottom: 25px;

  @media (min-width: 700px) {
    margin: 0 15px 30px 15px;
  }

  @media (min-width: 800px) {
    margin: 0 25px 50px 25px;
  }
`;

export const WrapperOceanoCard = styled.div`
  /* background-color: green; */
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
`;

export const BoxResult = styled.div`
  width: 320px;
  min-height: 345px;
  background-color: ${theme.colors.yellow};
  color: ${theme.colors.black};
  border: solid 8px ${theme.colors.black};
  border-radius: ${theme.borderRadius};
  box-shadow: 3px 4px 6px 2px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  padding: 35px;

  @media (min-width: 600px) {
    width: 440px;
    min-height: 440px;
  }
`;

export const BoxResultTitle = styled.p`
  font-size: 26px;

  @media (min-width: 600px) {
    font-size: 36px;
  }
`;

export const BoxResultText = styled.p`
  font-size: 18px;
  text-align: right;
  margin-top: 15px;

  @media (min-width: 600px) {
    font-size: 24px;
  }
`;

export const BoxResultImage = styled.img`
  width: 100%;
  margin-top: 40px;

  @media (min-width: 600px) {
    margin-top: 50px;
  }
`;
