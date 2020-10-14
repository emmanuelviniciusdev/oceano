import React, { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import EditorJs from 'react-editor-js';
import EditorJS, { API, OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';

// Styles
import { WrapperContentEditor, WrapperEditorJs } from './styles';

const editorJsTools = {
  header: Header,
  list: List,
  delimiter: Delimiter,
  checklist: Checklist,
  embed: Embed,
};

const MyNote = () => {
  const [noteData, setNoteData] = useState<OutputData>();

  useEffect(() => {
    // Add CTRL+S event listener to save data in database...
  }, []);

  useEffect(() => console.log(noteData), [noteData]);

  return (
    <>
      <WrapperContentEditor>
        <TextareaAutosize
          className="title-textarea"
          defaultValue="clique para começar a editar..."
          placeholder="título"
        />

        <WrapperEditorJs>
          <EditorJs
            placeholder="..."
            tools={editorJsTools}
            onChange={(api: API, data?: OutputData) => {
              console.log(data);
              setNoteData(data);

              // save data in database from here...
            }}
          />
        </WrapperEditorJs>
      </WrapperContentEditor>
    </>
  );
};

export default MyNote;
