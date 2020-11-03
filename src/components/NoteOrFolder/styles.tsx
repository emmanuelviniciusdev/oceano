import styled, { css } from 'styled-components';
import theme from '../../styles/theme';

export const StyledNoteOrFolder = styled.div<{ type: 'note' | 'folder' }>`
  width: 350px;
  height: 250px;
  position: relative;
  background-color: ${theme.colors.yellow};
  border: solid 8px #000;
  border-radius: ${theme.borderRadius};
  box-shadow: 3px 4px 6px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    transition: 0.2s all;
    transform: scale(1.1);
  }

  p,
  textarea {
    width: 100%;
    height: 100%;
    background: transparent;
    color: #000;
    font-weight: bold;
    font-size: 36px;
    overflow: hidden;
    padding: 20px;
    text-align: left;
  }

  p {
    user-select: none;
  }

  textarea {
    resize: none;
    outline: none;
  }

  ${(props) =>
    props.type === 'folder' &&
    css`
      background-color: rgba(1, 31, 47, 0.3);
      backdrop-filter: blur(8px);
      border-color: ${theme.colors.gray};

      p,
      textarea {
        color: ${theme.colors.gray};
      }
    `}
`;

export const WrapperBtnSaveTitle = styled.div`
  /* background: green; */
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
`;
