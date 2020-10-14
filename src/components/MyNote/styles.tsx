import styled from 'styled-components';
import theme from '../../styles/theme';

export const WrapperContentEditor = styled.div`
  width: 100%;
  height: 600px;
  background-color: ${theme.colors.yellow};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  overflow-y: scroll;

  .title-textarea {
    width: 90%;
    background-color: transparent;
    font-size: 24px;
    font-weight: bold;
    padding: 20px;
    margin: 20px 0;
    border: none;
    border-radius: ${theme.borderRadius};
    resize: none;
    outline: none;
    position: absolute;

    :focus {
      background-color: ${theme.colors.slightlyStrongYellow};
    }
  }

  @media (min-width: 960px) {
    width: 90%;
    margin: 0 auto;
    border: solid 8px #000;
    border-radius: ${theme.borderRadius};
  }
`;

export const WrapperEditorJs = styled.div`
  position: relative;
  width: 90%;
  margin: 120px 0 50px 0;

  #editor-js {
    width: 100%;
    color: #000;
    background: ${theme.colors.slightlyStrongYellow};
    border-radius: ${theme.borderRadius};
    padding: 20px 40px;
    z-index: 0;

    .ce-block__content,
    .ce-toolbar__content {
      width: 100%;
      max-width: none;
    }
  }
`;
