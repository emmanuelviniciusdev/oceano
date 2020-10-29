import React, { useCallback, useEffect, useRef, useState } from 'react';
import EditorJs from 'react-editor-js';
import { API, OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import { AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import isEqualReactFastCompare from 'react-fast-compare';

// Styles
import {
  WrapperContentEditor,
  WrapperEditorJs,
  WrapperOceanoCard,
} from './styles';
import { OceanoBubbleLoading, StackNotifications } from '../../styles/general';

// Icons
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Custom hooks
import useTranslation from '../../hooks/useTranslation';

// Types
import { NoteDocumentWithIDType } from '../../types-and-interfaces/collections/notes.types';
import { MyNoteType } from '../../types-and-interfaces/components/MyNote.types';

// Components
import OceanoNotification from '../OceanoNotification/OceanoNotification';
import OceanoCard from '../OceanoCard/OceanoCard';
import OceanoButton from '../OceanoButton/OceanoButton';

// Services
import { getNote, updateNote } from '../../services/note';
import { FirebaseTimestamps } from '../../types-and-interfaces/firebase.types';

const editorJsTools = {
  header: Header,
  list: List,
  delimiter: Delimiter,
  checklist: Checklist,
  embed: Embed,
};

const MyNote: React.FunctionComponent<MyNoteType> = ({ noteId }) => {
  const translation = useTranslation('MyNote');
  const history = useHistory();

  const [isSavingNote, setIsSavingNote] = useState(false);
  const [showAutosaveInfo, setShowAutosaveInfo] = useState(false);
  const [noteDocumentData, setNoteDocumentData] = useState<
    NoteDocumentWithIDType
  >();
  const [isUserChange, setIsUserChange] = useState(false);
  const [
    errorLoadingNoteDocumentData,
    setErrorLoadingNoteDocumentData,
  ] = useState(false);

  const showAutosaveInfoTimeoutRef = useRef<number>();
  const isSavingNoteTimeoutRef = useRef<number>();

  const onSaveNote = useCallback(async () => {
    setIsSavingNote(true);

    try {
      if (noteDocumentData) {
        /**
         * Omits 'documentId' from the object.
         *
         * Reference:
         * https://stackoverflow.com/questions/43011742/how-to-omit-specific-properties-from-an-object-in-javascript/43011802
         */
        const { documentId, ...dataToSave } = noteDocumentData;

        await updateNote(documentId, dataToSave);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingNote(false);
    }
  }, [noteDocumentData]);

  const checkIfSaveShortcut = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();

      setShowAutosaveInfo(true);

      clearTimeout(showAutosaveInfoTimeoutRef.current);
      showAutosaveInfoTimeoutRef.current = setTimeout(() => {
        setShowAutosaveInfo(false);
        showAutosaveInfoTimeoutRef.current = undefined;
      }, 3500);
    }
  }, []);

  /**
   * Fetches note's data
   */
  useEffect(() => {
    (async () => {
      try {
        const noteData = await getNote(noteId);

        setNoteDocumentData(noteData);
      } catch (err) {
        if (err.code === 'oceano-note/note-does-not-exist') {
          history.push('/pagina-nao-encontrada');
          return;
        }

        console.error(err);
        setErrorLoadingNoteDocumentData(true);
      }
    })();
  }, []);

  /**
   * Watches for changes on 'noteDocumentData'
   */
  useEffect(() => {
    /**
     * This verification in 'isUserChange' is because this 'useEffect' will be executed
     * in the first rendering, without a user change. So, only if it is a real user change
     * 'onSaveNote()' will be triggered.
     */
    if (isUserChange && noteDocumentData) onSaveNote();
  }, [noteDocumentData, isUserChange, onSaveNote]);

  /**
   * Watches for CTRL + S command
   */
  useEffect(() => {
    window.addEventListener('keydown', checkIfSaveShortcut, false);
    return () => {
      clearTimeout(showAutosaveInfoTimeoutRef.current);
      window.removeEventListener('keydown', checkIfSaveShortcut, false);
    };
  }, [checkIfSaveShortcut]);

  return (
    <>
      {errorLoadingNoteDocumentData && (
        <WrapperOceanoCard>
          <OceanoCard
            theme="error"
            text={translation?.errorLoadingNoteDocumentData?.text}
          >
            <OceanoButton
              theme="transparent"
              icon={<ArrowBackIcon />}
              text={
                translation?.errorLoadingNoteDocumentData?.buttonReturn.text
              }
              aria-label={
                translation?.errorLoadingNoteDocumentData?.buttonReturn.text
              }
              onClick={() => history.push('/notas')}
            />
          </OceanoCard>
        </WrapperOceanoCard>
      )}

      {noteDocumentData && (
        <>
          <WrapperContentEditor>
            <textarea
              className="title-textarea"
              placeholder={translation?.textareaTitle?.placeholder}
              defaultValue={
                noteDocumentData?.title !== null ? noteDocumentData?.title : ''
              }
              onChange={(e) => {
                const title = e.target.value;

                if (title.length > 120) return;

                clearTimeout(isSavingNoteTimeoutRef.current);
                isSavingNoteTimeoutRef.current = setTimeout(() => {
                  setIsUserChange(true);
                  setNoteDocumentData((value) => value && { ...value, title });
                }, 500);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              maxLength={120}
            />

            <WrapperEditorJs>
              <EditorJs
                placeholder="..."
                tools={editorJsTools}
                data={
                  noteDocumentData?.data !== null
                    ? noteDocumentData?.data
                    : undefined
                }
                onChange={(api: API, data?: OutputData) => {
                  setIsUserChange(true);
                  setNoteDocumentData(
                    (value) => value && { ...value, data: data }
                  );
                }}
                /**
                 * Setting enableReInitialize={!isUserChange} ensures that EditorJS
                 * will be only reinitialized on the first rendering.
                 *
                 * Without 'enableReInitialize' and 'onCompareBlocks' defined this way,
                 * the data is not rendered.
                 */
                enableReInitialize={!isUserChange}
                onCompareBlocks={(newBlocks, oldBlocks) =>
                  isEqualReactFastCompare(newBlocks, oldBlocks)
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
      )}
    </>
  );
};

export default MyNote;
