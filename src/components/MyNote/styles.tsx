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
    min-height: 100px;
    max-height: 100px;
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
  margin-top: 150px;
  margin-bottom: 50px;

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

export const StackIndicators = styled.div`
  position: fixed;
  left: 30px;
  right: 30px;
  bottom: 20px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StatusIndicator = styled.div`
  min-width: 100px;
  min-height: 50px;
  position: relative;
  background: ${theme.colors.gray};
  padding: 10px 15px;
  margin-top: 10px;
  border: solid 3px #000;
  border-radius: ${theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .label {
    margin-left: 10px;
    color: #000;
    font-weight: 500;
    text-align: center;
  }

  .icon {
    color: #000;
    font-size: 23px;
    margin-top: 5px;

    .oceano-bubble-loading {
      margin-top: -5px;
    }
  }
`;
