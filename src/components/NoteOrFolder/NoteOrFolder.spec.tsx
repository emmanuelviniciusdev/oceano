import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
  wait,
} from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NoteOrFolder from './NoteOrFolder';

jest.mock('../../hooks/useTranslation', () => {
  return jest.fn(() => ({
    actionDnDModalLabels: {
      title: 'o que você deseja fazer?',
      actionTexts: {
        'dropping-note-over-note':
          '* você acabou de mover uma nota para cima de outra nota',
        'dropping-note-over-folder':
          '* você acabou de mover uma nota para cima de uma pasta',
        'dropping-folder-over-folder':
          '* você acabou de mover uma pasta para cima de outra pasta',
        'dropping-folder-over-note':
          '* você acabou de mover uma pasta para cima de uma nota',
      },
    },
  }));
});

function dragAndDrop(source: Element, destination: Element) {
  fireEvent.dragStart(source);
  fireEvent.dragEnter(destination);
  fireEvent.drop(destination);
  fireEvent.dragLeave(destination);
  fireEvent.dragEnd(source);
}

function renderWithDnDContext(components: JSX.Element[]) {
  return render(
    <DndProvider backend={HTML5Backend}>
      {components.map((component) => component)}
    </DndProvider>
  );
}

function hasCorrectModalBeenOpened(
  renderedItems: RenderResult,
  textItem1: string,
  textItem2: string,
  expectedTextToBeInTheDocument: string
) {
  dragAndDrop(
    renderedItems.getByText(textItem1),
    renderedItems.getByText(textItem2)
  );

  //   renderedItems.debug();

  expect(
    renderedItems.queryByTestId('oceano-modal-wrapper')
  ).toBeInTheDocument();

  expect(
    renderedItems.queryByText('o que você deseja fazer?')
  ).toBeInTheDocument();

  expect(
    renderedItems.queryByText(expectedTextToBeInTheDocument)
  ).toBeInTheDocument();
}

describe('NoteOrFolder', () => {
  let renderedItems: RenderResult;

  beforeEach(() => {
    renderedItems = renderWithDnDContext([
      <NoteOrFolder
        id="note-1"
        type="note"
        title="Minha nota 1"
        key={Math.random()}
      />,
      <NoteOrFolder
        id="folder-1"
        type="folder"
        title="Minha pasta 1"
        key={Math.random()}
      />,
      <NoteOrFolder
        id="note-2"
        type="note"
        title="Minha nota 2"
        key={Math.random()}
      />,
      <NoteOrFolder
        id="folder-2"
        type="folder"
        title="Minha pasta 2"
        key={Math.random()}
      />,
    ]);
  });

  it('should open a modal when an item is dropped into another', () => {
    dragAndDrop(
      renderedItems.getByText('Minha nota 1'),
      renderedItems.getByText('Minha pasta 1')
    );

    expect(
      renderedItems.queryByTestId('oceano-modal-wrapper')
    ).toBeInTheDocument();
  });

  it('should not render a modal when an item is dropped into itself', () => {
    dragAndDrop(
      renderedItems.getByText('Minha nota 1'),
      renderedItems.getByText('Minha nota 1')
    );

    expect(
      renderedItems.queryByTestId('oceano-modal-wrapper')
    ).not.toBeInTheDocument();
  });

  it('should open the correct modal when a note is dropped into another note', () =>
    hasCorrectModalBeenOpened(
      renderedItems,
      'Minha nota 1',
      'Minha nota 2',
      '* você acabou de mover uma nota para cima de outra nota'
    ));

  it('should open the correct modal when a note is dropped into a folder', () =>
    hasCorrectModalBeenOpened(
      renderedItems,
      'Minha nota 1',
      'Minha pasta 1',
      '* você acabou de mover uma nota para cima de uma pasta'
    ));

  it('should open the correct modal when a folder is dropped into another folder', () =>
    hasCorrectModalBeenOpened(
      renderedItems,
      'Minha pasta 1',
      'Minha pasta 2',
      '* você acabou de mover uma pasta para cima de outra pasta'
    ));

  it('should open the correct modal when a folder is dropped into a note', () =>
    hasCorrectModalBeenOpened(
      renderedItems,
      'Minha pasta 1',
      'Minha nota 1',
      '* você acabou de mover uma pasta para cima de uma nota'
    ));

  /**
   * // TODO: Implement end-to-end test to this.
   *
   * It is not possible to implement unit tests for these use cases.
   *
   * This is because we have to mock two 'useRef' instances, that is being rendered at the
   * same time, with two different values. Without these references it is not possible to
   * trigger 'contextmenu' event and others still.
   *
   * I've tried to make custom props to get these references separetely in the test but
   * this approach did not work too.
   */
  it('should correctly edit the title of a note/folder', () => {});
  it('should correctly delete a note/folder', () => {});
});
