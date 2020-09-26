import styled, { css } from 'styled-components';
import theme from '../../styles/theme';
import { NoteOrFolderType } from '../../types-and-interfaces/components/NoteOrFolder.types';

export const StyledNoteOrFolder = styled.div<NoteOrFolderType>`
  width: 350px;
  height: 250px;
  background-color: ${theme.colors.yellow};
  border: solid 8px #000;
  border-radius: ${theme.borderRadius};
  box-shadow: 3px 4px 6px 2px rgba(0, 0, 0, 0.25);

  p {
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

  ${(props) =>
    props.type === 'folder' &&
    css`
      background-color: rgba(1, 31, 47, 0.3);
      backdrop-filter: blur(8px);
      border-color: ${theme.colors.gray};

      p {
        color: ${theme.colors.gray};
      }
    `}
`;
