import React, { useCallback, useEffect, useRef, useState } from 'react';
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

// Icons
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Types
import { NoteDocumentType } from '../../types-and-interfaces/collections/notes.types';

// Components
import OceanoNotification from '../OceanoNotification/OceanoNotification';

// Services
import { getNote, updateNote } from '../../services/note';

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
  const [noteDocumentData, setNoteDocumentData] = useState<
    { id: string } & NoteDocumentType
  >();

  const showAutosaveInfoTimeoutRef = useRef<number>();
  const isSavingNoteTimeoutRef = useRef<number>();

  const onSaveNote = useCallback(async () => {
    setIsSavingNote(true);

    try {
      if (noteDocumentData) {
        const data = noteDocumentData;
        const noteId = data.id;

        // delete data.id;

        // await updateNote(data.id, omitPropFromObject("id", data));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingNote(false);
    }
  }, [noteDocumentData]);

  /**
   * Fetches note's data
   */
  useEffect(() => {
    (async () => {
      const noteData = await getNote('w1Dv4g1vOk0lkoKH5Df4');
      setNoteDocumentData(noteData);
    })();
  }, []);

  /**
   * Watches for changes on 'noteData'
   */
  useEffect(() => {
    if (noteDocumentData) onSaveNote();
  }, [noteDocumentData, onSaveNote]);

  useEffect(() => {
    /**
     * // TODO: Refactor this (it won't be removed on unmount component)
     */
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
              () =>
                setNoteDocumentData((value) => value && { ...value, title }),
              500
            );
          }}
        />

        <WrapperEditorJs>
          <EditorJs
            placeholder="..."
            tools={editorJsTools}
            onChange={(api: API, data?: OutputData) =>
              setNoteDocumentData((value) => value && { ...value, data })
            }
          />
        </WrapperEditorJs>
      </WrapperContentEditor>

      <StackNotifications>
        <AnimatePresence>
          {showAutosaveInfo && (
            <OceanoNotification
              key="oceano-autosaves-indicator"
              type="clownfish"
              icon={<ThumbUpIcon />}
              timeout={2000}
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
