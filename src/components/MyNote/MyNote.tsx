import React, { useEffect, useRef, useState } from 'react';
import EditorJs from 'react-editor-js';
import { API, OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import { AnimatePresence } from 'framer-motion';

// Styles
import { WrapperContentEditor, WrapperEditorJs } from './styles';
import { OceanoBubbleLoading, StackNotifications } from '../../styles/general';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Types
import { SaveNoteParams } from '../../types-and-interfaces/components/MyNote.types';

// Components
import OceanoNotification from '../OceanoNotification/OceanoNotification';

const editorJsTools = {
  header: Header,
  list: List,
  delimiter: Delimiter,
  checklist: Checklist,
  embed: Embed,
};

const MyNote = () => {
  const translation = useTranslation('MyNote');

  const [isSavingNote, setIsSavingNote] = useState(false);
  const [showAutosaveInfo, setShowAutosaveInfo] = useState(false);

  const showAutosaveInfoTimeoutRef = useRef<number>();
  const isSavingNoteTimeoutRef = useRef<number>();

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      /**
       * CTRL + S command
       */
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();

        setShowAutosaveInfo(true);

        if (!showAutosaveInfoTimeoutRef.current) {
          showAutosaveInfoTimeoutRef.current = setTimeout(() => {
            setShowAutosaveInfo(false);
            showAutosaveInfoTimeoutRef.current = undefined;
          }, 3500);
        }
      }
    });

    return () => document.removeEventListener('keydown', () => {});
  }, [showAutosaveInfo]);

  /**
   *
   * @param params An object containing the text editor's data or the title of the note
   */
  const saveNoteData = (params: SaveNoteParams) => {
    setIsSavingNote(true);
    console.log('on save note data...');
  };

  return (
    <>
      <WrapperContentEditor>
        <textarea
          className="title-textarea"
          placeholder={translation?.textareaTitle?.placeholder}
          onChange={(e) => {
            const title = e.target.value;

            clearTimeout(isSavingNoteTimeoutRef.current);
            isSavingNoteTimeoutRef.current = setTimeout(
              () => saveNoteData({ title }),
              500
            );
          }}
        />

        <WrapperEditorJs>
          <EditorJs
            placeholder="..."
            tools={editorJsTools}
            onChange={(api: API, data?: OutputData) => {
              saveNoteData({ data });
            }}
          />
        </WrapperEditorJs>
      </WrapperContentEditor>

      <StackNotifications>
        <AnimatePresence>
          {showAutosaveInfo && (
            <OceanoNotification
              key="oceano-autosaves-indicator"
              type="clownfish"
            >
              {translation?.statusIndicator?.oceanoAutosavesText}
            </OceanoNotification>
          )}
          {isSavingNote && (
            <OceanoNotification
              key="saving-indicator"
              type="clownfish"
              icon={
                <OceanoBubbleLoading
                  className="oceano-bubble-loading"
                  width={24}
                  height={24}
                />
              }
            >
              {translation?.statusIndicator?.savingText}
            </OceanoNotification>
          )}
        </AnimatePresence>
      </StackNotifications>
    </>
  );
};

export default MyNote;
